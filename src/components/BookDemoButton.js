"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "@/styles/dialog.css";

// Laid out two to a row on wide screens, one per row below that.
const FIELDS = [
  {
    name: "name",
    label: "Your name",
    required: true,
    autoComplete: "name",
    placeholder: "Jane Cooper",
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "you@company.com",
  },
  {
    name: "company",
    label: "Company",
    required: true,
    autoComplete: "organization",
    placeholder: "Your company name",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+1 555 000 1234",
  },
];

// The left panel: what the visitor gets for the half hour they are giving. The
// wording follows the closing sections on the home and product pages, so the
// popup promises exactly what those pages already promise.
const PROMISES = [
  {
    title: "Bring one decision",
    body: "Tell us the inventory question your team is stuck on. The whole session stays on that one.",
  },
  {
    title: "Thirty minutes, in the product",
    body: "A working session, not a slide deck. We walk the workflow that decision runs through.",
  },
  {
    title: "You keep the final call",
    body: "We map the inputs and show how the recommendation is assembled. Your team decides what to do with it.",
  },
];

/**
 * "Book a Demo" anywhere on the site: opens a dialog with the few fields the
 * team needs, and posts to the same /api/contact endpoint the contact page
 * uses, so every enquiry lands in Strapi and triggers the same SES email.
 *
 * Uses a native <dialog>, which gives Escape to close, focus containment and
 * an inert background without any of that being reimplemented here.
 *
 * The dialog is rendered into <body> rather than next to the button. The button
 * sits in whatever section the page puts it in — including the dark closing
 * bands, which set `color:#fff` and restyle `.btn` for their own contents — and
 * those scoped rules would otherwise repaint the popup. In <body> it inherits
 * only the :root tokens, so every placement opens the same dialog.
 */
export default function BookDemoButton({ className = "btn btn-primary", style, children }) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // The dialog is only in the tree once it has been asked for, so showModal has
  // to wait for that render. Escape and the close button go through the
  // element's own close event, which keeps this flag and the DOM in step.
  useEffect(() => {
    const element = dialogRef.current;
    if (isOpen && element && !element.open) element.showModal();
  }, [isOpen]);

  const open = () => {
    setSent(false);
    setError("");
    setIsOpen(true);
  };

  const close = () => dialogRef.current?.close();

  // The dialog element fills the viewport, so a click that lands on it rather
  // than on the card inside is a click on the backdrop.
  const handleBackdrop = (event) => {
    if (event.target === dialogRef.current) close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          phone: data.get("phone"),
          message: data.get("message"),
          subject: "Book a product demo",
          source: "book-demo",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "Something went wrong.");

      form.reset();
      setSent(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSending(false);
    }
  };

  const dialog = (
    <dialog
      ref={dialogRef}
      className="demo-dialog"
      aria-labelledby="demo-dialog-title"
      onClick={handleBackdrop}
      onClose={() => setIsOpen(false)}
    >
      <div className="demo-card">
        <button type="button" className="demo-close" onClick={close} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>

        <aside className="demo-aside">
          <p className="demo-eyebrow">Product demo</p>
          <p className="demo-pitch">
            See what DropSkip would change about your next inventory decision.
          </p>

          <ul className="demo-promises">
            {PROMISES.map((promise) => (
              <li key={promise.title}>
                <span className="demo-tick" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path
                      d="M4.5 10.5 8.3 14.2 15.5 6.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <strong>{promise.title}</strong>
                  {promise.body}
                </span>
              </li>
            ))}
          </ul>

          <p className="demo-aside-foot">
            Prefer email? <a href="mailto:support@dropskip.ai">support@dropskip.ai</a>
          </p>
        </aside>

        <div className="demo-main">
          {sent ? (
            <div className="demo-done">
              <span className="demo-done-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h2 id="demo-dialog-title">Thanks — we have your request.</h2>
              <p>
                We will come back to you within one business day with a time and a short note on
                what we will prepare.
              </p>
              <button type="button" className="btn btn-primary demo-submit" onClick={close}>
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="demo-head">
                <h2 id="demo-dialog-title">Book a demo</h2>
                <p>
                  Tell us where to reach you and which decision to focus on. We come back within one
                  business day.
                </p>
              </div>

              <form className="demo-form" onSubmit={handleSubmit}>
                <div className="demo-grid">
                  {FIELDS.map((field) => (
                    <div className="demo-field" key={field.name}>
                      <label htmlFor={`demo-${field.name}`}>
                        {field.label}
                        {field.required ? (
                          <span className="demo-req" aria-hidden="true">
                            {" "}
                            *
                          </span>
                        ) : (
                          <span className="demo-optional"> optional</span>
                        )}
                      </label>
                      <input
                        id={`demo-${field.name}`}
                        name={field.name}
                        type={field.type ?? "text"}
                        required={field.required}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div className="demo-field demo-field-full">
                    <label htmlFor="demo-message">
                      Which decision should we focus on?
                      <span className="demo-optional"> optional</span>
                    </label>
                    <textarea
                      id="demo-message"
                      name="message"
                      rows={4}
                      placeholder="Recurring stockouts, excess inventory, purchasing uncertainty, stock in the wrong location — whichever is costing you most right now."
                    />
                  </div>
                </div>

                {error ? (
                  <p className="demo-error" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="demo-actions">
                  <button type="submit" className="btn btn-primary demo-submit" disabled={sending}>
                    {sending ? "Sending…" : "Send my demo request"}
                    {sending ? null : <span className="arrow">↗</span>}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );

  return (
    <>
      <button type="button" className={className} style={style} onClick={open}>
        {children}
      </button>

      {isOpen ? createPortal(dialog, document.body) : null}
    </>
  );
}
