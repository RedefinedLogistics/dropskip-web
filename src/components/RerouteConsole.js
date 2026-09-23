"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IDLE = "Click above to automatically transfer your session back to the homepage.";
const RUNNING = "Recalculating network coordinates. Returning home in 2.5s…";

const STEP = 4; // percent per tick
const INTERVAL = 100; // ms between ticks, so 0 -> 100 takes 2.5s

/**
 * The "Execute Recommended Re-Route" control from the 404 design: it fills a
 * progress bar and then sends the visitor home.
 *
 * The original page did this with setInterval and a location assignment. Here
 * the progress is state and the navigation goes through the router, so it is a
 * client-side transition rather than a full page load.
 *
 * Both the ticking and the navigation are effects rather than work done inside
 * the state updater. An updater runs during render, so calling router.push()
 * from one updates the Router while this component is rendering, and Strict
 * Mode's double-invoked updaters would fire the navigation twice.
 */
export default function RerouteConsole() {
  const router = useRouter();
  const [progress, setProgress] = useState(null); // null = not started

  const running = progress !== null;
  const arrived = progress !== null && progress >= 100;

  // Tick the bar while it is filling. Stopping on `arrived` lets the cleanup
  // clear the interval, and the interval is also cleared if the visitor
  // navigates away mid-countdown.
  useEffect(() => {
    if (!running || arrived) return undefined;

    const tick = setInterval(() => {
      setProgress((current) => Math.min((current ?? 0) + STEP, 100));
    }, INTERVAL);

    return () => clearInterval(tick);
  }, [running, arrived]);

  // Navigate once the bar is full.
  useEffect(() => {
    if (arrived) router.push("/");
  }, [arrived, router]);

  return (
    <div className="sim-action-box">
      <button
        className="sim-button"
        type="button"
        onClick={() => setProgress(0)}
        disabled={running}
      >
        <span>{running ? "Rerouting to Homepage…" : "Execute Recommended Re-Route"}</span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </button>

      {running ? (
        <div
          className="progress-bar-wrap"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Rerouting to the homepage"
        >
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      <p className="sim-feedback" role="status" aria-live="polite">
        {running ? RUNNING : IDLE}
      </p>
    </div>
  );
}
