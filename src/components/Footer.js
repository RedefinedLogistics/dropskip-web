import Image from "next/image";
import Link from "next/link";
import BookDemoButton from "./BookDemoButton";
import { footerGroups } from "@/lib/nav";

// The four words the product is organised around, repeated here as the closing
// note. They are the same four used across the marketing pages.
const RHYTHM = ["Visibility", "Insights", "Plan", "Act"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="footer-logo" href="/" aria-label="DropSkip home">
              <Image
                className="footer-logo-img"
                src="/dropskip-logo.png"
                alt="DropSkip"
                width={1774}
                height={887}
              />
            </Link>
            <p className="footer-tagline">
              Demand planning and supply-chain decisions for DTC operators.
            </p>
            <a className="footer-mail" href="mailto:support@dropskip.ai">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width={20} height={16} x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              support@dropskip.ai
            </a>
          </div>

          {footerGroups.map((group) => (
            <nav className="footer-col" key={group.title} aria-label={group.title}>
              <h2 className="footer-col-title">{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-cta">
            <h2 className="footer-col-title">Start with one decision</h2>
            <p>
              Tell us the inventory question your team is stuck on. We keep the demo focused on that
              one.
            </p>
            <BookDemoButton className="btn btn-primary footer-demo">
              Book a Demo <span className="arrow">↗</span>
            </BookDemoButton>
          </div>
        </div>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} DropSkip</span>
          <ul className="footer-rhythm">
            {RHYTHM.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
