"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/contact.css";

export default function ContactPage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Validate the three required fields as contact.html did, post the message to
  // /api/contact, which stores it in Strapi and triggers the SES email,
  // then hand off to the thank-you page.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name;
    const email = form.elements.email;
    const company = form.elements.company;

    if (!name.value.trim()) return name.focus();
    if (!email.value.trim() || !email.checkValidity()) return email.focus();
    if (!company.value.trim()) return company.focus();

    setSending(true);
    setError("");

    const data = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          // The topic radios are what the visitor picked; Strapi stores it as
          // the inquiry subject.
          subject: data.get("topic"),
          message: data.get("message"),
          source: "contact",
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong.");
      }
      router.push("/thank-you");
    } catch (submitError) {
      setSending(false);
      setError(submitError.message);
    }
  };

  return (
    <div className="contact-page">
      <div className="wrap">
        <div className="contact-grid">
          {/* Left Context Column */}
          <div className="contact-intro">
            <div className="intro-head">
              <span className="eyebrow">Contact DropSkip</span>
              <h1>Let’s make your next inventory decision clearer.</h1>
              <p>
                Tell us a little about your operation and what you are trying to solve. Whether you
                want to explore DropSkip, install the Shopify app or ask a product question, we’ll
                connect you with the right person.
              </p>
            </div>

            {/* Value Context Points */}
            <div className="intro-points">
              <div className="point-item">
                <div className="point-icon">✓</div>
                <div className="point-text">
                  <strong>Fast human response</strong>
                  <span>Direct conversation with operators who understand DTC supply chains.</span>
                </div>
              </div>
              <div className="point-item">
                <div className="point-icon">✓</div>
                <div className="point-text">
                  <strong>Zero sales pressure</strong>
                  <span>
                    Just straightforward discussions on your stock, systems, and operating
                    questions.
                  </span>
                </div>
              </div>
              <div className="point-item">
                <div className="point-icon">✓</div>
                <div className="point-text">
                  <strong>Tailored recommendations</strong>
                  <span>
                    Whether you run Shopify, multiple warehouses, or complex replenishment cycles.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Support Email Card */}
            <div className="email-card">
              <h2>Prefer email?</h2>
              <p>You can reach our team directly at any time:</p>
              <a className="mail-link" href="mailto:support@dropskip.ai">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width={20} height={16} x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Write to support@dropskip.ai
              </a>
              <p className="support-note">
                For product support, include your store name and a short description of the issue.
              </p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="form-card">
            {/* Active Form Container */}
            <div id="contact-form-container">
              <div className="form-head">
                <h2>Start a conversation</h2>
                <p>Share a few details and we’ll get back to you promptly.</p>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} noValidate={true}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="full-name">
                      Your name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      name="name"
                      placeholder="Enter your full name"
                      required={true}
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-email">
                      Work email <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="work-email"
                      name="email"
                      placeholder="you@company.com"
                      required={true}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company-name">
                    Company <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    name="company"
                    placeholder="Your company name"
                    required={true}
                    autoComplete="organization"
                  />
                </div>

                <div className="form-group">
                  <label id="topic-label">What would you like to discuss?</label>
                  <div className="topics-grid" role="radiogroup" aria-labelledby="topic-label">
                    <div className="topic-option">
                      <input
                        type="radio"
                        id="topic-demo"
                        name="topic"
                        value="Book a product demo"
                        defaultChecked={true}
                      />
                      <label htmlFor="topic-demo">
                        <span className="topic-bullet"></span>
                        <span>Book a product demo</span>
                      </label>
                    </div>
                    <div className="topic-option">
                      <input
                        type="radio"
                        id="topic-shopify"
                        name="topic"
                        value="Install the Shopify app"
                      />
                      <label htmlFor="topic-shopify">
                        <span className="topic-bullet"></span>
                        <span>Install the Shopify app</span>
                      </label>
                    </div>
                    <div className="topic-option">
                      <input
                        type="radio"
                        id="topic-inventory"
                        name="topic"
                        value="Inventory planning challenge"
                      />
                      <label htmlFor="topic-inventory">
                        <span className="topic-bullet"></span>
                        <span>Inventory planning challenge</span>
                      </label>
                    </div>
                    <div className="topic-option">
                      <input
                        type="radio"
                        id="topic-question"
                        name="topic"
                        value="Product or integration question"
                      />
                      <label htmlFor="topic-question">
                        <span className="topic-bullet"></span>
                        <span>Product or integration question</span>
                      </label>
                    </div>
                    <div className="topic-option">
                      <input
                        type="radio"
                        id="topic-partner"
                        name="topic"
                        value="Partnership opportunity"
                      />
                      <label htmlFor="topic-partner">
                        <span className="topic-bullet"></span>
                        <span>Partnership opportunity</span>
                      </label>
                    </div>
                    <div className="topic-option">
                      <input type="radio" id="topic-other" name="topic" value="Something else" />
                      <label htmlFor="topic-other">
                        <span className="topic-bullet"></span>
                        <span>Something else</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell us a little more</label>
                  <p style={{ fontSize: "0.84rem", color: "var(--muted)", margin: "0 0 8px" }}>
                    What are you trying to understand, improve or decide? A few lines are enough.
                  </p>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="A few lines on your products, locations, or current planning questions..."
                  ></textarea>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn-submit" id="submit-btn" disabled={sending}>
                    <span>{sending ? "Sending..." : "Send My Message"}</span>
                    {sending ? null : <span className="arrow">↗</span>}
                  </button>
                  <p className="form-note">
                    No lengthy questionnaire. Just enough context to start a useful conversation.
                  </p>
                  {error ? (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            {/* Form Success Message State */}
            <div
              className="success-container"
              id="success-message"
              role="status"
              aria-live="polite"
            >
              <div className="success-icon">✓</div>
              <h2>Thanks. Your message is with us.</h2>
              <p>We’ll review what you shared and connect you with the right person.</p>
              <div className="success-actions">
                <Link className="btn btn-primary" href="/">
                  Return to the homepage <span className="arrow">→</span>
                </Link>
                <button type="button" className="btn btn-ghost" id="reset-form-btn">
                  Send another note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
