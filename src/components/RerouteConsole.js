"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const IDLE = "Click above to automatically transfer your session back to the homepage.";
const RUNNING = "Recalculating network coordinates. Returning home in 2.5s…";

/**
 * The "Execute Recommended Re-Route" control from the 404 design: it fills a
 * progress bar and then sends the visitor home.
 *
 * The original page did this with setInterval and a location assignment. Here
 * the progress is state and the navigation goes through the router, so it is a
 * client-side transition rather than a full page load, and the timers are
 * cleared if the visitor navigates away mid-countdown.
 */
export default function RerouteConsole() {
  const router = useRouter();
  const [progress, setProgress] = useState(null); // null = not started
  const timers = useRef([]);

  useEffect(() => {
    const running = timers.current;
    return () => running.forEach(clearInterval);
  }, []);

  const start = () => {
    if (progress !== null) return;
    setProgress(0);

    const tick = setInterval(() => {
      setProgress((current) => {
        if (current === null || current >= 100) return current;
        const next = current + 4;
        if (next >= 100) {
          clearInterval(tick);
          router.push("/");
        }
        return Math.min(next, 100);
      });
    }, 100);

    timers.current.push(tick);
  };

  const running = progress !== null;

  return (
    <div className="sim-action-box">
      <button className="sim-button" type="button" onClick={start} disabled={running}>
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
