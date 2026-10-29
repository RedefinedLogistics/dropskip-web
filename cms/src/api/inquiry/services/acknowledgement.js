"use strict";

/**
 * The acknowledgement a visitor receives after submitting a form on
 * dropskip.ai. ses.js sends it; this file only builds the subject, HTML and
 * plain text.
 *
 * It reads as a short letter from the founder: a white card with the logo, an
 * accent rule, an uppercase eyebrow, a callout, a summary of what was sent and
 * a signature. Each form has its own theme, blue for a contact message and the
 * site's orange on cream for a demo request. Brand orange is kept to bars and
 * borders; as small text it falls below WCAG AA on white, so text uses a
 * darker shade of it.
 *
 * Email clients ignore most modern CSS, so the layout is nested tables with
 * every style inline. The <style> block only adds the mobile adjustments and
 * client resets that cannot be inlined; a client that drops it still gets a
 * correct, fluid layout.
 *
 * Every value from the form is escaped. The message is also shortened, since
 * the email goes to whatever address was typed into a public form and should
 * not carry an arbitrarily long text written by someone else.
 */

// Shared tokens. heading is the site's --navy.
const COLOR = {
  card: "#ffffff",
  heading: "#0f1b2d",
  greeting: "#334155",
  body: "#3b4654",
  value: "#14212a",
  label: "#475569",
  line: "#e2e5ea",
};

// Per-form themes, matched to the approved mockups.
const THEME = {
  contact: {
    page: "#edf0f7",
    accent: "#2a4fd7", // bar, callout border and eyebrow (6.3:1 on white)
    accentText: "#2a4fd7",
    callout: "#eef2fd",
    footerText: "#556070", // AA on the page colour
  },
  "book-demo": {
    page: "#f1ebe2",
    accent: "#ff6b2c", // --orange, decorative use only
    accentText: "#b8410f", // --orange, darkened for text (5.5:1 on white)
    callout: "#f5f0ea",
    footerText: "#5f5850", // AA on the page colour
  },
};

const FONT =
  "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const SITE = "https://www.dropskip.ai";
const SITE_LABEL = "www.dropskip.ai";
// The site's own logo, already public. Mail clients fetch images from the open
// web, so it has to be a deployed URL; the file carries transparent padding,
// which is why it is drawn wider than the artwork itself.
const LOGO = { src: `${SITE}/dropskip-logo.png`, width: 180, height: 90 };

const SIGNATURE = {
  name: "Rajeeb Mohapatra",
  title: "CEO & Founder, DropSkip",
  email: "rajeeb@dropskip.ai",
};

const MESSAGE_LIMIT = 1000;

/**
 * The two forms' wording. Paragraphs are arrays of [text, bold] runs so the
 * same copy renders as HTML (with <strong>) and as plain text.
 *
 * `email` is the address each form itself advertises on the site (the popup
 * shows info@, the contact page contact@). It is printed in the footer and is
 * where the visitor's reply goes.
 */
const COPY = {
  "book-demo": {
    email: "info@dropskip.ai",
    subject: "We received your demo request",
    eyebrow: "Demo request received",
    heading: "Thanks for requesting a DropSkip demo.",
    intro: [
      [["I’m Rajeeb, CEO and founder of DropSkip, and I’ll be running your session myself."]],
      [
        ["The session is "],
        ["30 minutes inside the product", true],
        [", built around one inventory decision your team is working through."],
      ],
    ],
    callout: {
      title: "To set it up, just reply with:",
      bullets: [
        "Two or three times that work for you over the next week, and your timezone",
        "The decision you’d like to focus on, if you didn’t mention it on the form",
      ],
    },
    outro: [[["I’ll confirm a time within one business day and send a short note on what we’ll prepare."]]],
    summaryTitle: "Your request",
    // The popup always sends "Book a product demo" as the subject; it adds
    // nothing, so the summary leaves it out.
    showTopic: false,
    footerNote: `You received this email because you requested a demo on ${SITE_LABEL}.`,
  },
  contact: {
    email: "contact@dropskip.ai",
    subject: "We received your message",
    eyebrow: "Message received",
    heading: "Thanks for getting in touch.",
    intro: [
      [
        ["I’m Rajeeb, CEO and founder of DropSkip. Your message has come straight to me, and I’ll reply "],
        ["within one business day", true],
        ["."],
      ],
    ],
    callout: {
      text: [
        ["If there’s anything you’d like to add, such as more detail on your question or the tools you use today, "],
        ["just reply to this email", true],
        ["."],
      ],
    },
    outro: [],
    summaryTitle: "What you sent",
    showTopic: true,
    footerNote: `You received this email because you contacted us through ${SITE_LABEL}.`,
  },
};

