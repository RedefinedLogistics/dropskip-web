import DecisionExample from "@/components/inventory/DecisionExample";
import BookDemoButton from "@/components/BookDemoButton";
import "@/styles/inventory.css";

/**
 * The inventory planning page: the same argument as the product page, narrowed
 * to the buying decision — what to order, how much, when and where.
 *
 * Ported from the design's inventory-planning.html, so the class names and
 * section ids are the ones inventory.css and the in-page anchors expect.
 */

export const metadata = {
  title: {
    absolute: "AI-Enabled Inventory Planning for DTC Brands | DropSkip",
  },
  description:
    "AI-enabled inventory planning for DTC brands. Decide what to buy, how much, when, and where, while protecting cash flow and margins.",
};

export default function InventoryPlanningPage() {
  return (
    <div className="inventory-page">
      <a className="skip" href="#position">
        Skip to content
      </a>

      {/* The promise, plus the two ways into the page: the demo, or a sample decision. */}
      <section className="hero flow-hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-intro">
            <p className="eyebrow">AI-enabled inventory planning for DTC brands</p>
            <h1 id="hero-title">
              Plan the right inventory. <span>Protect cash flow and margins.</span>
            </h1>
            <p className="hero-lede">
              DropSkip connects live demand, inventory, incoming supply, and network constraints to
              show what needs attention, why it matters, and what to do next across replenishment,
              transfers, audits, and excess stock.
            </p>
            <div className="hero-actions">
              <BookDemoButton className="button primary">
                Book a demo{" "}
                <span className="arr" aria-hidden="true">
                  ↗
                </span>
              </BookDemoButton>
              <a className="text-link" href="#product">
                See a sample inventory decision{" "}
                <span className="arr" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
          <div className="hero-foot">
            <strong>One connected position. Clear next moves.</strong>
            <span>Replenish</span>
            <span>Transfer</span>
            <span>Audit</span>
            <span>Reduce</span>
          </div>
        </div>
      </section>

      {/* The problem: inventory is not one number and planning is not one report. */}
      <section className="section problem" aria-labelledby="problem-title">
        <div className="wrap">
          <div className="question-board">
            <div className="problem-copy">
              <p className="eyebrow">The inventory planning problem</p>
              <h2 id="problem-title">
                Inventory is not one number, and planning is not one report.
              </h2>
              <p className="copy">
                Your ERP records purchases. Your WMS tracks physical stock. Your sales channels show
                where demand is moving. None alone can tell you whether inventory will meet demand
                at the right place and time.
              </p>
            </div>
            <div className="questions" aria-label="Questions inventory teams need to answer">
              <div className="question">
                <span className="mono">01</span>
                <span>What is actually available to sell?</span>
              </div>
              <div className="question">
                <span className="mono">02</span>
                <span>Will incoming inventory arrive before stock runs out?</span>
              </div>
              <div className="question">
                <span className="mono">03</span>
                <span>Which location needs more stock, and which has excess?</span>
              </div>
              <div className="question">
                <span className="mono">04</span>
                <span>Which SKUs need action now, and why?</span>
              </div>
            </div>
          </div>
          <div className="outcome-strip" aria-label="Why connected inventory planning matters">
            <article>
              <span className="eyebrow">Availability</span>
              <h3>Protect sales.</h3>
              <p>See where coverage may run out before supply arrives.</p>
            </article>
            <article>
              <span className="eyebrow">Working capital</span>
              <h3>Release tied-up cash.</h3>
              <p>Find inventory that exceeds the demand ahead.</p>
            </article>
            <article>
              <span className="eyebrow">Margin</span>
              <h3>Avoid unnecessary cost.</h3>
              <p>Review transfers and reductions before another purchase or markdown.</p>
            </article>
          </div>
        </div>
      </section>

      {/* The connected position, and the four steps from it to the next move. */}
      <section className="section position dark" id="position" aria-labelledby="position-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">From signals to decisions</p>
              <h2 id="position-title">One connected position. Four steps to the next move.</h2>
            </div>
            <p>
              DropSkip brings demand, supply, inventory, and operating constraints into one
              decision-ready view, so teams can move from visibility to action.
            </p>
          </div>
          <div className="inputs" aria-label="High-level planning inputs">
            <span>Demand signals</span>
            <span>Stock position</span>
            <span>Incoming supply</span>
            <span>Network &amp; operating constraints</span>
          </div>
          <div className="journey-flow">
            <article>
              <span className="mono">01</span>
              <h3>Visibility</h3>
              <p>See the current and future inventory position across products and locations.</p>
            </article>
            <article>
              <span className="mono">02</span>
              <h3>Insights</h3>
              <p>Understand what needs attention, why it matters, and what is driving it.</p>
            </article>
            <article>
              <span className="mono">03</span>
              <h3>Plan</h3>
              <p>Compare what to buy, transfer, audit, reduce, or leave unchanged.</p>
            </article>
            <article>
              <span className="mono">04</span>
              <h3>Act</h3>
              <p>Adjust, approve, or dismiss the recommendation. Your team stays in control.</p>
            </article>
          </div>
        </div>
      </section>

      {/* What the planning layer actually does, grouped by capability. */}
      <section
        className="section capability-section"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="wrap">
          <div className="section-head flow-centered">
            <div>
              <p className="eyebrow">Inventory planning capabilities</p>
              <h2 id="capabilities-title">
                Make every inventory decision with demand, cash, and margin in view.
              </h2>
            </div>
            <p>
              Each view uses the same connected position to answer a different operational question.
            </p>
            <small className="example-caption">Selected product views</small>
          </div>
          <div className="feature-list alternating-features">
            <article className="feature">
              <div className="feature-copy">
                <p className="eyebrow">Inventory and demand</p>
                <h3>See stockout risk before it becomes lost sales.</h3>
                <p className="copy">
                  Compare available and incoming inventory with expected demand. See where coverage
                  is tightening while there is still time to act.
                </p>
                <div className="feature-points">
                  <span>Expected demand</span>
                  <span>Available stock</span>
                  <span>Supply timing</span>
                  <span>Coverage risk</span>
                </div>
              </div>
              <div className="product-mini" aria-label="Illustrative inventory sufficiency table">
                <div className="mini-bar">
                  <span>Inventory sufficiency</span>
                  <b>2 need attention</b>
                </div>
                <div className="coverage-rows">
                  <div className="coverage-row">
                    <span>Product</span>
                    <span>Available</span>
                    <span>Coverage</span>
                    <span>Status</span>
                  </div>
                  <div className="coverage-row">
                    <strong>Face Oil</strong>
                    <span>470</span>
                    <span>5.2 d</span>
                    <span>
                      <i className="risk-badge">Review</i>
                    </span>
                  </div>
                  <div className="coverage-row">
                    <strong>Night Cream</strong>
                    <span>1,260</span>
                    <span>18.4 d</span>
                    <span>
                      <i className="risk-badge healthy">Healthy</i>
                    </span>
                  </div>
                  <div className="coverage-row">
                    <strong>Body Serum</strong>
                    <span>290</span>
                    <span>3.9 d</span>
                    <span>
                      <i className="risk-badge">Urgent</i>
                    </span>
                  </div>
                </div>
              </div>
            </article>
            <article className="feature">
              <div className="feature-copy">
                <p className="eyebrow">Location-level planning</p>
                <h3>Use inventory across the network before buying more.</h3>
                <p className="copy">
                  You can have enough inventory overall and still run short where demand is
                  strongest. Compare locations to see whether a transfer can resolve the gap.
                </p>
                <div className="feature-points">
                  <span>Days of cover by location</span>
                  <span>Stock approaching risk</span>
                  <span>Available transfer source</span>
                  <span>Residual source coverage</span>
                </div>
              </div>
              <div className="product-mini" aria-label="Illustrative transfer opportunity">
                <div className="mini-bar">
                  <span>Network position</span>
                  <b>Transfer candidate</b>
                </div>
                <div className="network">
                  <div className="node">
                    <small>East Coast node</small>
                    <strong>Understocked</strong>
                    <span>4.1 days of cover</span>
                  </div>
                  <div className="node">
                    <small>West Coast node</small>
                    <strong>Source review</strong>
                    <span>17.8 days of cover</span>
                  </div>
                </div>
                <div className="transfer">Review whether a transfer resolves the gap →</div>
              </div>
            </article>
          </div>
          <div
            className="capability-briefs"
            aria-label="Additional inventory planning capabilities"
          >
            <article className="capability-brief">
              <span className="eyebrow">Replenishment planning</span>
              <h3>Buy what demand justifies.</h3>
              <p>
                Review what to order, how much, when, and where, with the reasoning visible before
                approval.
              </p>
              <strong>Protect availability without overbuying.</strong>
            </article>
            <article className="capability-brief">
              <span className="eyebrow">Inventory auditing</span>
              <h3>Fix the position before it distorts the plan.</h3>
              <p>
                Identify unexplained differences by SKU and location, then plan from the reconciled
                position.
              </p>
              <strong>Decide from inventory you can trust.</strong>
            </article>
            <article className="capability-brief">
              <span className="eyebrow">Overstock and capital</span>
              <h3>Act before excess erodes margin.</h3>
              <p>
                Review purchasing, redistribution, and markdown options against the demand ahead.
              </p>
              <strong>Release cash before the problem grows.</strong>
            </article>
          </div>
        </div>
      </section>

      {/* A warning turned into a decision, with the reasoning attached. */}
      <section className="section decision" id="product" aria-labelledby="product-title">
        <div className="wrap">
          <div className="section-head flow-centered">
            <div>
              <p className="eyebrow">Product in action</p>
              <h2 id="product-title">Move from a warning to a decision, with the why attached.</h2>
            </div>
            <p>
              Follow one SKU from a coverage gap to a recommended next move your team can inspect,
              adjust, approve, or dismiss.
            </p>
          </div>
          <DecisionExample />
          <div className="operator-line">
            <strong>DropSkip recommends. Your team decides.</strong>
            <span>Reasoning stays visible before action.</span>
          </div>
        </div>
      </section>

      {/* Where DropSkip sits among the systems the team already runs. */}
      <section className="systems" id="integration" aria-labelledby="systems-title">
        <div className="wrap systems-layout">
          <div className="systems-copy">
            <p className="eyebrow">Works with your existing systems</p>
            <h2 id="systems-title">Add a decision layer across the systems you already use.</h2>
            <p className="copy">
              Your ERP, WMS, 3PL, and commerce platforms keep recording and executing transactions.
              DropSkip connects their signals so your team can plan and decide across them.
            </p>
            <p className="no-rip">No rip and replace. Connect in days.</p>
          </div>
          <div className="system-list" aria-label="Example connected systems">
            <div className="system-row">
              <strong>Shopify</strong>
              <span>Data connection</span>
            </div>
            <div className="system-row">
              <strong>NetSuite and other ERPs</strong>
              <span>Data connection</span>
            </div>
            <div className="system-row">
              <strong>WMS and 3PL systems</strong>
              <span>Data connection</span>
            </div>
            <div className="system-row">
              <strong>CSV and spreadsheet uploads</strong>
              <span>Flexible input</span>
            </div>
            <div className="system-row">
              <strong>API-based data sources</strong>
              <span>Flexible input</span>
            </div>
          </div>
        </div>
        <div className="wrap integration-close">
          <p>Connection methods depend on your systems and integration environment.</p>
          <a className="text-link" href="#demo">
            Discuss your setup{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>

      {/* The objections that come up in every demo call, answered up front. */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2 id="faq-title">Questions about inventory planning with DropSkip.</h2>
            </div>
            <p>
              Clear answers about where DropSkip fits, how the position stays current, and who
              controls the final action.
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>What does AI-enabled inventory planning mean?</summary>
              <p>
                DropSkip uses AI to evaluate connected demand, inventory, incoming supply, lead
                times, locations, and operating constraints. It surfaces risks and recommends next
                moves with the reasoning visible, while operators keep control of the final
                decision.
              </p>
            </details>
            <details>
              <summary>How is DropSkip different from inventory management?</summary>
              <p>
                Inventory management systems record and control what the business owns. DropSkip
                looks ahead across demand and supply to help the team decide what should be
                replenished, transferred, audited, reduced, or reviewed.
              </p>
            </details>
            <details>
              <summary>Does DropSkip replace our ERP, WMS, or 3PL systems?</summary>
              <p>
                No. Those systems continue running transactions and execution. DropSkip connects
                their information to support planning and decision-making across them.
              </p>
            </details>
            <details>
              <summary>Can DropSkip support multiple warehouses and 3PLs?</summary>
              <p>
                Yes. DropSkip can compare inventory, coverage, and expected demand across multiple
                warehouses, 3PLs, and fulfillment locations to surface location-level risks and
                possible replenishment, transfer, or allocation decisions.
              </p>
            </details>
            <details>
              <summary>Is inventory information updated in real time?</summary>
              <p>
                DropSkip can use real-time and event-driven data from connected systems. The
                connection method depends on the systems and integration environment involved.
              </p>
            </details>
            <details>
              <summary>Does DropSkip automatically execute inventory decisions?</summary>
              <p>
                DropSkip surfaces the recommendation and its reasoning. Operators can inspect,
                adjust, approve, or dismiss the recommendation, keeping the final action under the
                team’s control.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* The closing ask. #demo is linked from the nav and from other pages. */}
      <section className="closing dark flow-closing" id="demo" aria-labelledby="demo-title">
        <div className="wrap closing-grid">
          <div>
            <p className="eyebrow">Turn signals into decisions</p>
            <h2 id="demo-title">See where inventory is putting sales, cash, and margin at risk.</h2>
          </div>
          <div>
            <p className="copy">
              Connect your demand, inventory, and purchasing information to see which decisions
              deserve attention across products, warehouses, and fulfillment locations.
            </p>
            <BookDemoButton className="button primary">
              Book a demo{" "}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </BookDemoButton>
            <p className="closing-note">Contact our team at support@dropskip.ai</p>
          </div>
        </div>
      </section>
    </div>
  );
}
