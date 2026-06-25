import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: -200, y: -200 };
    const ring  = { x: -200, y: -200 };
    let hovered = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const t = e.target as HTMLElement;
      hovered = !!t.closest('a, button, input, textarea, select, label, [role="button"]');
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.11;
      ring.y += (mouse.y - ring.y) * 0.11;

      const dot = dotRef.current;
      const r   = ringRef.current;

      if (dot) {
        dot.style.left = mouse.x + "px";
        dot.style.top  = mouse.y + "px";
        dot.style.transform = `translate(-50%,-50%) scale(${hovered ? 0.3 : 1})`;
        dot.style.opacity = hovered ? "0.5" : "1";
      }
      if (r) {
        r.style.left = ring.x + "px";
        r.style.top  = ring.y + "px";
        r.style.width  = hovered ? "56px" : "38px";
        r.style.height = hovered ? "56px" : "38px";
        r.style.backgroundColor = hovered ? "hsla(160,60%,45%,0.12)" : "transparent";
        r.style.borderColor = "hsl(160,60%,45%)";
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="iku-cursor-dot"  />
      <div ref={ringRef} className="iku-cursor-ring" />
    </>
  );
}