const sourceOf = (source) => (COPY[source] ? source : "contact");

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

/** Escaped, with line breaks kept: white-space:pre-wrap is lost in Outlook. */
const multiline = (value) => escapeHtml(value).replace(/\r?\n/g, "<br>");

const firstNameOf = (name) => String(name || "").trim().split(/\s+/)[0] || "";

function shorten(text, limit = MESSAGE_LIMIT) {
  const value = String(text || "").trim();
  if (value.length <= limit) return { text: value, shortened: false };
  return { text: `${value.slice(0, limit).trimEnd()}…`, shortened: true };
}

const runsToHtml = (runs, boldColor) =>
  runs
    .map(([text, bold]) =>
      bold
        ? `<strong style="font-weight:700;color:${boldColor}">${escapeHtml(text)}</strong>`
        : escapeHtml(text),
    )
    .join("");

const runsToText = (runs) => runs.map(([text]) => text).join("");

/**
 * Builds the acknowledgement for a stored inquiry.
 *
 * Field mapping (from the Strapi inquiry, as the website's forms fill it):
 *   name     -> greeting, by first name
 *   subject  -> "Topic" row (the contact page's topic choice; not shown for
 *               the popup, which always sends "Book a product demo")
 *   company  -> "Company" row
 *   message  -> "Message" row, shortened past MESSAGE_LIMIT
 *   source   -> which wording and theme to use ("contact" or "book-demo")
 * The email address is the recipient and is not repeated in the body.
 *
 * Also returns `replyTo`, the form's public address, for the Reply-To header.
 */
