"use client";

import Link from "next/link";
import "@/styles/thanks.css";

/**
 * Shown in place of a page that fails while rendering, so a visitor gets the
 * site's header, footer and a way forward instead of a bare error screen. It
 * borrows the thank-you page's card, which already has the right shape.
 */
export default function SiteError({ reset }) {
  return (
    <div className="thanks-page">
      <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
        <div className="thank-card">
          <span className="thank-badge">Something went wrong</span>
          <h1>This page did not load properly.</h1>
          <p className="lead-copy">
            It is on our side, not yours. Try again, or head back to the homepage.
          </p>

          <div className="action-row">
            <button type="button" className="btn btn-primary" onClick={() => reset()}>
              <span>Try again</span>
            </button>
            <Link className="btn btn-secondary" href="/">
              <span>Return to Homepage</span>
            </Link>
          </div>

          <div className="contact-note-box">
            <span>Still not working?</span>
            <span>
              Write directly to <a href="mailto:support@dropskip.ai">support@dropskip.ai</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
