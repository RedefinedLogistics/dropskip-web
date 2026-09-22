"use client";

import { useEffect, useRef, useState } from "react";

const decisions = [
  { value: "Adjusted", label: "Adjust", className: "button outline" },
  { value: "Approved", label: "Approve", className: "button primary" },
  { value: "Dismissed", label: "Dismiss", className: "button quiet" },
];

export default function DecisionExample() {
  const [decision, setDecision] = useState(null);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  const notify = (message) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 4200);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (value) => {
    setDecision(value);
    notify(`${value}: illustrative example only.`);
  };

  const reset = () => {
    setDecision(null);
    notify("Example reset.");
  };

  return (
    <>
      <div className="decision-wrap">
        <div className="decision-bar">
          <strong>Illustrative example · SKU-1190-SND</strong>
          <span className="decision-alert">
            {decision
              ? `${decision} in this example`
              : "Coverage below lead time"}
          </span>
        </div>
        <div className="decision-grid">
          <div className="decision-main">
            <p className="eyebrow">Recommendation</p>
            <h3>Reconcile the position. Review replenishment.</h3>
            <p className="copy">
              The SKU has less coverage than the supplier lead time requires,
              and the recorded position contains an unexplained difference.
            </p>
            <div className="decision-data">
              <div>
                <span>Available to sell</span>
                <strong>470 units</strong>
              </div>
              <div>
                <span>Current coverage</span>
                <strong>5.2 days</strong>
              </div>
              <div>
                <span>Supplier lead time</span>
                <strong>12 days</strong>
              </div>
              <div>
                <span>Unexplained difference</span>
                <strong>63 units</strong>
              </div>
            </div>
          </div>
          <aside className="decision-side">
            <p className="recommend-title">DropSkip recommends</p>
            <ol className="recommend-list">
              <li>Audit the unexplained inventory difference.</li>
              <li>Review replenishment using the confirmed position.</li>
            </ol>
            <div className="decision-controls">
              {decisions.map((item) => (
                <button
                  key={item.value}
                  className={item.className}
                  type="button"
                  disabled={decision !== null}
                  // onClick={() => choose(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
        <div className="decision-receipt" hidden={decision === null}>
          <span>
            {decision ? `${decision} by operator · no order submitted` : ""}
          </span>
          <button type="button" onClick={reset}>
            Reset example
          </button>
        </div>
      </div>

      <div
        className={toast ? "toast show" : "toast"}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
}
