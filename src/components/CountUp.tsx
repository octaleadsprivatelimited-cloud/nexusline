import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1800, className }: Props) {
  const match = value.match(/^(\D*)([\d.]+)(\D*)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match ? (match[3] ?? "") + (match[4] ?? "") : "";
  const decimals = match?.[2].includes(".") ? (match[2].split(".")[1]?.length ?? 0) : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current || !match) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [duration, target, match]);

  if (!match) return <span className={className}>{value}</span>;

  const display =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}