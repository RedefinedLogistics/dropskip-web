"use client";

import { useEffect, useRef, useState } from "react";

const decisions = [
  { value: "Adjusted", label: "Adjust", className: "button outline" },
  { value: "Approved", label: "Approve", className: "button primary" },
  { value: "Dismissed", label: "Dismiss", className: "button quiet" },
];

export default function DecisionBoard() {
  const [decision, setDecision] = useState(null);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  const notify = (message) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3200);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (value) => {
    setDecision(value);
    notify(`${value} · illustrative example only`);
  };

  const reset = () => {
    setDecision(null);
    notify("Example reset");
  };

  return (
    <>
      <div className="action-board">
        <div className="action-bar">
          <strong>Illustrative product example · Initial Necklace</strong>
          <span className="action-alert">
            {decision ? `${decision} in example` : "Review this week"}
          </span>
        </div>
        <div className="action-grid">
          <div className="action-main">
            <p className="eyebrow">Recommendation</p>
            <h3>Review replenishment before missed sales increase.</h3>
            <p>
              Demand is above the operating plan while current coverage is shorter than the supplier
              lead time. The proposed action fits the current purchasing plan.
            </p>
            <div className="decision-context">
              <div>
                <span>Current coverage</span>
                <strong>11 days</strong>
              </div>
              <div>
                <span>Demand signal</span>
                <strong>Running above plan</strong>
              </div>
              <div>
                <span>Supply constraint</span>
                <strong>20-day supplier lead time</strong>
              </div>
              <div>
                <span>Business impact</span>
                <strong>Stockout and missed-sales risk</strong>
              </div>
            </div>
          </div>
          <aside className="action-side">
            <p className="eyebrow">Working behind the buy</p>
            <ol>
              <li>Demand moved above the operating assumption.</li>
              <li>Coverage may run out before replenishment arrives.</li>
              <li>The proposed action remains within purchasing capacity.</li>
            </ol>
            <div className="operator-controls">
              {decisions.map((item) => (
                <button
                  key={item.value}
                  className={item.className}
                  type="button"
                  disabled={decision !== null}
                  onClick={() => choose(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
        <div className="decision-receipt" hidden={decision === null}>
          <span>{decision ? `${decision} by operator · no order submitted` : ""}</span>
          <button type="button" onClick={reset}>
            Reset example
          </button>
        </div>
      </div>

      <div className={toast ? "toast show" : "toast"} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
