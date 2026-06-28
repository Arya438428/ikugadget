import { useEffect, useRef } from "react";

/* Kursor bintang dengan satu garis ekor (minimalis) */
export default function CursorEffect() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const m = { x: -300, y: -300, has: false };
    const trail: { x: number; y: number }[] = [];
    const MAX = 16;
    let rot = 0, size = 9, sizeTarget = 9;
    let raf = 0;

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function starPath(cx: number, cy: number, R: number, r: number, rotation: number) {
      ctx!.beginPath();
      for (let i = 0; i < 10; i++) {
        const rad = i % 2 === 0 ? R : r;
        const a = (Math.PI * i) / 5 - Math.PI / 2 + rotation;
        const X = cx + Math.cos(a) * rad, Y = cy + Math.sin(a) * rad;
        if (i === 0) ctx!.moveTo(X, Y); else ctx!.lineTo(X, Y);
      }
      ctx!.closePath();
    }

    const onMove = (e: MouseEvent) => {
      m.x = e.clientX; m.y = e.clientY; m.has = true;
      const el = document.elementFromPoint(m.x, m.y) as HTMLElement | null;
      sizeTarget = el?.closest('a,button,input,textarea,select,label,[role="button"],[data-product-card]') ? 12 : 9;
    };

    function frame() {
      rot += 0.012;
      size += (sizeTarget - size) * 0.2;
      ctx!.clearRect(0, 0, w, h);

      if (m.has) {
        trail.push({ x: m.x, y: m.y });
        if (trail.length > MAX) trail.shift();

        // Satu garis ekor yang meruncing & memudar
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.shadowBlur = 6;
        ctx!.shadowColor = "rgba(255,215,110,0.7)";
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length;
          ctx!.strokeStyle = `hsla(45,95%,66%,${(t * t * 0.75).toFixed(3)})`;
          ctx!.lineWidth = t * 3.4 + 0.4;
          ctx!.beginPath();
          ctx!.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx!.lineTo(trail[i].x, trail[i].y);
          ctx!.stroke();
        }

        // Bintang kursor (tanpa lingkaran)
        ctx!.shadowBlur = 14;
        ctx!.shadowColor = "rgba(255,215,110,0.95)";
        starPath(m.x, m.y, size, size * 0.42, rot);
        ctx!.fillStyle = "rgba(255,233,150,0.98)";
        ctx!.fill();
        ctx!.shadowBlur = 0;
        ctx!.lineWidth = 0.8;
        ctx!.strokeStyle = "rgba(120,85,0,0.4)";
        ctx!.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100000 }} />;
}
