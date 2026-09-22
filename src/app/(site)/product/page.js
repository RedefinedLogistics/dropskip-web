import WorkflowExplorer from "@/components/product/WorkflowExplorer";
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
      <a className="skip" href="#workflow">
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
                Turn supply-chain signals into decisions your team can act on.
              </h1>
              <p className="hero-lede">
                DropSkip connects demand, inventory, incoming supply, purchasing, and fulfilment
                data, then shows operators the priority, the rationale, and the recommended action.
              </p>
              <div className="hero-actions">
                <BookDemoButton className="button primary">
                  Book a demo{" "}
                  <span className="arr" aria-hidden="true">
                    ↗
                  </span>
                </BookDemoButton>
                <a className="text-link" href="#action">
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
                <p>
                  Planning context and execution data stay connected while the operator remains in
                  control.
                </p>
                <div className="hero-path">
                  <div className="hero-path-step">
                    <span>01</span>
                    <div>
                      <strong>Connect</strong>
                      <small>Demand, inventory, supply, and purchasing data</small>
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
          <div className="hero-foot">
            <strong>Connected planning from demand to delivery.</strong>
            <span>Demand</span>
            <span>Inventory</span>
            <span>Purchasing</span>
            <span>Fulfilment</span>
          </div>
        </div>
      </section>

      {/* The gap: planning tools stop where the operating decision starts. */}
      <section className="section premise" aria-labelledby="premise-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">The missing layer</p>
              <h2 id="premise-title">
                Your systems record activity. DropSkip helps your team decide what to do next.
              </h2>
            </div>
            <p>
              Most operating systems explain one part of the supply chain. The decision still has to
              be assembled across reports, spreadsheets, and teams.
            </p>
          </div>
          <div className="system-cols">
            <article className="system-col">
              <span>Demand</span>
              <h3>Commerce and planning tools</h3>
              <p>Show what customers are buying and what the business expects to sell.</p>
            </article>
            <article className="system-col">
              <span>Inventory</span>
              <h3>Inventory systems</h3>
              <p>Show what is available, committed, incoming, and where it sits.</p>
            </article>
            <article className="system-col">
              <span>Execution</span>
              <h3>ERP, WMS, and 3PL systems</h3>
              <p>Record movement, purchasing, fulfilment, and operational execution.</p>
            </article>
          </div>
          <div className="premise-close">
            <strong>
              DropSkip turns fragmented inputs into a shared operating picture, and highlights where
              a decision is required.
            </strong>
            <span>Connected data · Clear priorities · Controlled action</span>
          </div>
        </div>
      </section>

      {/* The signal-to-action path, walked one step at a time. Client component. */}
      <section className="section workflow dark" id="workflow" aria-labelledby="workflow-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Connected workflow</p>
              <h2 id="workflow-title">Move from plan to prioritized action in one workflow.</h2>
            </div>
            <p>
              Explore how demand, inventory, and purchasing context carries through to an
              operator-approved decision.
            </p>
          </div>
          <WorkflowExplorer />
        </div>
      </section>

      {/* What the platform actually does, grouped by capability. */}
      <section
        className="section capabilities"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 id="capabilities-title">
                Plan across the supply chain without losing sight of the decision.
              </h2>
            </div>
            <p>
              Each capability uses the same connected operating context, so changes in one plan
              carry into the decisions that follow.
            </p>
          </div>
          <div className="cap-grid">
            <article className="cap-card">
              <span className="cap-no">01</span>
              <h3>Demand planning and forecasting</h3>
              <p>
                Compare plans with current signals and see what changed demand means for inventory
                and cash.
              </p>
              <strong>Demand becomes a decision input, not an isolated number.</strong>
            </article>
            <article className="cap-card">
              <span className="cap-no">02</span>
              <h3>Inventory planning</h3>
              <p>
                Connect expected demand with available and incoming stock to surface coverage,
                excess, and audit requirements.
              </p>
              <strong>See the inventory position the next decision depends on.</strong>
            </article>
            <article className="cap-card">
              <span className="cap-no">03</span>
              <h3>Multi-warehouse planning</h3>
              <p>
                Compare products and requirements across warehouses, 3PLs, channels, and fulfilment
                locations.
              </p>
              <strong>Use the network before buying more.</strong>
            </article>
            <article className="cap-card">
              <span className="cap-no">04</span>
              <h3>Open-to-Buy</h3>
              <p>
                Bring inventory needs, commitments, and purchasing capacity into one view to protect
                working capital.
              </p>
              <strong>See what the business needs and can responsibly commit.</strong>
            </article>
            <article className="cap-card">
              <span className="cap-no">05</span>
              <h3>Replenishment and purchasing</h3>
              <p>
                Review what to buy, how much, when, and where, with evidence behind the
                recommendation.
              </p>
              <strong>Move approved decisions into the next workflow.</strong>
            </article>
            <article className="cap-card action-cap">
              <span className="cap-no">06</span>
              <h3>Command Center</h3>
              <p>
                Prioritize immediate risks, upcoming requirements, and opportunities to release cash
                or protect margin.
              </p>
              <strong>Start with the decisions that matter now.</strong>
            </article>
          </div>
        </div>
      </section>

      {/* A real decision being made, board and all. Client component. */}
      <section className="section product-action" id="action" aria-labelledby="action-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Product in action</p>
              <h2 id="action-title">
                See what changed, why it matters, and the recommended next move.
              </h2>
            </div>
            <p>
              The evidence, recommendation, and operator controls stay together in one focused
              decision view.
            </p>
          </div>
          <DecisionBoard />
        </div>
      </section>

      {/* Who decides: the recommendation is a proposal, the operator approves it. */}
      <section className="section control" aria-labelledby="control-title">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Operator control</p>
              <h2 id="control-title">Keep the reasoning visible from signal to decision.</h2>
            </div>
            <p>
              AI helps interpret operating signals and surface recommendations. Your operators keep
              control of the final action.
            </p>
          </div>
          <div className="control-flow">
            <article className="control-step">
              <span>01</span>
              <h3>What changed</h3>
              <p>See the operating signal that created the recommendation.</p>
            </article>
            <article className="control-step">
              <span>02</span>
              <h3>Why it matters</h3>
              <p>Understand the operational and economic consequence.</p>
            </article>
            <article className="control-step">
              <span>03</span>
              <h3>Recommended next move</h3>
              <p>Review the proposed action and supporting evidence.</p>
            </article>
            <article className="control-step">
              <span>04</span>
              <h3>What the operator decided</h3>
              <p>Record approved, adjusted, or dismissed recommendations.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Where DropSkip sits among the systems the team already runs. */}
      <section className="section integration" id="integration" aria-labelledby="integration-title">
        <div className="wrap">
          <div className="integration-grid">
            <div>
              <p className="eyebrow">Works with your existing systems</p>
              <h2 id="integration-title">
                Add a decision layer across the systems already running your supply chain.
              </h2>
              <p className="copy">
                Your existing systems continue to record transactions and run execution. DropSkip
                connects their signals, turns them into prioritized recommendations, and moves
                approved decisions into the next workflow.
              </p>
              <p className="no-rip">
                No rip and replace. Connect around one focused decision problem.
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
                <h3>Start with one focused decision problem.</h3>
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
          <div className="section-head">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h2 id="faq-title">Questions operations and planning teams ask about DropSkip.</h2>
            </div>
            <p>
              Clear answers about how DropSkip fits, how AI supports the workflow, and what
              implementation involves.
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>How does DropSkip work with our existing systems?</summary>
              <p>
                DropSkip connects operating signals from Shopify, NetSuite, other ERP environments,
                WMS or 3PL systems, spreadsheets, and API-based sources. The connection approach is
                agreed during implementation based on your stack and data structure.
              </p>
            </details>
            <details>
              <summary>What makes DropSkip different from planning software?</summary>
              <p>
                Planning tools typically produce plans, forecasts, or reports. DropSkip connects
                those outputs with current operating signals, prioritizes the decisions that matter,
                and explains the recommended next move.
              </p>
            </details>
            <details>
              <summary>Who makes the final decision?</summary>
              <p>
                The operator does. Teams can review the evidence and reasoning, adjust relevant
                assumptions or the proposed action, approve it, or dismiss it with a recorded
                reason.
              </p>
            </details>
            <details>
              <summary>How does AI support the decision process?</summary>
              <p>
                AI helps connect and interpret operating signals, identify material changes, and
                surface recommendations. The relevant evidence and reasoning remain visible, and
                operators stay in control of the final decision.
              </p>
            </details>
            <details>
              <summary>Can DropSkip support multiple warehouses and sales channels?</summary>
              <p>
                Yes. DropSkip can compare demand and inventory requirements across fulfilment
                locations and bring together signals from multiple systems or channels. The final
                setup depends on your network and data sources.
              </p>
            </details>
            <details>
              <summary>What does implementation involve?</summary>
              <p>
                Implementation starts with a focused decision question and agreed value measures. It
                can include data mapping, connections or imports, configuration of assumptions,
                operator validation, and rollout into the working process.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* The closing ask. #demo is linked from the nav and from other pages. */}
      <section className="closing dark" id="demo" aria-labelledby="demo-title">
        <div className="wrap closing-grid">
          <div>
            <p className="eyebrow">Bring one decision to the demo</p>
            <h2 id="demo-title">
              See how DropSkip works through a challenge your team faces today.
            </h2>
          </div>
          <div>
            <p className="copy">
              We’ll map the relevant inputs, show how the recommendation is assembled, and identify
              where DropSkip can create measurable operating value.
            </p>
            <BookDemoButton className="button primary">
              Book a demo{" "}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </BookDemoButton>
            <p className="closing-note">Contact support@dropskip.ai</p>
          </div>
        </div>
      </section>
    </div>
  );
}
