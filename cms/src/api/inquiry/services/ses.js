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

/** True when SES has everything it needs to send. */
function sesConfigured() {
  return Boolean(
    process.env.AWS_REGION &&
    process.env.SES_FROM_EMAIL &&
    process.env.SES_TO_EMAIL,
  );
}

// The form each inquiry came from. Stored as a slug; spelled out here so the
// person reading the email does not have to know what "book-demo" means. An
// unrecognised value is printed as-is rather than dropped.
const SOURCES = {
  contact: "Contact page",
  "book-demo": "Book a Demo popup",
};

const FIELDS = [
  ["Name", "name"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Company", "company"],
  ["Subject", "subject"],
  ["Source", "source"],
];

/**
 * The subject line is what the team triages on, so it leads with what the
 * visitor asked for and names the company. Both forms set `subject` to the
 * topic; the fallback is only for an inquiry created by hand in the admin.
 */
function buildSubject(inquiry) {
  const topic = inquiry.subject || "Website inquiry";
  const who = [inquiry.name, inquiry.company].filter(Boolean).join(", ");
  return `${topic}${who ? ` - ${who}` : ""}`.slice(0, 150);
}

function buildBody(inquiry) {
  // Optional fields that the form did not collect are left out rather than
  // printed as an empty row, so the email only shows what the visitor gave us.
  const rows = FIELDS.map(([label, key]) => [
    label,
    key === "source"
      ? (SOURCES[inquiry.source] ?? inquiry.source)
      : inquiry[key],
  ]).filter(([, value]) => value);
  const message = inquiry.message || "(no message)";

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    `Message: ${message}`,
  ].join("\n");

  const html = [
    '<h2 style="margin:0 0 16px;font:700 18px system-ui">New website inquiry</h2>',
    '<table style="border-collapse:collapse;font:14px system-ui">',
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#63717a">${label}</td>` +
        `<td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
    ),
    "</table>",
    '<p style="margin:16px 0 4px;font:700 13px system-ui;color:#63717a">Message</p>',
    `<p style="margin:0;font:14px/1.6 system-ui;white-space:pre-wrap">${escapeHtml(
      message,
    )}</p>`,
  ].join("");

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

  const { text, html } = buildBody(inquiry);

  try {
    await getClient().send(
      new SendEmailCommand({
        // Must be a verified identity; SES rejects anything else.
        FromEmailAddress: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [process.env.SES_TO_EMAIL] },
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

    strapi.log.info(
      `[ses] inquiry ${inquiry.id} notified to ${process.env.SES_TO_EMAIL}`,
    );
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
