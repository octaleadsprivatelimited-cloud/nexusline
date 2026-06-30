import { useEffect, useRef, useState } from "react";

type Props = { value: string; className?: string; duration?: number };

/** Slot-machine style scrolling digits. Non-digit chars render statically. */
export function ScrollingNumber({ value, className, duration = 2000 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} style={{ whiteSpace: "nowrap" }}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <Digit key={i} target={parseInt(ch, 10)} active={active} duration={duration} />
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}

function Digit({ target, active, duration }: { target: number; active: boolean; duration: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        height: "1em",
        overflow: "hidden",
        verticalAlign: "bottom",
        lineHeight: 1,
      }}
    >
      <span
        style={{
          display: "block",
          transform: `translateY(${active ? -target : 0}em)`,
          transition:
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
              ? "none"
              : `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} style={{ display: "block", height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}