"use client";

import { useState } from "react";

const inputClasses =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/40 transition-colors focus:border-brand";

/** Fields the Strapi Inquiry type stores in their own column. */
const CORE = new Set(["name", "email", "phone", "company", "subject"]);

/**
 * Posts to /api/contact, the one endpoint every form on the site uses, which
 * forwards to Strapi. Fields outside the stored columns (store URL, order
 * volume, and so on) are folded into the message as labelled lines, so a form
 * can add a question without changing the Strapi content type.
 */
function toSubmission(form, fields, source, subject) {
  const data = new FormData(form);
  const label = (name) => fields.find((field) => field.name === name)?.label ?? name;

  const payload = { source, subject };
  const extras = [];

  for (const field of fields) {
    const value = String(data.get(field.name) ?? "").trim();
    if (!value) continue;
    if (CORE.has(field.name)) payload[field.name] = value;
    else extras.push(`${label(field.name)}: ${value}`);
  }

  payload.message = extras.join("\n");
  return payload;
}

export default function LeadForm({
  fields,
  submitLabel,
  successTitle,
  successBody,
  source = "book-demo",
  subject = "Book a product demo",
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSubmission(form, fields, source, subject)),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "Something went wrong.");
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand-tint p-7 sm:p-9">
        <h2 className="font-display text-2xl text-ink">{successTitle}</h2>
        <p className="mt-3 text-[15px] leading-7 text-ink/70">{successBody}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[15px] font-semibold text-brand underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.full ? "sm:col-span-2" : undefined}>
            <label htmlFor={field.name} className="block text-sm font-semibold text-ink">
              {field.label}
              {field.required ? (
                <span className="text-brand" aria-hidden="true">
                  {" "}
                  *
                </span>
              ) : null}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                rows={5}
                required={field.required}
                placeholder={field.placeholder}
                className={`mt-2 ${inputClasses} resize-y`}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
                className={`mt-2 ${inputClasses}`}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                className={`mt-2 ${inputClasses}`}
              />
            )}
          </div>
        ))}
      </div>

      {error ? (
        <p role="alert" className="mt-5 text-[15px] font-medium text-brand">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending…" : submitLabel} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
