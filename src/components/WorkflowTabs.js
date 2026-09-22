"use client";

import { useState } from "react";

const panels = [
  {
    id: "visibility",
    label: "Visibility",
    kicker: "01 · Detect the gap",
    title: "A product may run out before its next delivery.",
    body: "See stock coverage, expected demand, and incoming supply across locations.",
    icon: "!",
    signalSmall: "Face Oil · West warehouse",
    signalStrong: "Incoming supply arrives after projected stockout",
    dataStrong: "4 days",
    dataSpan: "coverage remaining",
  },
  {
    id: "insights",
    label: "Insights",
    kicker: "02 · Understand the cause",
    title: "Another warehouse may be able to cover the gap.",
    body: "Check whether available stock can support a transfer without creating a shortage elsewhere.",
    icon: "↔",
    signalSmall: "Central warehouse",
    signalStrong: "Transferable stock found above target coverage",
    dataStrong: "240 units",
    dataSpan: "available to rebalance",
  },
  {
    id: "plan",
    label: "Plan",
    kicker: "03 · Compare options",
    title: "Compare a transfer with a new purchase.",
    body: "Review quantity, timing, stock availability, and how much new cash each path commits.",
    icon: "◇",
    signalSmall: "Recommended plan",
    signalStrong: "Transfer inventory before opening a new PO",
    dataStrong: "$8.4k",
    dataSpan: "capital not committed",
  },
  {
    id: "act",
    label: "Act",
    kicker: "04 · Keep control",
    title: "Review the recommendation. Choose your next move.",
    body: "Approve, adjust, or dismiss the proposed action with the supporting rationale in view.",
    icon: "✓",
    signalSmall: "Reviewable action",
    signalStrong: "Transfer 240 units from Central to West",
    dataStrong: "Approve",
    dataSpan: "adjust or dismiss",
  },
];

export default function WorkflowTabs() {
  const [active, setActive] = useState("visibility");

  return (
    <div className="workflow-shell">
      <div className="flow-nav" role="tablist" aria-label="Decision workflow">
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            type="button"
            className={panel.id === active ? "flow-tab active" : "flow-tab"}
            role="tab"
            id={`${panel.id}-tab`}
            aria-selected={panel.id === active}
            aria-controls={panel.id}
            onClick={() => setActive(panel.id)}
          >
            <b>{index + 1}</b>
            <strong>{panel.label}</strong>
            <i>→</i>
          </button>
        ))}
      </div>

      <div className="flow-stage">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={panel.id === active ? "flow-panel active" : "flow-panel"}
            id={panel.id}
            role="tabpanel"
            aria-labelledby={`${panel.id}-tab`}
            hidden={panel.id !== active}
          >
            <span className="flow-kicker">{panel.kicker}</span>
            <h3>{panel.title}</h3>
            <p>{panel.body}</p>
            <div className="signal-card">
              <div className="signal-label">
                <div className="signal-icon">{panel.icon}</div>
                <div>
                  <small>{panel.signalSmall}</small>
                  <strong>{panel.signalStrong}</strong>
                </div>
              </div>
              <div className="signal-data">
                <strong>{panel.dataStrong}</strong>
                <span>{panel.dataSpan}</span>
              </div>
            </div>
          </div>
        ))}
        <span className="flow-progress">Visibility · Insights · Plan · Act</span>
      </div>
    </div>
  );
}