function buildAcknowledgement(inquiry, { year = new Date().getFullYear() } = {}) {
  const source = sourceOf(inquiry.source);
  const copy = COPY[source];
  const theme = THEME[source];
  const publicEmail = copy.email;
  const firstName = firstNameOf(inquiry.name);
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const message = shorten(inquiry.message);

  const rows = [
    copy.showTopic && inquiry.subject ? ["Topic", inquiry.subject] : null,
    inquiry.company ? ["Company", inquiry.company] : null,
    message.text ? ["Message", message.text] : null,
  ].filter(Boolean);

  /* ---------------------------------------------------------------- html -- */

  const paragraph = (runs, margin = "16px 0 0") =>
    `<p style="margin:${margin};font-family:${FONT};font-size:16px;line-height:26px;color:${COLOR.body}">` +
    `${runsToHtml(runs, COLOR.heading)}</p>`;

  const eyebrow = (text, color) =>
    `<p style="margin:0;font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;` +
    `letter-spacing:2px;text-transform:uppercase;color:${color}">${escapeHtml(text)}</p>`;

  // Bullets as a table rather than <ul>, whose spacing Outlook ignores.
  const bullets = (items) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    items
      .map(
        (item, index) =>
          `<tr>` +
          `<td width="20" valign="top" style="width:20px;padding:${index ? "14px" : "12px"} 0 0;font-family:${FONT};font-size:16px;line-height:26px;color:${theme.accent}">&bull;</td>` +
          `<td valign="top" style="padding:${index ? "14px" : "12px"} 0 0;font-family:${FONT};font-size:16px;line-height:26px;color:${COLOR.value}">${escapeHtml(item)}</td>` +
          `</tr>`,
      )
      .join("") +
    `</table>`;

  const calloutBody = copy.callout.bullets
    ? `<p style="margin:0;font-family:${FONT};font-size:16px;line-height:24px;font-weight:700;color:${COLOR.heading}">${escapeHtml(copy.callout.title)}</p>` +
      bullets(copy.callout.bullets)
    : `<p style="margin:0;font-family:${FONT};font-size:16px;line-height:26px;color:${COLOR.value}">${runsToHtml(copy.callout.text, COLOR.heading)}</p>`;

  const callout =
    `<tr><td class="px" style="padding:28px 56px 0">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ` +
    `style="border-collapse:separate;background:${theme.callout};border-left:4px solid ${theme.accent};border-radius:10px" bgcolor="${theme.callout}">` +
    `<tr><td style="padding:22px 28px">${calloutBody}</td></tr>` +
    `</table></td></tr>`;

  const outro = copy.outro.length
    ? `<tr><td class="px" style="padding:12px 56px 0">${copy.outro.map((runs) => paragraph(runs)).join("")}</td></tr>`
    : "";

  const summaryRows = rows
    .map(
      ([label, value], index) =>
        `<tr><td style="padding:${index ? "16px" : "14px"} 0 0;font-family:${FONT}">` +
        `<p style="margin:0 0 2px;font-size:14px;line-height:20px;font-weight:700;color:${COLOR.label}">${escapeHtml(label)}</p>` +
        `<p style="margin:0;font-size:16px;line-height:25px;color:${COLOR.value};word-break:break-word">${multiline(value)}</p>` +
        `</td></tr>`,
    )
    .join("");

  const summary = rows.length
    ? `<tr><td class="px" style="padding:28px 56px 0">` +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ` +
      `style="border-collapse:separate;border:1px solid ${COLOR.line};border-radius:10px">` +
      `<tr><td style="padding:22px 28px 24px">` +
      eyebrow(copy.summaryTitle, COLOR.label) +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${summaryRows}</table>` +
      (message.shortened
        ? `<p style="margin:12px 0 0;font-family:${FONT};font-size:13px;line-height:18px;color:${COLOR.label}">Shortened here; we have your full message.</p>`
        : "") +
      `</td></tr></table>` +
      `</td></tr>`
    : "";

  const preheader = `${copy.heading} ${runsToText(copy.intro[0])}`;

  const html =
    `<!DOCTYPE html>` +
    `<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">` +
    `<head>` +
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<meta http-equiv="X-UA-Compatible" content="IE=edge">` +
    `<meta name="x-apple-disable-message-reformatting">` +
    `<meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">` +
    // The design is light only. Declaring it stops clients that honour this
    // from half-inverting the colours.
    `<meta name="color-scheme" content="light">` +
    `<meta name="supported-color-schemes" content="light">` +
    `<title>${escapeHtml(copy.subject)}</title>` +
    // Inter where the client allows web fonts (Apple Mail, iOS); the system
    // stack everywhere else.
    `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">` +
    `<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->` +
    `<style>` +
    `body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}` +
    `table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}` +
    `img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none}` +
    `a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}` +
    `@media only screen and (max-width:740px){` +
    `.shell{padding:16px 12px!important}` +
    `.px{padding-left:24px!important;padding-right:24px!important}` +
    `.h1{font-size:26px!important;line-height:32px!important}` +
    `}` +
    `</style>` +
    `</head>` +
    `<body style="margin:0;padding:0;width:100%;background:${theme.page}" bgcolor="${theme.page}">` +
    // Shown as the inbox preview line, hidden in the message itself.
    `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${theme.page};opacity:0">` +
    `${escapeHtml(preheader)}</div>` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${theme.page}" bgcolor="${theme.page}">` +
    `<tr><td class="shell" align="center" style="padding:40px 24px">` +
    `<!--[if mso]><table role="presentation" width="720" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:720px;margin:0 auto">` +
    /* card */
    `<tr><td style="background:${COLOR.card};border:1px solid ${COLOR.line};border-radius:16px" bgcolor="${COLOR.card}">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    // Logo, then the short accent rule.
    `<tr><td class="px" style="padding:40px 56px 0">` +
    `<a href="${SITE}/" style="text-decoration:none">` +
    `<img src="${LOGO.src}" width="${LOGO.width}" height="${LOGO.height}" alt="DropSkip" ` +
    `style="display:block;width:${LOGO.width}px;max-width:100%;height:auto;border:0;font-family:${FONT};font-size:22px;font-weight:700;color:${COLOR.heading}">` +
    `</a></td></tr>` +
    // Kept tight: the logo file already has empty space below the artwork.
    `<tr><td class="px" style="padding:6px 56px 0">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>` +
    `<td width="56" height="3" style="width:56px;height:3px;background:${theme.accent};font-size:0;line-height:0" bgcolor="${theme.accent}">&nbsp;</td>` +
    `</tr></table></td></tr>` +
    // Eyebrow, greeting, heading and intro.
    `<tr><td class="px" style="padding:28px 56px 0">` +
    eyebrow(copy.eyebrow, theme.accentText) +
    `<p style="margin:16px 0 0;font-family:${FONT};font-size:20px;line-height:28px;font-weight:700;color:${COLOR.greeting}">${escapeHtml(greeting)}</p>` +
    `<h1 class="h1" style="margin:10px 0 0;font-family:${FONT};font-size:30px;line-height:38px;font-weight:700;letter-spacing:-0.3px;color:${COLOR.heading}">` +
    `${escapeHtml(copy.heading)}</h1>` +
    copy.intro.map((runs, index) => paragraph(runs, index ? "16px 0 0" : "20px 0 0")).join("") +
    `</td></tr>` +
    callout +
    outro +
    summary +
    // Signature, under a hairline.
    `<tr><td class="px" style="padding:36px 56px 0">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>` +
    `<td height="1" style="height:1px;background:${COLOR.line};font-size:0;line-height:0" bgcolor="${COLOR.line}">&nbsp;</td>` +
    `</tr></table></td></tr>` +
    `<tr><td class="px" style="padding:28px 56px 40px;font-family:${FONT}">` +
    `<p style="margin:0;font-size:17px;line-height:24px;font-weight:700;color:${COLOR.heading}">${escapeHtml(SIGNATURE.name)}</p>` +
    `<p style="margin:4px 0 0;font-size:16px;line-height:24px;color:${COLOR.body}">${escapeHtml(SIGNATURE.title)}</p>` +
    `<p style="margin:4px 0 0;font-size:15px;line-height:22px">` +
    `<a href="mailto:${SIGNATURE.email}" style="color:${theme.accentText};text-decoration:underline">${SIGNATURE.email}</a></p>` +
    `</td></tr>` +
    `</table></td></tr>` +
    /* footer, on the page background */
    `<tr><td align="center" style="padding:28px 24px 8px;font-family:${FONT};font-size:14px;line-height:22px;color:${theme.footerText}">` +
    `<p style="margin:0">` +
    `<a href="${SITE}/" style="color:${theme.footerText};text-decoration:underline">${SITE_LABEL}</a>` +
    `&nbsp;&nbsp;|&nbsp;&nbsp;` +
    `<a href="mailto:${publicEmail}" style="color:${theme.footerText};text-decoration:underline">${publicEmail}</a></p>` +
    `<p style="margin:6px 0 0">${escapeHtml(copy.footerNote)}</p>` +
    `</td></tr>` +
    `</table>` +
    `<!--[if mso]></td></tr></table><![endif]-->` +
    `</td></tr></table>` +
    `</body></html>`;

  /* ---------------------------------------------------------- plain text -- */

  const calloutText = copy.callout.bullets
    ? [copy.callout.title, ...copy.callout.bullets.map((item) => `- ${item}`)]
    : [runsToText(copy.callout.text)];

  const text = [
    greeting,
    "",
    copy.heading,
    "",
    ...copy.intro.flatMap((runs) => [runsToText(runs), ""]),
    ...calloutText,
    ...copy.outro.flatMap((runs) => ["", runsToText(runs)]),
    ...(rows.length
      ? [
          "",
          copy.summaryTitle.toUpperCase(),
          ...rows.map(([label, value]) =>
            value.includes("\n") ? `${label}:\n${value}` : `${label}: ${value}`,
          ),
          ...(message.shortened ? ["(Shortened here; we have your full message.)"] : []),
        ]
      : []),
    "",
    SIGNATURE.name,
    SIGNATURE.title,
    SIGNATURE.email,
    "",
    "--",
    `${SITE}/ | ${publicEmail}`,
    copy.footerNote,
  ].join("\n");

  return { subject: `${copy.subject} | DropSkip`, html, text, replyTo: publicEmail };
}

module.exports = { buildAcknowledgement };
