"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

const LIMITS = {
  name: 120,
  email: 160,
  phone: 40,
  company: 160,
  subject: 160,
  message: 4000,
  source: 40,
};
const REQUIRED = ["name", "email", "company"];
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// Deliberately permissive: numbers arrive as +1 (555) 010-9999, 555.010.9999...
const PHONE = /^[0-9+().\-\s]{6,40}$/;

// Control characters, which have no business in a form field.
const CONTROL = /[\x00-\x1f\x7f]/g;
// Same, but keeping newlines and tabs for the message body.
const CONTROL_KEEP_NEWLINES = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g;

/**
 * Strips control characters and HTML angle brackets, collapses whitespace and
 * trims to the column length. The value is stored as plain text and escaped
 * again when it goes into the notification email, so this is defence in depth
 * rather than the only guard.
 */
function clean(value, max) {
  return String(value ?? "")
    .replace(CONTROL, " ")
    .replace(/[<>]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

module.exports = createCoreController("api::inquiry.inquiry", () => ({
  /**
   * Validates and sanitises the submission before the core create runs. The
   * website posts here through its own server-side route, but this controller
   * treats the payload as hostile regardless of who sent it.
   */
  async create(ctx) {
    const input = ctx.request.body?.data ?? ctx.request.body ?? {};

    const data = {
      name: clean(input.name, LIMITS.name),
      email: clean(input.email, LIMITS.email).toLowerCase(),
      phone: clean(input.phone, LIMITS.phone),
      company: clean(input.company, LIMITS.company),
      subject: clean(input.subject, LIMITS.subject),
      message: String(input.message ?? "")
        .replace(CONTROL_KEEP_NEWLINES, "")
        .replace(/[<>]/g, "")
        .trim()
        .slice(0, LIMITS.message),
      source: clean(input.source, LIMITS.source) || "contact",
      notified: false,
    };

    const missing = REQUIRED.filter((field) => !data[field]);
    if (missing.length) {
      return ctx.badRequest(`Missing required field: ${missing.join(", ")}.`);
    }
    if (!EMAIL.test(data.email)) {
      return ctx.badRequest("Enter a valid email address.");
    }
    if (data.phone && !PHONE.test(data.phone)) {
      return ctx.badRequest("Enter a valid phone number.");
    }

    // Hand the cleaned payload to the core controller so lifecycles still run.
    ctx.request.body = { data };
    return super.create(ctx);
  },
}));
