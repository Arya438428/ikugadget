import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import SpaceBg3D from "@/components/SpaceBg3D";

type Cat = "all" | "ios" | "ipad" | "watch";

const SPEED_FAST = 30; // derajat/detik (kencang)
const SPEED_SLOW = 7;  // saat hover (melambat, tidak berhenti)

const ORBIT: { cat: Cat; img: string; label: string; sub: string; color: string }[] = [
  { cat:"ios",   img:"/products/orbit-iphone.png", label:"HP iOS",     sub:"iPhone 16 Pro",  color:"#3b82f6" },
  { cat:"ipad",  img:"/products/orbit-ipad.png",   label:"iPad",       sub:"iPad Pro",       color:"#8b5cf6" },
  { cat:"watch", img:"/products/orbit-watch.png",  label:"Smartwatch", sub:"Watch Series 10",color:"#10b981" },
];

export default function IntroSplash({ onEnter }: { onEnter: (cat: Cat) => void }) {
  const [leaving, setLeaving] = useState(false);
  const [radius, setRadius]   = useState(185);

  const planetRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ringRef    = useRef<HTMLCanvasElement>(null);
  const angle  = useRef(0);
  const speed  = useRef(SPEED_FAST);
  const target = useRef(SPEED_FAST);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth, h = window.innerHeight;
      setRadius(w < 640 ? Math.max(128, w * 0.4) : Math.max(225, Math.min(325, Math.min(w, h) * 0.36)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Gambar cincin Saturnus di canvas belakang orbit
  useEffect(() => {
    const canvas = ringRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const D = radius * 2 + 150;
    canvas.width  = Math.floor(D * dpr);
    canvas.height = Math.floor(D * dpr);
    canvas.style.width  = D + "px";
    canvas.style.height = D + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = D / 2, cy = D / 2;
    const TILT = 0.52, SLANT = 0.42;
    ctx.clearRect(0, 0, D, D);

    // Bands cincin Saturnus: dari dalam ke luar
    // Celah Cassini antara band ke-3 dan ke-4
    const bands = [
      { r: radius - 24, w: 7,  alpha: 0.10, hue: 195 },
      { r: radius - 10, w: 18, alpha: 0.20, hue: 205 },
      { r: radius + 4,  w: 30, alpha: 0.35, hue: 212 }, // paling terang
      { r: radius + 30, w: 3,  alpha: 0.04, hue: 210 }, // celah Cassini (tipis)
      { r: radius + 38, w: 20, alpha: 0.18, hue: 218 },
      { r: radius + 58, w: 12, alpha: 0.10, hue: 222 },
      { r: radius + 74, w: 7,  alpha: 0.05, hue: 226 },
    ];

    for (const b of bands) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(SLANT);
      ctx.scale(1, TILT);

      ctx.globalCompositeOperation = "lighter";
      ctx.shadowBlur = b.w * 1.8;
      ctx.shadowColor = `hsla(${b.hue},85%,78%,${b.alpha * 0.9})`;

      // Gradient radial di dalam garis (tepi lebih terang dari tengah)
      const g = ctx.createRadialGradient(0, 0, b.r - b.w / 2, 0, 0, b.r + b.w / 2);
      g.addColorStop(0,   `hsla(${b.hue},80%,80%,${(b.alpha * 0.4).toFixed(3)})`);
      g.addColorStop(0.4, `hsla(${b.hue},85%,88%,${(b.alpha).toFixed(3)})`);
      g.addColorStop(0.6, `hsla(${b.hue},85%,88%,${(b.alpha).toFixed(3)})`);
      g.addColorStop(1,   `hsla(${b.hue},80%,80%,${(b.alpha * 0.4).toFixed(3)})`);

      ctx.strokeStyle = g;
      ctx.lineWidth = b.w;
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-over";
  }, [radius]);

  // Orbit digerakkan JS biar bisa melambat halus (bukan berhenti) saat hover
  useEffect(() => {
    let raf = 0, last = performance.now();
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05); last = t;
      speed.current += (target.current - speed.current) * 0.05;
      angle.current = (angle.current + speed.current * dt) % 360;
      const A = angle.current;
      const TILT = 0.52;                 // kompresi vertikal — makin kecil makin serong
      const SLANT = 0.42;                // kemiringan diagonal (serong) ~24°
      const cS = Math.cos(SLANT), sS = Math.sin(SLANT);
      planetRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = (A + i * 120) * Math.PI / 180;
        const ex = Math.cos(a) * radius;
        const ey = Math.sin(a) * radius * TILT;
        const x = ex * cS - ey * sS;     // putar ellipse → miring diagonal
        const y = ex * sS + ey * cS;
        const front = (Math.sin(a) + 1) / 2;          // 0 belakang .. 1 depan
        const sc = 0.55 + front * 0.6;                // perspektif lembut biar tidak ketabrak/kepotong
        el.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${sc.toFixed(3)})`;
        el.style.opacity = (0.34 + front * 0.66).toFixed(2);
        // Yang paling depan lewat DI DEPAN logo+nama (z-40) biar tidak ketutup/kepotong
        el.style.zIndex = String(front > 0.78 ? 40 : 5 + Math.round(front * 14));
        el.style.filter = `brightness(${(0.55 + front * 0.65).toFixed(2)})`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [radius]);

  const choose = (c: Cat) => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onEnter(c), 560);
  };

  const D = radius * 2 + 150;
  const planet = radius < 140 ? 66 : 106;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#04040a] flex items-center justify-center overflow-hidden select-none"
      style={{ opacity: leaving ? 0 : 1, transform: leaving ? "scale(1.06)" : "scale(1)", transition: "opacity 0.55s ease, transform 0.55s ease" }}
    >
      {/* HD 3D space background */}
      <SpaceBg3D />

      {/* Vignette cinematic */}
      <div className="absolute inset-0 pointer-events-none z-[2]"
        style={{ background:"radial-gradient(ellipse 78% 72% at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4"
        style={{ animation: leaving ? "none" : "intro-up 0.7s ease both" }}>
        <p className="text-white/40 text-[11px] md:text-xs tracking-[0.4em] uppercase mb-4">
          Selamat datang di
        </p>

        {/* Orbit zone — hover = melambat */}
        <div className="orbit-zone relative" style={{ width:D, height:D }}
          onMouseEnter={()=>{ target.current = SPEED_SLOW; }}
          onMouseLeave={()=>{ target.current = SPEED_FAST; }}>

          {/* Cincin Saturnus (canvas statis, z-2 = di belakang produk) */}
          <canvas
            ref={ringRef}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ transform: "translate(-50%,-50%)", zIndex: 2 }}
          />

          {/* Center cluster — klik = Semua */}
          <button onClick={()=>choose("all")}
            className="absolute top-1/2 left-1/2 z-30 flex flex-col items-center justify-center group"
            style={{ transform:"translate(-50%,-50%)" }}>
            <div className="relative">
              <span className="absolute inset-0 rounded-3xl blur-2xl scale-[2]" style={{ background:"rgba(34,197,94,0.34)" }} />
              <span className="absolute inline-flex h-full w-full rounded-3xl opacity-40"
                style={{ animation:"iku-pulse-ring 2.4s ease-out infinite", background:"rgba(34,197,94,0.4)" }} />
              <img src={logo} alt="Iku Gadget" className="relative rounded-[1.5rem] shadow-2xl transition-transform duration-300 group-hover:scale-105"
                style={{ width: radius<140?74:108, height: radius<140?74:108 }} />
            </div>
            <h1 className="mt-3.5 text-white font-black tracking-tight leading-none text-center"
              style={{ fontSize: radius<140?"1.65rem":"2.6rem", textShadow:"0 2px 30px rgba(0,0,0,0.85)" }}>Iku Gadget</h1>
            <p className="text-primary font-bold tracking-wide mt-1" style={{ fontSize: radius<140?"0.95rem":"1.35rem" }}>&amp; Stuff</p>
          </button>

          {/* Planet produk (tanpa lingkaran, foto transparan) */}
          {ORBIT.map((o,i)=>(
            <button key={o.cat} onClick={()=>choose(o.cat)}
              ref={el => { planetRefs.current[i] = el; }}
              className="absolute top-1/2 left-1/2 flex flex-col items-center cursor-pointer group"
              style={{ opacity: 0, willChange:"transform, opacity" }}>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl pointer-events-none transition-all duration-300 group-hover:blur-3xl"
                style={{ width: planet*1.05, height: planet*1.05, background:`${o.color}66` }} />
              <img src={o.img} alt={o.label} draggable={false}
                className="relative object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ height: planet, width:"auto", filter:"drop-shadow(0 14px 30px rgba(0,0,0,0.7))" }} />
              <span className="relative mt-2 text-center whitespace-nowrap pointer-events-none">
                <span className="block text-white font-bold leading-none" style={{ fontSize: planet<74?"0.64rem":"0.78rem", textShadow:"0 1px 10px rgba(0,0,0,0.95)" }}>{o.label}</span>
                <span className="block text-white/55 leading-none mt-0.5" style={{ fontSize:"0.58rem", textShadow:"0 1px 8px rgba(0,0,0,0.95)" }}>{o.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Petunjuk + CTA — pojok kanan bawah */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex flex-col items-end gap-2.5 text-right max-w-[280px]">
        <p className="text-white/70 text-xs md:text-sm font-medium leading-snug">
          👆 Klik <span className="text-white font-bold">salah satu produk</span><br className="hidden md:block"/> untuk masuk ke kategorinya
        </p>
        <button onClick={()=>choose("all")}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 bg-white hover:bg-white/90 rounded-full px-6 py-2.5 shadow-xl shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105">
          Lihat Semua Produk →
        </button>
      </div>
    </div>
  );
}
