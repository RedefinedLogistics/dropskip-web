"use client";

import { useState } from "react";

const workflow = {
  demand: {
    label: "Demand planning",
    tab: "Demand planning",
    title: "Build the demand view your supply-chain decisions start from.",
    copy: "Create a shared demand plan, compare actual performance with expectations, and see where changing demand requires a new operating decision.",
    metrics: [
      ["Plan", "Shared view"],
      ["Actual", "Current signal"],
      ["Position", "Ahead of plan"],
    ],
    note: "Demand is running ahead of plan in Skin Care.",
    action: "Review affected products and the resulting inventory requirement.",
  },
  forecast: {
    label: "Forecasting",
    tab: "Forecasting",
    title: "See what expected demand means for inventory and cash.",
    copy: "Bring historical performance, current signals, and commercial plans into a forecast that shows the decision consequence of a demand change.",
    metrics: [
      ["History", "Connected"],
      ["Current signal", "Rising"],
      ["Assumptions", "Review"],
    ],
    note: "Recent demand is above the operating assumption for Face Oil.",
    action: "Review future inventory coverage before the gap becomes urgent.",
  },
  inventory: {
    label: "Inventory planning",
    tab: "Inventory",
    title: "See the inventory position the next decision depends on.",
    copy: "Connect expected demand with available and incoming inventory across warehouses, 3PLs, channels, and fulfilment locations.",
    metrics: [
      ["Coverage risk", "2 products"],
      ["Network imbalance", "1 location"],
      ["Audit required", "1 record"],
    ],
    note: "Initial Necklace may stock out before replenishment can arrive.",
    action: "Review replenishment and location options together.",
  },
  otb: {
    label: "Open-to-Buy",
    tab: "Open-to-Buy",
    title: "Connect inventory needs to the capital available.",
    copy: "Bring demand, current commitments, inventory requirements, and purchasing capacity into one view so teams can protect cash flow while supporting growth.",
    metrics: [
      ["Investment", "Planned"],
      ["Commitments", "Connected"],
      ["Capacity", "Available"],
    ],
    note: "The proposed replenishment fits the current category plan.",
    action: "Review the commitment before moving the purchase forward.",
  },
  purchasing: {
    label: "Replenishment and purchasing",
    tab: "Purchasing",
    title: "Review what to buy, how much, when, and where.",
    copy: "Turn connected demand, inventory, supplier, and purchasing signals into clear recommendations with the evidence visible.",
    metrics: [
      ["Requirement", "Prioritized"],
      ["Supplier", "Matched"],
      ["Timing", "This week"],
    ],
    note: "A replenishment decision is ready for operator review.",
    action: "Adjust, approve, dismiss, or move the decision forward.",
  },
  command: {
    label: "Command Center",
    tab: "Command Center",
    title: "Prioritize the decisions that matter now.",
    copy: "Bring immediate risks, upcoming requirements, and working-capital opportunities into one queue for operator attention.",
    metrics: [
      ["Now", "1 action"],
      ["This week", "3 reviews"],
      ["Opportunity", "4 products"],
    ],
    note: "Release cash from excess inventory without increasing service risk.",
    action: "Start with the decisions carrying the greatest consequence.",
  },
};

const order = ["demand", "forecast", "inventory", "otb", "purchasing", "command"];

export default function WorkflowExplorer() {
  const [active, setActive] = useState("demand");
  const panel = workflow[active];

  return (
    <div className="workflow-shell">
      <div className="workflow-tabs" role="tablist" aria-label="DropSkip workflow">
        <p>Decision flow</p>
        {order.map((key, index) => (
          <button
            key={key}
            className="workflow-tab"
            type="button"
            role="tab"
            aria-selected={key === active}
            onClick={() => setActive(key)}
          >
            {workflow[key].tab} <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className="workflow-panel" role="tabpanel" aria-live="polite">
        <div className="panel-top">
          <span>{panel.label}</span>
          <b>Connected view</b>
        </div>
        <h3>{panel.title}</h3>
        <p>{panel.copy}</p>
        <div className="panel-metrics">
          {panel.metrics.map(([name, value]) => (
            <div className="panel-metric" key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="panel-note">
          <strong>{panel.note}</strong>
          <span>{panel.action}</span>
        </div>
      </div>
    </div>
  );
}
