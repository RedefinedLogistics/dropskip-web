/**
 * Shape and limits for anything posted to /api/contact.
 *
 * Strapi validates and sanitises again on its side — this pass exists so an
 * obvious mistake comes back to the visitor immediately, without a round trip
 * to the CMS.
 */

const MAX = {
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
const PHONE = /^[0-9+().\-\s]{6,40}$/;

/** Returns { payload } for a valid body, or { error } with a message to show. */
export function validateSubmission(body) {
  const value = (key) =>
    String(body?.[key] ?? "")
      .trim()
      .slice(0, MAX[key]);

  const payload = {
    name: value("name"),
    email: value("email"),
    phone: value("phone"),
    company: value("company"),
    subject: value("subject"),
    message: value("message"),
    source: value("source") || "contact",
  };

  const missing = REQUIRED.filter((key) => !payload[key]);
  if (missing.length) {
    return { error: `Missing required field: ${missing.join(", ")}.` };
  }
  if (!EMAIL.test(payload.email)) {
    return { error: "Enter a valid email address." };
  }
  if (payload.phone && !PHONE.test(payload.phone)) {
    return { error: "Enter a valid phone number." };
  }

  return { payload };
}
