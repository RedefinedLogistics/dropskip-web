import DecisionBoard from "@/components/product/DecisionBoard";
import BookDemoButton from "@/components/BookDemoButton";
import "@/styles/product.css";

/**
 * The product page: what DropSkip does, in the order a visitor asks it.
 * The promise, the gap it fills, the workflow, proof, then the demo.
 *
 * The markup was ported from the design's product.html, so the class names and
 * the section ids are the ones product.css and the in-page anchors expect.
 * Two blocks are interactive and live in their own client components.
 */

export const metadata = {
  title: {
    absolute: "AI-Enabled Supply-Chain Decisions for DTC Brands | DropSkip",
  },
  description:
    "DropSkip connects demand, inventory, incoming supply, purchasing, and fulfilment signals so DTC operators know what matters, why it matters, and what to do next.",
};

export default function ProductPage() {
  return (
    <div className="product-page">
      <a className="skip" href="#premise">
        Skip to content
      </a>

      {/* The promise, plus the two ways into the page: the demo, or a sample decision. */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">
                AI-enabled demand planning and supply-chain decision platform
              </p>
              <h1 id="hero-title">
                Turn demand signals into supply chain decisions that your team can act on.
              </h1>
              <p className="hero-lede">
                DropSkip connects demand, sales, inventory, purchasing, and fulfillment data into a
                single workflow, then shows operators the priority, the rationale, and the
                recommended action.
              </p>
              <div className="hero-actions">
                <BookDemoButton className="button primary">
                  Book a demo{" "}
                  <span className="arr" aria-hidden="true">
                    ↗
                  </span>
                </BookDemoButton>
                <a className="button outline" href="#action">
                  See a sample decision{" "}
                  <span className="arr" aria-hidden="true">
                    ↓
                  </span>
                </a>
              </div>
            </div>
            <div className="decision-console" aria-label="How DropSkip turns signals into action">
              <div className="console-top">
                <span>From signal to action</span>
                <span className="status">Operator controlled</span>
              </div>
              <div className="console-body">
                <span className="decision-label">What DropSkip connects</span>
                <h2>One path from operating signal to approved action.</h2>
                <div className="hero-path">
                  <div className="hero-path-step">
                    <span>01</span>
                    <div>
                      <strong>Connect</strong>
                      <small>Demand, sales, inventory, purchasing, and fulfillment</small>
                    </div>
                  </div>
                  <div className="hero-path-step">
                    <span>02</span>
                    <div>
                      <strong>Prioritize</strong>
                      <small>Risks, requirements, and working-capital opportunities</small>
                    </div>
                  </div>
                  <div className="hero-path-step">
                    <span>03</span>
                    <div>
                      <strong>Act</strong>
                      <small>Approve, adjust, or dismiss with the rationale visible</small>
                    </div>
                  </div>
                </div>
                <div className="hero-result">
                  <small>Outcome</small>
                  <strong>A prioritized recommendation ready for operator review.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The gap: planning tools stop where the operating decision starts. */}
      <section className="section premise" id="premise" aria-labelledby="premise-title">
        <div className="wrap">
          {/* Centred like the home page's "One connected operating view". */}
          <div className="center-head">
            <p className="eyebrow">The missing layer</p>
            <h2 id="premise-title">
              <span>Your systems record activity.</span>{" "}
              <span>DropSkip helps your team decide what to do next.</span>
            </h2>
          </div>
          <div className="system-cols">
            <article className="system-col">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17l5-5 4 4 8-8" />
                  <path d="M15 8h5v5" />
                </svg>
              </span>
              <span className="system-num">01</span>
              <span className="system-kicker">Demand</span>
              <h3>Commerce and planning tools</h3>
              <p>Show what customers are buying and what the business expects to sell.</p>
            </article>
            <article className="system-col">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
                  <path d="m3 8 9 5 9-5M12 13v8" />
                </svg>
              </span>
              <span className="system-num">02</span>
              <span className="system-kicker">Inventory</span>
              <h3>Inventory systems</h3>
              <p>Show what is available, committed, incoming, and where it sits.</p>
            </article>
            <article className="system-col">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 6h11v10H2zM13 10h4l4 3v3h-8" />
                  <circle cx="6" cy="17.5" r="1.8" />
                  <circle cx="17" cy="17.5" r="1.8" />
                </svg>
              </span>
              <span className="system-num">03</span>
              <span className="system-kicker">Execution</span>
              <h3>ERP, WMS, and 3PL systems</h3>
              <p>Record movement, purchasing, fulfilment, and operational execution.</p>
            </article>
          </div>
          <div className="premise-close">
            <strong>
              DropSkip turns fragmented inputs into complete operating picture, and drives where a
              decision is required.
            </strong>
          </div>
        </div>
      </section>

      {/* What the platform actually does, grouped by capability. */}
      <section
        className="section capabilities"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="wrap">
          <div className="center-head">
            <p className="eyebrow">Capabilities</p>
            <h2 id="capabilities-title">
              <span>Plan across the supply chain</span>{" "}
              <span>without losing sight of the decision.</span>
            </h2>
            <p>
              Each capability uses the same connected operating context, so changes in one plan
              carry into the decisions that follow.
            </p>
          </div>
          <div className="cap-grid">
            <article className="cap-card">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <span className="cap-no">01</span>
              <h3>360° Visibility</h3>
              <p>
                See sales, demand signals, seasonality, inventory health, and incoming stock in one
                connected view.
              </p>
            </article>
            <article className="cap-card">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18h6M10 21h4" />
                  <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
                </svg>
              </span>
              <span className="cap-no">02</span>
              <h3>Insights &amp; Reasoning</h3>
              <p>
                Understand exceptions, root causes, wins, misses, risks, and opportunities behind
                your inventory position.
              </p>
            </article>
            <article className="cap-card">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="m7 15 4-4 3 3 5-6" />
                </svg>
              </span>
              <span className="cap-no">03</span>
              <h3>Demand Planning</h3>
              <p>
                Align product and inventory plans with expected market demand and your business
                goals.
              </p>
            </article>
            <article className="cap-card">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17c3-1 4-8 7-8s3 5 5 5 3-3 6-6" />
                  <path d="M3 21h18" strokeDasharray="2 3" />
                </svg>
              </span>
              <span className="cap-no">04</span>
              <h3>Forecasting</h3>
              <p>
                Simulate future inventory positions by product, channel, and location as demand and
                supply conditions change.
              </p>
            </article>
            <article className="cap-card">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M2 3h3l2.6 12.4a1.5 1.5 0 0 0 1.5 1.1h8.8a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
                </svg>
              </span>
              <span className="cap-no">05</span>
              <h3>Purchase Decisions</h3>
              <p>
                Decide what to buy, how much, when, and where while protecting growth, cash, and
                margin.
              </p>
            </article>
            <article className="cap-card action-cap">
              <span className="system-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="9" rx="1.5" />
                  <rect x="14" y="3" width="7" height="5" rx="1.5" />
                  <rect x="14" y="12" width="7" height="9" rx="1.5" />
                  <rect x="3" y="16" width="7" height="5" rx="1.5" />
                </svg>
              </span>
              <span className="cap-no">06</span>
              <h3>Command Center</h3>
              <p>
                See what needs attention now, what’s changing, and what requires action before it
                impacts the business.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* A real decision being made, board and all. Client component. */}
      <section className="section product-action" id="action" aria-labelledby="action-title">
        <div className="wrap">
          <div className="center-head">
            <p className="eyebrow">Product in action</p>
            <h2 id="action-title">
              <span>See what changed, why it matters,</span>{" "}
              <span>and the recommended next move.</span>
            </h2>
            <p>
              The evidence, recommendation, and operator controls stay together in one focused
              decision view.
            </p>
          </div>
          <DecisionBoard />
        </div>
      </section>

      {/* Where DropSkip sits among the systems the team already runs. */}
      <section className="section integration" id="integration" aria-labelledby="integration-title">
        <div className="wrap">
          <div className="integration-grid">
            <div>
              <p className="eyebrow">Works with your existing systems</p>
              <h2 id="integration-title">
                <span>No rip and replace.</span>{" "}
                <span>Connect around one focused decision problem.</span>
              </h2>
              <p className="copy">
                Your current systems keep recording transactions and running operations. DropSkip
                connects their data into real-time, end-to-end visibility, then turns the insights
                into prioritized recommendations for what to do next.
              </p>
            </div>
            <div className="systems-list" aria-label="Example connected systems">
              <div className="system-row">
                <strong>Shopify</strong>
                <span>Native app and commerce data</span>
              </div>
              <div className="system-row">
                <strong>NetSuite and other ERP environments</strong>
                <span>Operational data</span>
              </div>
              <div className="system-row">
                <strong>WMS and 3PL systems</strong>
                <span>Inventory and fulfilment data</span>
              </div>
              <div className="system-row">
                <strong>CSV and spreadsheets</strong>
                <span>Flexible planning inputs</span>
              </div>
              <div className="system-row">
                <strong>API-based sources</strong>
                <span>Connection based on your environment</span>
              </div>
            </div>
          </div>
          <div className="implementation">
            <div className="implementation-head">
              <div>
                <p className="eyebrow">Implementation</p>
                <h3>Start with one focused supply chain problem.</h3>
                <p className="copy">
                  Agree the value outcome first, then connect only the data and workflow needed to
                  support it.
                </p>
              </div>
              <div className="steps">
                <div className="step">
                  <span>01</span>
                  <strong>Define the decision question and target value</strong>
                </div>
                <div className="step">
                  <span>02</span>
                  <strong>Agree the required data and access</strong>
                </div>
                <div className="step">
                  <span>03</span>
                  <strong>Connect systems or import existing planning data</strong>
                </div>
                <div className="step">
                  <span>04</span>
                  <strong>Validate assumptions and recommendations with operators</strong>
                </div>
                <div className="step">
                  <span>05</span>
                  <strong>Bring approved decisions into workflow and measure value</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The objections that come up in every demo call, answered up front. */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="center-head">
            <p className="eyebrow">Frequently asked questions</p>
            <h2 id="faq-title">
              <span>Questions operations and planning teams</span>{" "}
              <span>ask about DropSkip.</span>
            </h2>
            <p>
              Clear answers about how DropSkip fits, how AI supports the workflow, and what
              implementation involves.
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>How does DropSkip work with our existing systems?</summary>
              <p>
                Your existing systems keep recording transactions and running operations. DropSkip
                pulls data from all of them and connects the signals into one real-time view and
                insights for your supply chain. It then turns insights into prioritized
                recommendations, so you know which action to take next.
              </p>
            </details>
            <details>
              <summary>Which systems and data sources does DropSkip integrate with?</summary>
              <p>
                DropSkip connects operating signals from Shopify, NetSuite, other ERP environments,
                WMS or 3PL systems, spreadsheets, Open API and EDI-based sources. The connection
                approach is agreed during implementation based on your technology stack and data
                structure.
              </p>
            </details>
            <details>
              <summary>What makes DropSkip different from planning software?</summary>
              <p>
                Typical planning tools rely on historical data and averages to produce static plans,
                forecasts, and reports. DropSkip goes further. It combines historical seasonality
                and sales health with market insights, demand catalysts, and supplier constraints,
                then forecasts demand and stock positions and recommends the critical next moves.
              </p>
            </details>
            <details>
              <summary>Who makes the final decision?</summary>
              <p>
                Your operations team does. Every DropSkip recommendation comes with its evidence and
                reasoning. Your team can adjust assumptions, simulate and compare the potential
                operational and financial outcomes, and act on the option that delivers the best
                result.
              </p>
            </details>
            <details>
              <summary>How does AI support the decision process?</summary>
              <p>
                AI connects and interprets your operating signals, flags material changes, and
                explains the root causes. It then shows how those changes affect your supply chain,
                financial health, customer experience, and growth, now and in the future, and
                surfaces recommendations. The evidence and reasoning stay visible, and your
                operations team keeps the final decision.
              </p>
            </details>
            <details>
              <summary>What does implementation involve?</summary>
              <p>
                Implementation starts with the specific decisions you want to improve and the
                success metrics you&apos;ll measure them by. From there, we connect your data
                sources, map your data, configure assumptions, train our models and agents, and
                validate results with your operations team before rolling DropSkip out into your
                daily workflow.
              </p>
              <p>
                There&apos;s no rip-and-replace and no/low IT effort on your side. Expect first
                insights within the first week and measurable results within 30-60 days.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* The closing ask. #demo is linked from the nav and from other pages. */}
      <section className="closing dark" id="demo" aria-labelledby="demo-title">
        <div className="wrap">
          {/* Centred like the Capabilities heading, with the actions under it. */}
          <div className="center-head">
            <p className="eyebrow">Bring one decision to the demo</p>
            <h2 id="demo-title">
              <span>See how DropSkip works through</span>{" "}
              <span>a challenge your team faces today.</span>
            </h2>
            <p>
              We’ll map the relevant inputs, show how the recommendation is assembled, and identify
              where DropSkip can create measurable operating value.
            </p>
          </div>
          <div className="closing-actions">
            <BookDemoButton className="button primary">
              Book a demo{" "}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </BookDemoButton>
            <p className="closing-note">
              Or email <a href="mailto:contact@dropskip.ai">contact@dropskip.ai</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
