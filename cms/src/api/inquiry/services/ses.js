"use strict";

/**
 * Amazon SES notifications for contact form inquiries.
 *
 * This is the only place in the whole project that touches AWS credentials, and
 * it runs inside Strapi. The Next.js site never sees them: it posts the form to
 * Strapi, and Strapi sends the mail.
 *
 * Configured entirely through environment variables:
 *   AWS_ACCESS_KEY_ID      omit on EC2/ECS to use the instance's IAM role
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_REGION             the region your SES identity lives in
 *   SES_FROM_EMAIL         must be a verified SES identity
 *   SES_TO_EMAIL           where inquiries are received
 */

const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2");

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

let client = null;

function getClient() {
  if (client) return client;

  const region = process.env.AWS_REGION;
  if (!region) throw new Error("AWS_REGION is not set");

  client = new SESv2Client({
    region,
    // The send is awaited inside afterCreate, which runs inside the visitor's
    // own POST — so without these the browser sits on the submit button for as
    // long as SES takes to answer. Capped low: the inquiry is already stored,
    // and a notification that has not arrived in a few seconds is better
    // retried than waited on.
    requestHandler: { connectionTimeout: 3000, requestTimeout: 5000 },
    maxAttempts: 2,
    // With no explicit keys the SDK falls back to the default credential chain,
    // which picks up an IAM role on EC2, ECS, App Runner or Lambda.
    ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }
      : {}),
  });
  return client;
}

const EMAIL_SHAPE = /^[^@\s,]+@[^@\s,]+\.[^@\s,]+$/;

/**
 * SES_TO_EMAIL may name several recipients, separated by commas, so an inquiry
 * can reach a whole team rather than one inbox.
 *
 * Entries that are not shaped like an address are dropped rather than passed
 * to SES, which would reject the entire request and lose the notification for
 * everyone on the list. A bare domain is the usual mistake.
 */
function recipients() {
  const listed = String(process.env.SES_TO_EMAIL ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    valid: listed.filter((value) => EMAIL_SHAPE.test(value)),
    invalid: listed.filter((value) => !EMAIL_SHAPE.test(value)),
  };
}

/** True when SES has everything it needs to send. */
function sesConfigured() {
  return Boolean(
    process.env.AWS_REGION &&
    process.env.SES_FROM_EMAIL &&
    recipients().valid.length,
  );
}

// The form each inquiry came from. Stored as a slug; spelled out here so the
// person reading the email does not have to know what "book-demo" means. An
// unrecognised value is printed as-is rather than dropped.
const SOURCES = {
  contact: "Contact page",
  "book-demo": "Book a Demo popup",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/**
 * The two forms want different things from the reader: a demo request is a
 * scheduling job, a general inquiry is a question to answer. The layout is the
 * same for both and stays deliberately light -- a rule of colour at the top is
 * enough to tell them apart in a glance, without the mail looking like a
 * newsletter.
 */
const TEMPLATES = {
  "book-demo": {
    accent: "#ff6b2c",
    heading: "Product demo request",
    lead: "would like a demo.",
    detailsTitle: "What they want to cover",
    emptyDetails: "They did not add any detail. Reply to ask what they want to see.",
    footnote: "Sent from the Book a Demo form on dropskip.ai.",
  },
  contact: {
    accent: "#1a56db",
    heading: "New inquiry",
    lead: "sent you a message.",
    detailsTitle: "Their message",
    emptyDetails: "No message was included.",
    footnote: "Sent from the contact form on dropskip.ai.",
  },
};

const templateFor = (source) => TEMPLATES[source] ?? TEMPLATES.contact;

// The form asks its questions in the second person; the email is read in the
// third. Renaming the few that read oddly keeps the mail sounding natural.
const FRIENDLY_LABELS = {
  "What should we cover?": "They want to discuss",
  "Store URL": "Store",
  "Monthly orders": "Monthly orders",
  "Fulfilment locations": "Fulfilment sites",
};

/**
 * The /book-demo form folds its extra questions into the message as
 * "Label: value" lines, while the popup sends a plain paragraph. Splitting them
 * back apart lets the structured answers list cleanly and prose stay prose,
 * without the sender having to care which form was used.
 */
function splitMessage(message = "") {
  const pairs = [];
  const prose = [];

  for (const raw of String(message).split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const match = line.match(/^([^:]{2,40}):\s*(.+)$/);
    if (match) {
      const label = match[1].trim();
      pairs.push([FRIENDLY_LABELS[label] ?? label, match[2].trim()]);
    } else prose.push(line);
  }

  return { pairs, prose: prose.join("\n") };
}

/**
 * The subject is what the inbox is triaged on, so it leads with the kind of
 * request and names the person and company.
 */
function buildSubject(inquiry) {
  const kind = inquiry.source === "book-demo" ? "Demo request" : "New inquiry";
  // A subject is plain text, so markup in a name is only noise -- but a newline
  // or control character has no business in a header field at all, and the
  // name and company come straight from a public form.
  const clean = (value) =>
    String(value ?? "")
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001f\u007f]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const who = [clean(inquiry.name), clean(inquiry.company)].filter(Boolean).join(", ");
  return `${kind}${who ? ` - ${who}` : ""}`.slice(0, 150);
}

