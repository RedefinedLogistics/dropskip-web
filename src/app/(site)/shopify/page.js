"use client";

import BookDemoButton from "@/components/BookDemoButton";
import { useRef, useState } from "react";
import "@/styles/shopify.css";

export default function ShopifyPage() {
  const [sim, setSim] = useState("vis");
  const [calcOpen, setCalcOpen] = useState(true);
  const [qty, setQty] = useState("90 units");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3400);
  };

  const switchSim = (key) => setSim(key);
  const toggleCalc = () => setCalcOpen((open) => !open);

  const adjustQty = () => {
    const next = qty === "90 units" ? "100 units (10 packs)" : "90 units";
    setQty(next);
    showToast(`Quantity adjusted to ${next}. Plan updated.`);
  };

  // The hero's "See why" jumps to the simulation and opens the Insights stage.
  const seeWhy = () => {
    document.getElementById("product-in-action")?.scrollIntoView({ behavior: "smooth" });
    setSim("ins");
  };

  const tabClass = (key) => (sim === key ? "sim-tab active" : "sim-tab");
  const panelClass = (key) => (sim === key ? "sim-panel active" : "sim-panel");

  return (
    <div className="shopify-page">
      <a className="skip-link" href="#hero">
        Skip to main content
      </a>

      {/* 1. Hero Section */}
      <section className="hero" id="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">AI-enabled inventory positioning for Shopify brands</p>
            <h1>
              See your inventory position. <span className="accent">Know your next move.</span>
            </h1>
            <p className="hero-copy">
              Connect Shopify sales with inventory, incoming supply, suppliers, warehouses and
              purchasing, so your team knows what to buy, how much, when and where, with clear
              reasoning behind every recommendation.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" id="install" href="#getting-started">
                Install the Shopify App <span className="arrow">↗</span>
              </a>
              <BookDemoButton className="btn btn-ghost">Book a Demo</BookDemoButton>
            </div>
            <div className="hero-points">
              <span>Native Shopify app</span>
              <span>Multi-store and Markets</span>
              <span>Operator-controlled decisions</span>
            </div>
          </div>

          {/* Hero Decision Flow Card */}
          <div className="decision-console" aria-label="Sample Shopify inventory decision flow">
            <div className="console-header">
              <span>DropSkip Decision Flow</span>
              <span className="console-tag">Shopify Connected</span>
            </div>
            <div className="console-body">
              <div className="signal-card">
                <div>
                  <small>Shopify Sales Signal</small>
                  <strong>Face Oil · Demand accelerating</strong>
                </div>
                <span className="signal-badge">+18%</span>
              </div>

              <div className="position-block">
                <h4>Inventory Position · Operating Context</h4>
                <div className="metric-grid">
                  <div className="metric-item">
                    <span>On hand</span>
                    <strong>25 units</strong>
                  </div>
                  <div className="metric-item">
                    <span>Lead time</span>
                    <strong>18 days</strong>
                  </div>
                  <div className="metric-item">
                    <span>Safety buffer</span>
                    <strong>5 days</strong>
                  </div>
                  <div className="metric-item">
                    <span>Incoming</span>
                    <strong>0 units</strong>
                  </div>
                  <div className="metric-item" style={{ gridColumn: "span 2" }}>
                    <span>Current coverage</span>
                    <strong>Approx. 6 days</strong>
                  </div>
                </div>
                <div className="coverage-warning">
                  <span>⚠ Projected stockout before replenishment arrives</span>
                  <button
                    className="action-link"
                    id="trigger-see-why"
                    type="button"
                    onClick={seeWhy}
                  >
                    See why →
                  </button>
                </div>
              </div>

              <div className="action-box">
                <div>
                  <small>Recommended Next Action</small>
                  <strong>Review replenishment: Order 90 units today</strong>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ minHeight: "40px", padding: "8px 18px", fontSize: "0.85rem" }}
                  type="button"
                  onClick={() =>
                    showToast("Replenishment recommendation approved: 90 units of Face Oil")
                  }
                >
                  Approve <span className="arrow">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shopify Capability Bar */}
      <section className="capability-bar" aria-label="Key capabilities">
        <div className="wrap">
          <div className="cap-grid">
            <div className="cap-item">
              <h3>Shopify-native connection</h3>
              <p>
                Bring storefront activity and live sales velocity directly into inventory planning.
              </p>
            </div>
            <div className="cap-item">
              <h3>One position across locations</h3>
              <p>
                Plan across stores, regional markets, 3PLs, and warehouse facilities in one view.
              </p>
            </div>
            <div className="cap-item">
              <h3>Reasoning before action</h3>
              <p>
                Inspect, adjust, approve, or dismiss each recommendation with operating context
                preserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Gap After the Order */}
      <section className="section the-gap" id="the-gap">
        <div className="wrap gap-grid">
          <div>
            <p className="eyebrow">The gap after the order</p>
            <h2 className="section-title">
              Shopify gives you the commerce signal. DropSkip connects it to the inventory decision.
            </h2>
            <p className="section-desc">
              Sales begin in Shopify. But the complete inventory position may be spread across
              spreadsheets, supplier files, purchase orders, an ERP, WMS environments, and 3PL
              dashboards.
            </p>
            <p style={{ fontWeight: "700", color: "var(--navy)", marginBottom: "24px" }}>
              DropSkip connects those signals so your team can spend less time rebuilding the
              answer, and more time deciding.
            </p>
            <a className="btn btn-dark" href="#from-signal-to-action">
              Explore the Decision Path <span className="arrow">↓</span>
            </a>
          </div>

          <div className="questions-card">
            <h3>Questions DropSkip helps answer</h3>
            <div className="question-item">
              <span className="question-no">01</span>
              <span>What should we buy?</span>
            </div>
            <div className="question-item">
              <span className="question-no">02</span>
              <span>How much do we need?</span>
            </div>
            <div className="question-item">
              <span className="question-no">03</span>
              <span>When should we act?</span>
            </div>
            <div className="question-item">
              <span className="question-no">04</span>
              <span>Where should the inventory go?</span>
            </div>
            <div className="question-item">
              <span className="question-no">05</span>
              <span>Where are cash and margin at risk?</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. From Signal to Action */}
      <section className="section signal-to-action" id="from-signal-to-action">
        <div className="wrap">
          <p className="eyebrow">From signal to action</p>
          <h2 className="section-title">One connected way to see, understand, plan, and act.</h2>
          <p className="section-desc">
            Every stage carries the same product, store, and location context forward, so the
            recommendation does not arrive as an unexplained output.
          </p>

          <div className="flow-steps">
            <div className="flow-card">
              <div className="flow-step-num">Stage 01</div>
              <h3>Visibility</h3>
              <div className="flow-tagline">See the position.</div>
              <p>
                Connect Shopify sales, current inventory, incoming supply, and location-level
                availability in real time.
              </p>
            </div>
            <div className="flow-card">
              <div className="flow-step-num">Stage 02</div>
              <h3>Insights</h3>
              <div className="flow-tagline">Understand what changed.</div>
              <p>
                See coverage gaps, location imbalances, and the products putting availability, cash,
                or margin at risk.
              </p>
            </div>
            <div className="flow-card">
              <div className="flow-step-num">Stage 03</div>
              <h3>Plan</h3>
              <div className="flow-tagline">Model the next move.</div>
              <p>
                Determine what to buy, how much, when, and where using demand, lead times, buffers,
                and supply context.
              </p>
            </div>
            <div className="flow-card">
              <div className="flow-step-num">Stage 04</div>
              <h3>Act</h3>
              <div className="flow-tagline">Keep control of the action.</div>
              <p>
                Inspect the reasoning, adjust the recommendation, approve it, or dismiss it with a
                recorded reason.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product in Action (Interactive Simulation) */}
      <section className="section product-in-action" id="product-in-action">
        <div className="wrap">
          <p className="eyebrow">Product in action</p>
          <h2 className="section-title">A product starts selling faster. See what changes.</h2>
          <p className="section-desc">
            Follow one Shopify signal from the current position to an operator-controlled action.
            Click through each stage to observe how the reasoning builds.
          </p>

          <div className="sim-shell">
            {/* Simulation Tab Controls */}
            <div className="sim-nav" role="tablist" aria-label="Simulation stages">
              <button
                type="button"
                onClick={() => switchSim("vis")}
                className={tabClass("vis")}
                role="tab"
                aria-selected={sim === "vis"}
                aria-controls="sim-visibility"
                id="tab-vis"
              >
                <small>Stage 01</small>
                Visibility: Position
              </button>
              <button
                type="button"
                onClick={() => switchSim("ins")}
                className={tabClass("ins")}
                role="tab"
                aria-selected={sim === "ins"}
                aria-controls="sim-insights"
                id="tab-ins"
              >
                <small>Stage 02</small>
                Insights: What Changed
              </button>
              <button
                type="button"
                onClick={() => switchSim("plan")}
                className={tabClass("plan")}
                role="tab"
                aria-selected={sim === "plan"}
                aria-controls="sim-plan"
                id="tab-plan"
              >
                <small>Stage 03</small>
                Plan: Next Move
              </button>
              <button
                type="button"
                onClick={() => switchSim("act")}
                className={tabClass("act")}
                role="tab"
                aria-selected={sim === "act"}
                aria-controls="sim-act"
                id="tab-act"
              >
                <small>Stage 04</small>
                Act: Decision
              </button>
            </div>

            <div className="sim-body">
              {/* Stage 1 Panel: Visibility */}
              <div
                className={panelClass("vis")}
                id="sim-visibility"
                role="tabpanel"
                aria-labelledby="tab-vis"
              >
                <div className="sim-panel-head">
                  <div>
                    <h3>Face Oil has approximately six days of cover.</h3>
                    <p>
                      Recent Shopify sales are running ahead of plan. Inventory is projected to run
                      out before the supplier can replenish it.
                    </p>
                  </div>
                  <span className="node-tag warning">Coverage Alert</span>
                </div>
                <div className="sim-data-grid">
                  <div className="sim-data-card">
                    <span>Product</span>
                    <strong>Face Oil (30ml)</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>On Hand</span>
                    <strong>25 units</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Recent Sales Velocity</span>
                    <strong>4.13 units / day</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Current Coverage</span>
                    <strong>Approx. 6 days</strong>
                  </div>
                </div>
                <div
                  className="action-box"
                  style={{
                    background: "var(--orange-wash)",
                    borderColor: "var(--orange-wash-border)",
                  }}
                >
                  <div>
                    <small>Diagnostic Result</small>
                    <strong>
                      Coverage gap detected: Current inventory will not cover expected demand until
                      next supply can arrive.
                    </strong>
                  </div>
                  <button className="btn btn-ghost" type="button" onClick={() => switchSim("ins")}>
                    Next: Inspect Change →
                  </button>
                </div>
              </div>

              {/* Stage 2 Panel: Insights */}
              <div
                className={panelClass("ins")}
                id="sim-insights"
                role="tabpanel"
                aria-labelledby="tab-ins"
              >
                <div className="sim-panel-head">
                  <div>
                    <h3>Demand is moving faster than the current plan.</h3>
                    <p>
                      Recent sales velocity is 18% above forecast. With an 18-day supplier lead time
                      and a five-day safety buffer, the position now requires attention.
                    </p>
                  </div>
                  <span className="node-tag warning">+18% Velocity</span>
                </div>
                <div className="sim-data-grid">
                  <div className="sim-data-card">
                    <span>Today</span>
                    <strong>25 units available</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Around Day 6</span>
                    <strong style={{ color: "var(--orange-text)" }}>Projected stockout</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Day 18</span>
                    <strong>Supplier arrival</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Safety Buffer</span>
                    <strong>5 days</strong>
                  </div>
                </div>
                <div className="calc-drawer">
                  <h4>Signal Variance Analysis</h4>
                  <p>
                    Demand baseline: 3.50 units/day. Current Shopify 7-day trailing velocity: 4.13
                    units/day (+18%). At current rate, 25 units deplete in 6.05 days. Minimum lead
                    time is 18 days.
                  </p>
                </div>
                <div className="sim-controls">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => switchSim("plan")}
                  >
                    Proceed to Recommended Plan →
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={() => switchSim("vis")}>
                    ← Back to Visibility
                  </button>
                </div>
              </div>

              {/* Stage 3 Panel: Plan */}
              <div
                className={panelClass("plan")}
                id="sim-plan"
                role="tabpanel"
                aria-labelledby="tab-plan"
              >
                <div className="sim-panel-head">
                  <div>
                    <h3>Review an order for 90 units today.</h3>
                    <p>
                      The quantity covers expected demand through lead time and the safety buffer,
                      less current inventory, rounded to the nearest case pack.
                    </p>
                  </div>
                  <span className="node-tag normal">Plan Generated</span>
                </div>
                <div className="sim-data-grid">
                  <div className="sim-data-card">
                    <span>What</span>
                    <strong>Face Oil</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>How Much</span>
                    <strong>90 units (9 packs)</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>When</span>
                    <strong>Today</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Where</span>
                    <strong>Primary DC</strong>
                  </div>
                </div>
                <div
                  className="calc-drawer"
                  id="calc-breakdown"
                  style={{ display: calcOpen ? undefined : "none" }}
                >
                  <h4>Calculation Breakdown</h4>
                  <p>
                    1. 4.13 daily sales × 1.18 demand adjustment ={" "}
                    <strong>4.87 units per day</strong>.<br />
                    2. 4.87 × 23 days of lead time and safety buffer ={" "}
                    <strong>approximately 112 units</strong>.<br />
                    3. 112 units − 25 units on hand = <strong>87 units requirement</strong>.<br />
                    4. Rounded to standard 10-unit supplier case pack = <strong>90 units</strong>.
                  </p>
                </div>
                <div className="sim-controls">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => switchSim("act")}
                  >
                    Review Operator Action →
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={toggleCalc}>
                    Toggle Calculation Details
                  </button>
                </div>
              </div>

              {/* Stage 4 Panel: Act */}
              <div
                className={panelClass("act")}
                id="sim-act"
                role="tabpanel"
                aria-labelledby="tab-act"
              >
                <div className="sim-panel-head">
                  <div>
                    <h3>Make the final call with the reasoning visible.</h3>
                    <p>
                      DropSkip recommends and explains. Your team can apply operating knowledge
                      before approving or dismissing the action.
                    </p>
                  </div>
                  <span className="node-tag on-plan">Decision Pending</span>
                </div>
                <div className="sim-data-grid">
                  <div className="sim-data-card">
                    <span>Action</span>
                    <strong>Replenish</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Quantity</span>
                    <strong>{qty}</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Confidence</span>
                    <strong style={{ color: "var(--mint-text)" }}>High (98%)</strong>
                  </div>
                  <div className="sim-data-card">
                    <span>Owner</span>
                    <strong>Inventory Ops</strong>
                  </div>
                </div>
                <div className="decision-action-bar">
                  <span className="confidence-tag">
                    Reasoning verified · Supplier: Peak Labs · Target: Main Warehouse
                  </span>
                  <div className="action-button-group">
                    <button className="btn btn-ghost" type="button" onClick={adjustQty}>
                      Adjust Quantity
                    </button>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() =>
                        showToast("Recommendation dismissed: reason recorded for audit trail")
                      }
                    >
                      Dismiss
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() =>
                        showToast("Recommendation approved! PO draft generated for 90 units.")
                      }
                    >
                      Approve Recommendation <span className="arrow">↗</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Position Inventory Across the Network */}
      <section className="section network-section" id="network">
        <div className="wrap">
          <p className="eyebrow">Position inventory across the network</p>
          <h2 className="section-title">
            Enough inventory overall can still be in the wrong place.
          </h2>
          <p className="section-desc">
            DropSkip connects Shopify stores and Markets with warehouses, 3PLs, WMS environments,
            and other operating systems to show where coverage is tightening and where stock is
            available.
          </p>

          <div className="network-grid">
            <div className="node-card">
              <span className="node-tag warning">Tightening</span>
              <h3>Shopify Market: East</h3>
              <p>Demand strengthening rapidly; current coverage tightening to 5 days.</p>
            </div>
            <div className="node-card">
              <span className="node-tag normal">Normal</span>
              <h3>Primary Warehouse</h3>
              <p>Normal operating availability with 18 days of coverage on hand.</p>
            </div>
            <div className="node-card">
              <span className="node-tag on-plan">On Plan</span>
              <h3>Shopify Market: West</h3>
              <p>Demand running steady on plan with 12 days of balanced coverage.</p>
            </div>
            <div className="node-card">
              <span className="node-tag transfer">Transfer Candidate</span>
              <h3>3PL Node: Central</h3>
              <p>Stock available above buffer requirement; ideal transfer candidate to East.</p>
            </div>
          </div>

          <p style={{ marginTop: "28px", fontWeight: "700", color: "var(--navy)" }}>
            Move inventory closer to the demand it is expected to serve.
          </p>
        </div>
      </section>

      {/* 7. More Than Availability */}
      <section className="section different-moves" id="moves">
        <div className="wrap">
          <p className="eyebrow">More than availability</p>
          <h2 className="section-title">Different inventory problems require different moves.</h2>
          <p className="section-desc">
            A stockout risk should not be handled like excess stock. A location imbalance should not
            trigger another purchase when existing inventory can be reallocated. Start with the
            moves that matter now.
          </p>

          <div className="moves-grid">
            <div className="move-card">
              <div className="move-card-num">Action 01</div>
              <h3>Replenish or Purchase</h3>
              <p>
                Review projected gaps before inventory runs short and determine the exact quantity
                and timing required.
              </p>
            </div>
            <div className="move-card">
              <div className="move-card-num">Action 02</div>
              <h3>Transfer or Reallocate</h3>
              <p>
                Find inventory positioned away from developing demand before placing an unnecessary
                new supplier order.
              </p>
            </div>
            <div className="move-card">
              <div className="move-card-num">Action 03</div>
              <h3>Audit or Reconcile</h3>
              <p>
                Investigate unexplained discrepancies across channels before they distort your next
                purchasing commitment.
              </p>
            </div>
            <div className="move-card">
              <div className="move-card-num">Action 04</div>
              <h3>Review Excess Stock</h3>
              <p>
                Surface slow-moving inventory for markdown, bundle promotion, or reallocation before
                carrying costs mount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Operator-Controlled Decisions */}
      <section className="section operator-decision" id="operator-controlled">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            <p className="eyebrow">Operator-controlled decisions</p>
            <h2 className="section-title" style={{ marginInline: "auto" }}>
              AI should strengthen judgment, not hide it.
            </h2>
            <p className="section-desc" style={{ marginInline: "auto" }}>
              Every recommendation brings the relevant Shopify signal, inventory position,
              assumptions, and proposed action into view. DropSkip recommends and explains. Your
              team decides.
            </p>
          </div>

          <div className="rationale-shell">
            <div className="rationale-head">
              <strong>Recommendation Rationale · Face Oil</strong>
              <span className="rationale-badge">Confidence: High</span>
            </div>
            <div className="rationale-body">
              <h3 style={{ margin: "0 0 16px", fontSize: "1.25rem", color: "var(--navy)" }}>
                Why does Face Oil need replenishment now?
              </h3>
              <ul className="rationale-list">
                <li>Recent Shopify sales velocity is 18% above the current operating forecast.</li>
                <li>
                  Available inventory provides approximately six days of customer order cover.
                </li>
                <li>The supplier requires 18 days lead time, plus a five-day safety buffer.</li>
                <li>No incoming supply is expected before the projected stockout threshold.</li>
              </ul>

              <div className="decision-action-bar">
                <span className="confidence-tag">
                  Review completed by AI decision engine · Status: <strong>Pending Approval</strong>
                </span>
                <div className="action-button-group">
                  <button className="btn btn-ghost" type="button" onClick={adjustQty}>
                    Adjust
                  </button>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => showToast("Decision dismissed: note stored in system history")}
                  >
                    Dismiss
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      showToast("Approved! Replenishment PO ready in procurement queue.")
                    }
                  >
                    Approve <span className="arrow">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Shopify and Your Operating Systems */}
      <section className="section integrations-sec" id="integrations">
        <div className="wrap">
          <p className="eyebrow">Shopify + your operating systems</p>
          <h2 className="section-title">
            Connect the information. Keep the systems that already run your operation.
          </h2>
          <p className="section-desc">
            Shopify remains the commerce system. Your ERP, WMS, and 3PLs continue recording
            transactions and running execution. DropSkip connects their information for planning and
            decisions. No unnecessary rip and replace.
          </p>

          <h3 style={{ margin: "32px 0 12px", fontSize: "1.15rem", color: "var(--navy)" }}>
            Connected Data Sources
          </h3>
          <div className="sources-cloud">
            <div className="source-pill featured">Shopify & Shopify Markets</div>
            <div className="source-pill">NetSuite</div>
            <div className="source-pill">Other ERP Environments</div>
            <div className="source-pill">WMS Environments</div>
            <div className="source-pill">3PL Systems</div>
            <div className="source-pill">CSV & Spreadsheet Uploads</div>
            <div className="source-pill">REST & GraphQL APIs</div>
          </div>

          <div className="pipeline-flow">
            <div className="pipeline-step">
              <span>01</span> Visibility
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)" }}>→</div>
            <div className="pipeline-step">
              <span>02</span> Insights
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)" }}>→</div>
            <div className="pipeline-step">
              <span>03</span> Plan
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)" }}>→</div>
            <div className="pipeline-step">
              <span>04</span> Act
            </div>
          </div>

          <h3 style={{ margin: "28px 0 12px", fontSize: "1.1rem", color: "var(--navy)" }}>
            Supported Decision Actions
          </h3>
          <div className="supported-actions">
            <span className="action-tag">Replenish</span>
            <span className="action-tag">Transfer</span>
            <span className="action-tag">Reallocate</span>
            <span className="action-tag">Audit</span>
            <span className="action-tag">Review excess inventory</span>
            <span className="action-tag">Continue monitoring</span>
          </div>
        </div>
      </section>

      {/* 10. Getting Started */}
      <section className="section getting-started" id="getting-started">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            <p className="eyebrow">Getting started</p>
            <h2 className="section-title" style={{ marginInline: "auto" }}>
              Install the app. Connect the operation. Start making clearer decisions.
            </h2>
            <div style={{ marginTop: "24px" }}>
              <a className="btn btn-primary" href="#getting-started">
                Install the Shopify App <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h3>Connect Shopify</h3>
              <div className="step-tagline">Bring in the commerce signal.</div>
              <p>
                Install the app and connect the relevant Shopify stores, Markets, and fulfillment
                locations in just a few clicks.
              </p>
            </div>
            <div className="step-card">
              <div className="step-badge">2</div>
              <h3>Add Context</h3>
              <div className="step-tagline">Complete the inventory position.</div>
              <p>
                Connect the supplier, purchase-order, warehouse, and fulfillment information your
                operating decisions require.
              </p>
            </div>
            <div className="step-card">
              <div className="step-badge">3</div>
              <h3>Validate & Begin</h3>
              <div className="step-tagline">Put the workflow into use.</div>
              <p>
                Confirm planning assumptions with your team and begin reviewing prioritized,
                explainable recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Built for Growing Shopify Operations */}
      <section className="section built-for-shopify" id="built-for-shopify">
        <div className="wrap complexity-grid">
          <div>
            <p className="eyebrow">Built for growing Shopify operations</p>
            <h2 className="section-title">
              When operational complexity has outgrown spreadsheets.
            </h2>
            <p className="section-desc">
              You do not necessarily need another enterprise transformation. You need a clearer way
              to connect Shopify activity with the inventory decisions that follow.
            </p>
            <BookDemoButton className="btn btn-dark">
              Schedule an Intro Call <span className="arrow">↗</span>
            </BookDemoButton>
          </div>

          <div className="checklist-card">
            <h3>DropSkip may be relevant when:</h3>
            <div className="checklist-item">
              Purchase planning still depends on manual spreadsheets.
            </div>
            <div className="checklist-item">
              Products, stores, or regional locations are becoming harder to coordinate.
            </div>
            <div className="checklist-item">
              Stockouts and excess inventory happen at the exact same time.
            </div>
            <div className="checklist-item">
              Supplier lead times materially affect order availability.
            </div>
            <div className="checklist-item">
              The team spends more time assembling data than making decisions.
            </div>
          </div>
        </div>
      </section>

      {/* 12. Frequently Asked Questions */}
      <section className="section faq-sec" id="faq">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
            <p className="eyebrow">Common questions</p>
            <h2 className="section-title" style={{ marginInline: "auto" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="faq-container">
            <div className="faq-item">
              <details>
                <summary>
                  <span>Is DropSkip a native Shopify app?</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  Yes. DropSkip can be installed as a native Shopify app to connect Shopify sales
                  and inventory activity with forecasting, inventory positioning, replenishment, and
                  purchasing decisions.
                </div>
              </details>
            </div>

            <div className="faq-item">
              <details>
                <summary>
                  <span>Does DropSkip replace Shopify inventory management?</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  No. Shopify continues running commerce and recording the inventory information
                  available within the platform. DropSkip connects that activity with supplier,
                  warehouse, purchase-order, and planning information to support decisions beyond
                  the storefront.
                </div>
              </details>
            </div>

            <div className="faq-item">
              <details>
                <summary>
                  <span>How does DropSkip use AI?</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  DropSkip uses AI-enabled analysis and decision logic to interpret connected
                  operating signals, identify inventory risks, and surface recommended actions. The
                  relevant inputs, assumptions, and reasoning remain visible to the operator.
                </div>
              </details>
            </div>

            <div className="faq-item">
              <details>
                <summary>
                  <span>Can DropSkip support multiple Shopify stores and Markets?</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  Yes. DropSkip supports planning across multiple Shopify stores and Shopify Markets
                  so demand and inventory requirements can be reviewed as one connected operation.
                </div>
              </details>
            </div>

            <div className="faq-item">
              <details>
                <summary>
                  <span>Can DropSkip plan across warehouses and 3PLs?</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  Yes. DropSkip can combine Shopify sales signals with inventory information from
                  multiple warehouses, WMS environments, and 3PL systems to identify location-level
                  risks and recommend replenishment, transfer, or allocation decisions.
                </div>
              </details>
            </div>

            <div className="faq-item">
              <details>
                <summary>
                  <span>
                    Does DropSkip automatically place purchase orders or transfer inventory?
                  </span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  DropSkip surfaces the recommendation and its reasoning. The operator can inspect,
                  adjust, approve, or dismiss it. Your team retains control of the final action.
                </div>
              </details>
            </div>

            <div className="faq-item">
              <details>
                <summary>
                  <span>Do we need to replace our ERP, WMS, or 3PL?</span>
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-content">
                  No. DropSkip works across the systems already running your operation and connects
                  their information for planning and decision-making.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Final CTA */}
      <section className="closing-cta" id="final-cta">
        <div className="wrap">
          <h2>See what Shopify activity means for your next inventory decision.</h2>
          <p>
            Connect storefront sales with inventory, incoming supply, suppliers, warehouses and
            purchasing, then make the final decision with the reasoning visible.
          </p>
          <div className="closing-actions">
            <a className="btn btn-primary" href="#getting-started">
              Install the Shopify App <span className="arrow">↗</span>
            </a>
            <BookDemoButton
              className="btn btn-ghost"
              style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.4)" }}
            >
              Book a Demo
            </BookDemoButton>
          </div>
        </div>
      </section>

      <div className={toast ? "toast show" : "toast"} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
