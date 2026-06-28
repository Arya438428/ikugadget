import { useEffect, useRef } from "react";

/* Galaxy HD — canvas retina, rotasi galaksi, nebula additif, parallax mouse */
export default function GalaxyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, cx = 0, cy = 0, maxR = 1;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0, rot = 0;

    type Star = { ang: number; rad: number; size: number; tw: number; phase: number; hue: number; bright: number };
    let stars: Star[] = [];
    let dust: { x: number; y: number; r: number; a: number; hue: number; dx: number; dy: number }[] = [];
    let shooters: { x: number; y: number; vx: number; vy: number; life: number; max: number }[] = [];
    let planets: { x: number; y: number; r: number; hue: number; ring: boolean; depth: number; dx: number; dy: number }[] = [];

    const HUES = [205, 255, 160, 42, 0]; // biru, ungu, hijau, emas, putih

    function build() {
      maxR = Math.hypot(w, h) / 2;
      const count = Math.min(460, Math.max(160, Math.floor((w * h) / 4200)));
      stars = Array.from({ length: count }).map(() => {
        const rad = Math.pow(Math.random(), 0.72) * maxR; // padat ke tengah
        return {
          ang: Math.random() * Math.PI * 2,
          rad,
          size: Math.random() * Math.random() * 2.1 + 0.35,
          tw: Math.random() * 1.8 + 0.4,
          phase: Math.random() * Math.PI * 2,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
          bright: Math.random(),
        };
      });
      dust = Array.from({ length: 6 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 320 + 240,
        a: Math.random() * 0.05 + 0.025,
        hue: [220, 265, 160, 195][Math.floor(Math.random() * 4)],
        dx: (Math.random() - 0.5) * 0.12,
        dy: (Math.random() - 0.5) * 0.12,
      }));
      const u = Math.min(w, h);
      planets = [
        { x: w * 0.14, y: h * 0.24, r: u * 0.055 + 16, hue: 30,  ring: true,  depth: 0.4, dx: 0.05,  dy: 0.015 },
        { x: w * 0.86, y: h * 0.70, r: u * 0.040 + 12, hue: 212, ring: false, depth: 0.8, dx: -0.045, dy: 0.025 },
        { x: w * 0.80, y: h * 0.15, r: u * 0.024 + 8,  hue: 150, ring: false, depth: 1.1, dx: 0.035, dy: -0.02 },
        { x: w * 0.09, y: h * 0.80, r: u * 0.032 + 10, hue: 320, ring: true,  depth: 0.6, dx: 0.03,  dy: -0.018 },
      ];
    }

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      cx = w / 2; cy = h / 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function frame(t: number) {
      rot += 0.00024;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx!.clearRect(0, 0, w, h);

      // Nebula clouds (additive)
      ctx!.globalCompositeOperation = "lighter";
      for (const d of dust) {
        d.x += d.dx; d.y += d.dy;
        if (d.x < -d.r) d.x = w + d.r; if (d.x > w + d.r) d.x = -d.r;
        if (d.y < -d.r) d.y = h + d.r; if (d.y > h + d.r) d.y = -d.r;
        const gx = d.x + mouse.x * 0.5, gy = d.y + mouse.y * 0.5;
        const g = ctx!.createRadialGradient(gx, gy, 0, gx, gy, d.r);
        g.addColorStop(0, `hsla(${d.hue},75%,58%,${d.a})`);
        g.addColorStop(1, `hsla(${d.hue},75%,58%,0)`);
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      }

      // Galaxy core glow
      const core = ctx!.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.8);
      core.addColorStop(0, "hsla(160,85%,55%,0.10)");
      core.addColorStop(0.5, "hsla(200,85%,55%,0.04)");
      core.addColorStop(1, "hsla(160,85%,55%,0)");
      ctx!.fillStyle = core;
      ctx!.fillRect(0, 0, w, h);

      // Stars (galaksi pipih + rotasi diferensial)
      for (const s of stars) {
        const a = s.ang + rot * (0.55 + (1 - s.rad / maxR) * 1.1);
        const depth = s.size / 2.1;
        const x = cx + Math.cos(a) * s.rad + mouse.x * depth;
        const y = cy + Math.sin(a) * s.rad * 0.6 + mouse.y * depth;
        const tw = 0.45 + 0.55 * Math.sin(t * 0.001 * s.tw + s.phase);
        const alpha = (0.2 + 0.8 * s.bright) * tw;
        if (s.size > 1.25) {
          ctx!.shadowBlur = 10;
          ctx!.shadowColor = s.hue === 0 ? `rgba(255,255,255,${alpha})` : `hsla(${s.hue},90%,78%,${alpha})`;
        } else {
          ctx!.shadowBlur = 0;
        }
        ctx!.beginPath();
        ctx!.arc(x, y, s.size, 0, Math.PI * 2);
        ctx!.fillStyle = s.hue === 0 ? `rgba(255,255,255,${alpha})` : `hsla(${s.hue},88%,80%,${alpha})`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      // Planets
      for (const p of planets) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < -160) p.x = w + 160; if (p.x > w + 160) p.x = -160;
        if (p.y < -160) p.y = h + 160; if (p.y > h + 160) p.y = -160;
        const px = p.x + mouse.x * p.depth * 0.6;
        const py = p.y + mouse.y * p.depth * 0.6;

        // Halo + ring (additive)
        ctx!.globalCompositeOperation = "lighter";
        const halo = ctx!.createRadialGradient(px, py, p.r * 0.6, px, py, p.r * 2.3);
        halo.addColorStop(0, `hsla(${p.hue},75%,58%,0.16)`);
        halo.addColorStop(1, `hsla(${p.hue},75%,58%,0)`);
        ctx!.fillStyle = halo;
        ctx!.beginPath(); ctx!.arc(px, py, p.r * 2.3, 0, Math.PI * 2); ctx!.fill();
        if (p.ring) {
          ctx!.save();
          ctx!.translate(px, py);
          ctx!.rotate(-0.45);
          ctx!.strokeStyle = `hsla(${p.hue},75%,78%,0.45)`;
          ctx!.lineWidth = p.r * 0.16;
          ctx!.beginPath();
          ctx!.ellipse(0, 0, p.r * 1.85, p.r * 0.6, 0, 0, Math.PI * 2);
          ctx!.stroke();
          ctx!.restore();
        }

        // Body (sphere shaded)
        ctx!.globalCompositeOperation = "source-over";
        const g = ctx!.createRadialGradient(px - p.r * 0.38, py - p.r * 0.38, p.r * 0.1, px, py, p.r);
        g.addColorStop(0, `hsl(${p.hue},65%,72%)`);
        g.addColorStop(0.55, `hsl(${p.hue},58%,44%)`);
        g.addColorStop(1, `hsl(${p.hue},62%,9%)`);
        ctx!.fillStyle = g;
        ctx!.beginPath(); ctx!.arc(px, py, p.r, 0, Math.PI * 2); ctx!.fill();
        ctx!.strokeStyle = `hsla(${p.hue},85%,82%,0.22)`;
        ctx!.lineWidth = 1;
        ctx!.beginPath(); ctx!.arc(px, py, p.r, 0, Math.PI * 2); ctx!.stroke();
      }

      // Shooting stars
      if (Math.random() < 0.007 && shooters.length < 2) {
        shooters.push({
          x: Math.random() * w, y: -30,
          vx: (Math.random() * 2 + 2) * (Math.random() < 0.5 ? 1 : -1),
          vy: Math.random() * 3 + 4, life: 0, max: 90,
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx * 3; sh.y += sh.vy * 3; sh.life++;
        const tx = sh.x - sh.vx * 9, ty = sh.y - sh.vy * 9;
        const g = ctx!.createLinearGradient(sh.x, sh.y, tx, ty);
        g.addColorStop(0, "rgba(255,255,255,0.95)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.strokeStyle = g;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(sh.x, sh.y);
        ctx!.lineTo(tx, ty);
        ctx!.stroke();
        if (sh.life > sh.max || sh.y > h + 60) shooters.splice(i, 1);
      }

      ctx!.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      mouse.tx = ((e.clientX - cx) / Math.max(cx, 1)) * 22;
      mouse.ty = ((e.clientY - cy) / Math.max(cy, 1)) * 22;
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
