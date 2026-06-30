/**
 * Dev-only accessibility helper.
 *
 * Accessibility checklist for reduced motion:
 *  1. Hero door panels render open, no rotate/seam flash.
 *  2. Hero background slideshow does not auto-advance.
 *  3. CountUp / ScrollingNumber snap to final values.
 *  4. Global CSS neutralizes transitions & animations.
 *  5. No new IntersectionObserver-driven motion is added without a guard.
 *
 * Logs the current prefers-reduced-motion state on every client navigation
 * so you can confirm the mode is applied as you move through the app.
 */
import type { Router } from "@tanstack/react-router";

export function attachReducedMotionDevLogger(router: Router<any, any>) {
  if (!import.meta.env.DEV) return;
  if (typeof window === "undefined") return;

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const log = (path: string) => {
    const tag = mq.matches ? "ON" : "OFF";
    // eslint-disable-next-line no-console
    console.info(
      `%c[a11y] reduced-motion ${tag}%c → ${path}`,
      `color:#fff;background:${mq.matches ? "#1d4fd7" : "#6b7280"};padding:2px 6px;border-radius:3px;font-weight:600`,
      "color:inherit;font-weight:400",
    );
    if (!mq.matches) {
      // eslint-disable-next-line no-console
      console.warn(
        "[a11y] prefers-reduced-motion is OFF. Enable it in your OS to verify motion fallbacks.",
      );
    }
  };

  log(window.location.pathname);
  router.subscribe("onResolved", (e) => log(e.toLocation.pathname));
  mq.addEventListener("change", () => log(window.location.pathname));
}