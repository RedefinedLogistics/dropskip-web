import Link from "next/link";
import "@/styles/thanks.css";

export const metadata = {
  title: { absolute: "Thank You | DropSkip" },
  description:
    "Thank you for sharing your details. We have received your message and will get back to you ASAP.",
};

export default function ThankYouPage() {
  return (
    <div className="thanks-page">
      <div className="wrap" style={{ display: "flex", justifyContent: "center" }}>
        <div className="thank-card">
          <div className="check-icon" aria-hidden="true">
            ✓
          </div>
          <span className="thank-badge">Message Received</span>
          <h1>Thank you for sharing the details.</h1>
          <p className="lead-copy">
            We’ll review what you shared and get back to you ASAP with clear context for your
            operation.
          </p>

          <div className="action-row">
            <Link className="btn btn-primary" href="/">
              <span>Return to Homepage</span>
              <span className="arrow">↗</span>
            </Link>
            <Link className="btn btn-secondary" href="/product">
              <span>Explore the Product</span>
            </Link>
          </div>

          <div className="contact-note-box">
            <span>Need immediate support?</span>
            <span>
              Write directly to <a href="mailto:support@dropskip.ai">support@dropskip.ai</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