function buildBody(inquiry) {
  const t = templateFor(inquiry.source);
  const { pairs, prose } = splitMessage(inquiry.message);
  const firstName = String(inquiry.name || "").trim().split(/\s+/)[0] || "them";

  const label = (text) =>
    `<p style="margin:26px 0 8px;font:700 12px/1 ${FONT};letter-spacing:.09em;` +
    `text-transform:uppercase;color:#8a8a8a">${escapeHtml(text)}</p>`;

  const line = (key, value) =>
    `<tr>` +
    `<td style="padding:4px 18px 4px 0;vertical-align:top;color:#6b6b6b;white-space:nowrap">${escapeHtml(key)}</td>` +
    `<td style="padding:4px 0;vertical-align:top;color:#111">${value}</td>` +
    `</tr>`;

  const table = (rows) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font:15px/1.6 ${FONT}">${rows}</table>`;

  const contact = table(
    [
      line("Name", escapeHtml(inquiry.name || "-")),
      line(
        "Email",
        `<a href="mailto:${escapeHtml(inquiry.email)}" style="color:${t.accent}">${escapeHtml(inquiry.email)}</a>`,
      ),
      inquiry.phone ? line("Phone", escapeHtml(inquiry.phone)) : "",
      inquiry.company ? line("Company", escapeHtml(inquiry.company)) : "",
    ]
      .filter(Boolean)
      .join(""),
  );

  const details = pairs.length
    ? table(pairs.map(([k, v]) => line(k, escapeHtml(v))).join("")) +
      (prose ? `<p style="margin:14px 0 0;white-space:pre-wrap">${escapeHtml(prose)}</p>` : "")
    : prose
      ? `<p style="margin:0;white-space:pre-wrap">${escapeHtml(prose)}</p>`
      : `<p style="margin:0;color:#6b6b6b">${escapeHtml(t.emptyDetails)}</p>`;

  // A real link, not an image or a div: every client can render it, and it
  // opens a reply already addressed to the visitor.
  const button =
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0"><tr>` +
    `<td style="background:${t.accent};border-radius:6px">` +
    `<a href="mailto:${escapeHtml(inquiry.email)}?subject=${encodeURIComponent(`Re: ${buildSubject(inquiry)}`)}" ` +
    `style="display:inline-block;padding:12px 22px;font:600 15px/1 ${FONT};color:#ffffff;text-decoration:none">` +
    `Reply to ${escapeHtml(firstName)} &rarr;</a>` +
    `</td></tr></table>`;

  const html =
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${escapeHtml(t.heading)}</title></head>` +
    `<body style="margin:0;padding:0;background:#ffffff;font:15px/1.6 ${FONT};color:#111">` +
    `<div style="max-width:620px;padding:0 24px 32px">` +

    // The one piece of decoration: a rule of colour that says at a glance
    // whether this is a demo request or a general inquiry.
    `<div style="height:4px;background:${t.accent};margin:0 0 26px"></div>` +

    `<p style="margin:0 0 6px;font:700 12px/1 ${FONT};letter-spacing:.09em;text-transform:uppercase;color:${t.accent}">` +
    `${escapeHtml(t.heading)}</p>` +
    `<p style="margin:0;font-size:18px;line-height:1.5">` +
    `<strong>${escapeHtml(inquiry.name || "Someone")}</strong>` +
    `${inquiry.company ? ` from ${escapeHtml(inquiry.company)}` : ""} ${escapeHtml(t.lead)}</p>` +

    label("Contact") +
    contact +
    label(t.detailsTitle) +
    `<div style="font:15px/1.6 ${FONT}">${details}</div>` +
    button +

    `<p style="margin:30px 0 0;padding-top:16px;border-top:1px solid #e4e4e4;font:13px/1.6 ${FONT};color:#8a8a8a">` +
    `Replying to this email goes straight to ${escapeHtml(inquiry.name || inquiry.email)}.<br>` +
    `${escapeHtml(t.footnote)}</p>` +

    `</div></body></html>`;

  /* ---------------------------------------------------------- plain text -- */
  // null drops a line that does not apply; "" is a deliberate blank separator,
  // so the two cannot be filtered with the same test.
  const text = [
    t.heading.toUpperCase(),
    "",
    `${inquiry.name || "Someone"}${inquiry.company ? ` from ${inquiry.company}` : ""} ${t.lead}`,
    "",
    "CONTACT",
    `  Name:    ${inquiry.name || "-"}`,
    `  Email:   ${inquiry.email || "-"}`,
    inquiry.phone ? `  Phone:   ${inquiry.phone}` : null,
    inquiry.company ? `  Company: ${inquiry.company}` : null,
    "",
    t.detailsTitle.toUpperCase(),
    ...(pairs.length ? pairs.map(([k, v]) => `  ${k}: ${v}`) : []),
    ...(pairs.length && prose ? [""] : []),
    ...(prose ? [prose] : []),
    ...(!pairs.length && !prose ? [`  ${t.emptyDetails}`] : []),
    "",
    `Replying to this email goes straight to ${inquiry.name || inquiry.email}.`,
    t.footnote,
  ]
    .filter((v) => v !== null)
    .join("\n");

  return { text, html };
}

/**
 * Sends the notification. Resolves either way — the inquiry is already saved by
 * the time this runs, and a failed email must never lose it. The reason is
 * logged with the fix spelled out.
 */
async function sendInquiryNotification(inquiry) {
  if (!sesConfigured()) {
    strapi.log.info(
      "[ses] not configured; inquiry saved, no email sent. Set AWS_REGION, SES_FROM_EMAIL and SES_TO_EMAIL.",
    );
    return { sent: false, reason: "ses-not-configured" };
  }

  const { valid: to, invalid } = recipients();
  if (invalid.length) {
    strapi.log.warn(
      `[ses] ignoring ${invalid.length} malformed entr${invalid.length === 1 ? "y" : "ies"} ` +
        `in SES_TO_EMAIL: ${invalid.join(", ")} - each must be a full address`,
    );
  }

  const { text, html } = buildBody(inquiry);

  try {
    await getClient().send(
      new SendEmailCommand({
        // Must be a verified identity; SES rejects anything else.
        FromEmailAddress: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: to },
        // The visitor goes here, never in From, so Reply answers them directly.
        ReplyToAddresses: [inquiry.email],
        Content: {
          Simple: {
            Subject: { Data: buildSubject(inquiry), Charset: "UTF-8" },
            Body: {
              Text: { Data: text, Charset: "UTF-8" },
              Html: { Data: html, Charset: "UTF-8" },
            },
          },
        },
      }),
    );

    strapi.log.info(`[ses] inquiry ${inquiry.id} notified to ${to.join(", ")}`);
    return { sent: true };
  } catch (error) {
    strapi.log.error(`[ses] notification failed: ${describe(error)}`);
    return { sent: false, reason: error.message };
  }
}

/** SES rejections are easier to act on with the cause spelled out. */
function describe(error) {
  const message = error.message ?? String(error);

  if (/not verified/i.test(message)) {
    return `${message} - in the SES sandbox every From and To address must be a verified identity. Request production access, or verify the address in the SES console.`;
  }
  if (
    /credential/i.test(message) ||
    error.name === "CredentialsProviderError"
  ) {
    return `${message} - no AWS credentials found. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY, or attach an IAM role with ses:SendEmail.`;
  }
  if (/region/i.test(message)) {
    return `${message} - set AWS_REGION to the region your SES identity lives in.`;
  }
  return message;
}

module.exports = { sendInquiryNotification, sesConfigured };
