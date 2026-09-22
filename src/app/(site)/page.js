import Link from "next/link";
import BookDemoButton from "@/components/BookDemoButton";
import WorkflowTabs from "@/components/WorkflowTabs";
import "@/styles/home.css";

/**
 * The home page. It makes the case in one pass: the position a brand is in,
 * why more stock does not fix it, what a decision looks like, what it costs to
 * get wrong, who stays in control, and how to start.
 *
 * Ported from the design's index.html, so the class names and section ids are
 * the ones home.css and the header's nav links expect.
 */

export default function Home() {
  return (
    <div className="home-page">
      {/* The promise, and the first invitation to book a demo. */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">
              AI-enabled inventory positioning for DTC brands
            </p>
            <h1>
              Supply-chain decisions that scale{" "}
              <span className="accent">cash flow and margins.</span>
            </h1>
            <p className="hero-copy">
              DropSkip connects demand, inventory, and incoming supply to help
              you decide what to buy, how much, when, and where. See what needs
              attention, understand the reasoning, and act with confidence.
            </p>
            <p className="capital-line">
              Put your capital behind the products and locations that need it.
            </p>
            <div className="hero-actions">
              <BookDemoButton className="btn btn-primary">
                Book a Demo <span className="arrow">↗</span>
              </BookDemoButton>
              <Link className="btn btn-ghost" href="#how-it-works">
                See How It Works <span className="arrow">↓</span>
              </Link>
            </div>
            <p className="built-for">
              Built for brand operators managing inventory across products,
              channels, and locations.
            </p>
          </div>

          <div
            className="product-stage"
            aria-label="Illustration of the DropSkip inventory decision interface"
          >
            <div className="floating-chip chip-top">
              <span>↑</span> 18 days coverage
            </div>
            <div className="map-card">
              <div className="map-head">
                <span className="map-title">Inventory position · Face Oil</span>
                <span className="live">Live view</span>
              </div>
              <div className="map-body">
                <svg
                  className="network-svg"
                  viewBox="0 0 450 240"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M64 119C139 31 257 23 377 71M80 129c110 70 198 64 306 16"
                    stroke="#c2cdd4"
                    strokeWidth="2"
                    strokeDasharray="5 7"
                  />
                  <path d="M221 120 363 75" stroke="#ff6b2c" strokeWidth="3" />
                  <circle cx="221" cy="120" r="5" fill="#ff6b2c" />
                  <circle cx="363" cy="75" r="5" fill="#ff6b2c" />
                </svg>
                <div className="location loc-a">
                  <small>East</small>
                  <strong>11 days</strong>
                </div>
                <div className="location loc-b">
                  <small>West</small>
                  <strong>4 days</strong>
                </div>
                <div className="location loc-c">
                  <small>Central</small>
                  <strong>22 days</strong>
                </div>
                <div className="center-product">
                  SKU
                  <br />
                  FO-004
                </div>
              </div>
              <div className="decision-bar">
                <div>
                  <small>Recommended action</small>
                  <strong>Transfer 240 units · Central → West</strong>
                </div>
                <button className="approve" type="button">
                  Review action
                </button>
              </div>
            </div>
            <div className="floating-chip chip-bottom">
              <span>−$8.4k</span> new PO avoided
            </div>
          </div>
        </div>
      </section>

      {/* The questions an operator is actually trying to answer. */}
      <section className="section questions" id="product">
        <div className="wrap">
          <div className="question-row">
            <div className="question-tag">One connected operating view</div>
            <div>
              <h2 className="section-title">
                Understand your position. Decide what comes next.
              </h2>
              <p className="section-intro">
                Connect everyday inventory decisions with the bigger questions
                of demand, capital, and growth.
              </p>
            </div>
          </div>

          <div className="pillar-grid">
            <article className="pillar">
              <span className="pillar-num">01</span>
              <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
                <circle
                  cx="24"
                  cy="24"
                  r="17"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 25h24M24 12c5 5 7 11 7 18M24 12c-5 5-7 11-7 18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3>Visibility</h3>
              <p>
                See demand, stock, and incoming supply across the network: what
                is available, committed, and at risk.
              </p>
            </article>

            <article className="pillar">
              <span className="pillar-num">02</span>
              <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
                <path
                  d="M10 33 19 22l8 6 11-15"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <circle cx="19" cy="22" r="3" fill="currentColor" />
                <circle cx="38" cy="13" r="3" fill="currentColor" />
              </svg>
              <h3>Insights</h3>
              <p>
                Identify what needs attention, investigate the drivers, and see
                the reasoning behind the next step.
              </p>
            </article>

            <article className="pillar">
              <span className="pillar-num">03</span>
              <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
                <path
                  d="M11 12h26M11 24h18M11 36h22"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <circle
                  cx="31"
                  cy="24"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3>Supply Chain Strategy</h3>
              <p>
                Compare purchasing, stock placement, and allocation scenarios
                before committing capital.
              </p>
            </article>

            <article className="pillar">
              <span className="pillar-num">04</span>
              <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
                <path
                  d="M9 35V20m10 15V13m10 22V24m10 11V8"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <h3>Demand Planning &amp; Forecasting</h3>
              <p>
                Anticipate demand by product, channel, and location before
                shortages or excess build up.
              </p>
            </article>

            <article className="pillar">
              <span className="pillar-num">05</span>
              <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
                <path
                  d="M8 15 24 7l16 8-16 8-16-8Zm0 9 16 8 16-8M8 33l16 8 16-8"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3>Inventory Positioning</h3>
              <p>
                Align stock with expected demand using allocation and
                rebalancing recommendations your team controls.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* The counter-intuitive part: more stock does not mean better availability. */}
      <section className="section problem">
        <div className="wrap problem-grid">
          <div className="problem-copy">
            <p className="eyebrow dark">The inventory problem</p>
            <h2 className="section-title">
              More stock does not always mean better availability.
            </h2>
            <p>
              A bestseller runs short in one warehouse while the same product
              sits elsewhere. A new purchase order commits more cash, even
              though a transfer could cover the gap.
            </p>
            <p>
              DropSkip helps purchasing, planning, and operations assess these
              situations from the same picture.
            </p>
            <div className="big-question">
              What is at risk? What is causing it? Which action makes the most
              sense?
            </div>
          </div>

          <div className="stock-visual">
            <div className="stock-head">
              <strong>Network stock position</strong>
              <span>Today · All locations</span>
            </div>
            <div className="sku-line">
              <div className="sku-img">FO</div>
              <div className="sku-meta">
                <small>Face Oil · West</small>
                <strong>Demand accelerating</strong>
              </div>
              <span className="stock-pill low">4 days left</span>
            </div>
            <div className="sku-line">
              <div
                className="sku-img"
                style={{ background: "var(--blue-wash)", color: "var(--blue)" }}
              >
                FO
              </div>
              <div className="sku-meta">
                <small>Face Oil · Central</small>
                <strong>Above target coverage</strong>
              </div>
              <span className="stock-pill high">22 days</span>
            </div>
            <div className="transfer">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M4 10h22m0 0-5-5m5 5-5 5M28 22H6m0 0 5-5m-5 5 5 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <small>Lower-capital option found</small>
                <strong>Rebalance existing stock before purchasing more</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One inventory gap, followed all the way to a reviewable action. */}
      <section className="section workflow" id="how-it-works">
        <div className="wrap">
          <p className="eyebrow">A decision you can explain</p>
          <h2 className="section-title">
            From an inventory gap to a reviewable action.
          </h2>
          <p className="section-intro">
            Follow one operational signal through the reasoning, trade-offs, and
            proposed next move.
          </p>
          <WorkflowTabs />
          <Link className="demo-link" href="#demo">
            See the workflow in a demo <span className="arrow">↗</span>
          </Link>
        </div>
      </section>

      {/* What each of those decisions is worth in cash and margin. */}
      <section className="section financial">
        <div className="wrap">
          <p className="eyebrow dark">Capital-aware planning</p>
          <h2 className="section-title">
            Every inventory decision has a financial consequence.
          </h2>

          <div className="impact-grid">
            <article className="impact-card">
              <div className="impact-art">
                <svg viewBox="0 0 320 135" fill="none" aria-hidden="true">
                  <rect
                    x="23"
                    y="89"
                    width="45"
                    height="24"
                    rx="5"
                    fill="var(--chart-1)"
                  />
                  <rect
                    x="77"
                    y="70"
                    width="45"
                    height="43"
                    rx="5"
                    fill="var(--chart-2)"
                  />
                  <rect
                    x="131"
                    y="47"
                    width="45"
                    height="66"
                    rx="5"
                    fill="var(--chart-3)"
                  />
                  <path
                    d="M194 94c37-42 58-54 100-66"
                    stroke="#071c2d"
                    strokeWidth="3"
                  />
                  <path
                    d="m283 25 12 2-4 12"
                    stroke="#071c2d"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <h3>Release cash tied up in excess stock.</h3>
              <p>
                Identify where inventory exceeds expected demand and evaluate
                transfers, purchasing changes, or markdowns.
              </p>
            </article>

            <article className="impact-card">
              <div className="impact-art">
                <svg viewBox="0 0 320 135" fill="none" aria-hidden="true">
                  <path
                    d="M24 91c41-4 49-54 87-44 33 9 28 45 67 41 43-4 48-62 118-69"
                    stroke="#2459e0"
                    strokeWidth="4"
                  />
                  <path d="M24 112h272" stroke="#c2cdd4" />
                  <circle cx="111" cy="47" r="7" fill="#ff6b2c" />
                  <circle cx="178" cy="88" r="7" fill="#ff6b2c" />
                </svg>
              </div>
              <h3>Protect sales where demand is strongest.</h3>
              <p>
                Surface coverage gaps early enough to consider replenishment or
                reallocation before availability becomes a problem.
              </p>
            </article>

            <article className="impact-card">
              <div className="impact-art">
                <svg viewBox="0 0 320 135" fill="none" aria-hidden="true">
                  <circle
                    cx="160"
                    cy="68"
                    r="47"
                    stroke="var(--navy-line)"
                    strokeWidth="18"
                  />
                  <path
                    d="M160 21a47 47 0 0 1 45 61"
                    stroke="#ff6b2c"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M160 68 194 48"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="160" cy="68" r="6" fill="#fff" />
                </svg>
              </div>
              <h3>Protect margins as you grow.</h3>
              <p>
                Weigh inventory actions against avoidable expediting, excess
                holding, and markdown exposure.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Reasoning is shown, and the team keeps the final call. */}
      <section className="section reasoning">
        <div className="wrap reason-grid">
          <div className="reason-copy">
            <p className="eyebrow dark">Operator control</p>
            <h2 className="section-title">
              Clear reasoning. Your team stays in control.
            </h2>
            <p className="section-intro">
              A recommendation should explain what changed, why it matters, and
              what the proposed action is intended to address. DropSkip brings
              that reasoning into the decision so operators can explain their
              choices across planning, finance, and leadership.
            </p>
            <p className="control-line">
              Review the evidence. Adjust the plan. Approve the action.
            </p>
          </div>

          <div
            className="reason-stack"
            aria-label="Layered example recommendation cards"
          >
            <div className="reason-card back" />
            <div className="reason-card mid" />
            <div className="reason-card front">
              <div className="rec-top">
                <span>Recommended inventory action</span>
                <span className="confidence">High confidence</span>
              </div>
              <div className="rec-action">
                Transfer 240 units to the West warehouse
              </div>
              <div className="reason-list">
                <div className="reason-item">
                  <span className="check">✓</span>
                  <span>
                    West is projected to stock out 9 days before the next
                    inbound delivery.
                  </span>
                </div>
                <div className="reason-item">
                  <span className="check">✓</span>
                  <span>
                    Central remains above target coverage after the transfer.
                  </span>
                </div>
                <div className="reason-item">
                  <span className="check">✓</span>
                  <span>
                    The transfer avoids committing capital to an unnecessary
                    purchase order.
                  </span>
                </div>
              </div>
              <div className="rec-actions">
                <button className="primary" type="button">
                  Approve
                </button>
                <button type="button">Adjust</button>
                <button type="button">Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to adopt it without replacing the stack. #shopify is linked from the nav. */}
      <section className="section adoption" id="shopify">
        <div className="wrap">
          <div className="adoption-head">
            <div>
              <p className="eyebrow">Practical adoption</p>
              <h2 className="section-title">
                Build on the systems you already use.
              </h2>
            </div>
            <p>
              A focused route from connected data to useful inventory decisions,
              without replacing the operational stack your team relies on.
            </p>
          </div>

          <div className="adoption-grid">
            <article className="adopt-item">
              <span className="adopt-num">01</span>
              <h3>No rip and replace</h3>
              <p>
                Connect your existing commerce, inventory, and operational data.
              </p>
            </article>
            <article className="adopt-item">
              <span className="adopt-num">02</span>
              <h3>A focused starting point</h3>
              <p>
                Begin with the inventory questions that matter most to your
                team.
              </p>
            </article>
            <article className="adopt-item">
              <span className="adopt-num">03</span>
              <h3>Clear onboarding scope</h3>
              <p>
                Agree on data requirements, connections, and rollout steps
                upfront.
              </p>
            </article>
            <article className="adopt-item">
              <span className="adopt-num">04</span>
              <h3>Shared measures of value</h3>
              <p>
                Define success around availability, inventory investment, and
                operational priorities.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* The closing ask. #demo is linked from the nav and from other pages. */}
      <section className="closing" id="demo">
        <div className="closing-card">
          <div className="closing-grid">
            <div>
              <p className="eyebrow" style={{ color: "white" }}>
                Bring one inventory challenge
              </p>
              <h2>See what DropSkip could change in your decisions.</h2>
              <p>
                We&rsquo;ll walk through the relevant workflow, explain the
                reasoning behind the recommendations, and discuss how DropSkip
                could fit your operations.
              </p>
              <div className="challenge-list">
                <span>Recurring stockouts</span>
                <span>Excess inventory</span>
                <span>Purchasing uncertainty</span>
                <span>Stock in the wrong location</span>
              </div>
            </div>
            <div className="closing-note">
              <strong>Start with one decision.</strong>
              <p>
                Tell us which inventory decision your team needs to make.
                We&rsquo;ll keep the demo focused on that operating question.
              </p>
              <BookDemoButton className="btn">
                Book a Demo <span className="arrow">↗</span>
              </BookDemoButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
