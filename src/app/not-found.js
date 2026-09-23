import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RerouteConsole from "@/components/RerouteConsole";
import "@/styles/site.css";
import "@/styles/nav.css";
import "@/styles/footer.css";
import "@/styles/notfound.css";

export const metadata = {
  title: { absolute: "Page not found | DropSkip" },
  // A 404 has nothing worth indexing, and indexing it competes with the real
  // pages for the same terms.
  robots: { index: false, follow: true },
};

/**
 * The 404 page, ported from the design's 404.html.
 *
 * This lives at the root rather than inside the (site) group because Next uses
 * the root not-found for any URL that matches no route at all; a not-found
 * inside a route group only catches notFound() thrown within that group. The
 * header and footer are therefore rendered here directly, since the (site)
 * layout does not wrap this file.
 */
export default function NotFound() {
  return (
    <>
      <Header />

      <main className="notfound-page">
        <div className="wrap">
          <div className="error-layout">
            <div className="error-copy">
              <div className="error-badge">
                <span className="badge-dot" aria-hidden="true" />
                <span>Error 404 · Unallocated Inventory</span>
              </div>

              <h1 className="error-title">
                The decisions you made probably{" "}
                <span className="accent-orange">landed you here.</span>
              </h1>

              <p className="error-desc">
                You requested a route that doesn&apos;t exist in our current network. Whether demand
                shifted unexpectedly or a link got misplaced in transit, you are currently at a dead
                end. But in inventory planning and on the web, there is always a better way forward.
              </p>

              <div className="actions-group">
                <Link className="btn btn-primary" href="/">
                  <span>Restart from Home</span>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link className="btn btn-secondary" href="/product">
                  <span>Explore Products</span>
                </Link>
              </div>

              <div className="reroute-bar">
                <span>Need human guidance?</span>
                <Link href="/contact">Connect with our team</Link>
                <span>
                  or write to <a href="mailto:support@dropskip.ai">support@dropskip.ai</a>
                </span>
              </div>
            </div>

            <div className="console-card">
              <div className="console-header">
                <span className="console-label">Route Diagnostic Model</span>
                <span className="status-pill">Stockout: 0 Pages Found</span>
              </div>

              <div className="metric-table">
                <div className="metric-cell alert">
                  <small>On hand at URL</small>
                  <strong>0 units</strong>
                </div>
                <div className="metric-cell">
                  <small>HTTP status</small>
                  <strong>404</strong>
                </div>
                <div className="metric-cell good">
                  <small>Recommended move</small>
                  <strong>Rebalance</strong>
                </div>
              </div>

              <div className="diagnostic-box">
                <div className="diag-head">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>Operator Root-Cause Analysis</span>
                </div>
                <p className="diag-desc">
                  Demand ran ahead of supply. The URL was either decommissioned or typed with an
                  anomalous parameter. Continuing down this path will consume capital and yield zero
                  conversions.
                </p>
              </div>

              <RerouteConsole />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
