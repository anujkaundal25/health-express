"use client";

import { useEffect, useRef } from "react";

/**
 * Photo-real 3D hero: layered background + van with mouse/scroll parallax,
 * animated road reflections, lane dashes and rain drawn on canvas.
 */
export default function Hero3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const vanRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLCanvasElement>(null);
  const rainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current, bg = bgRef.current, van = vanRef.current;
    const road = roadRef.current, rain = rainRef.current;
    if (!stage || !bg || !van || !road || !rain) return;
    const rc = road.getContext("2d"), wc = rain.getContext("2d");
    if (!rc || !wc) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      W = stage.clientWidth; H = stage.clientHeight;
      [road, rain].forEach((c) => { c.width = W * dpr; c.height = H * dpr; });
      rc.setTransform(dpr, 0, 0, dpr, 0, 0);
      wc.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const streaks = Array.from({ length: 26 }, () => ({
      x: Math.random(), y: 0.72 + Math.random() * 0.28, l: 0.04 + Math.random() * 0.12,
      s: 0.25 + Math.random() * 0.5, w: 1 + Math.random() * 2.5,
      c: Math.random() < 0.7 ? "236,213,154" : "255,190,110",
    }));
    const drops = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(), l: 10 + Math.random() * 18, s: 0.6 + Math.random() * 0.8,
    }));

    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("mousemove", onMove);

    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      cx += (mx - cx) * 0.06; cy += (my - cy) * 0.06;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      bg.style.transform = `translate3d(${-cx * 14}px,${-cy * 8 + p * 40}px,0) scale(${1.04 + p * 0.04})`;
      van.style.transform = `translate3d(${cx * 22 + p * 70}px,${cy * 10 + p * 30}px,0) rotateY(${cx * 5}deg) rotateX(${-cy * 3}deg) scale(${1 + p * 0.18})`;
      rain.style.transform = `translate3d(${cx * 36}px,${cy * 16}px,0)`;

      // road reflections
      rc.clearRect(0, 0, W, H);
      streaks.forEach((s) => {
        s.x -= s.s * dt;
        if (s.x < -s.l) { s.x = 1 + Math.random() * 0.2; s.y = 0.72 + Math.random() * 0.28; }
        const x = s.x * W, y = s.y * H, len = s.l * W;
        const g = rc.createLinearGradient(x, y, x + len, y - len * 0.08);
        g.addColorStop(0, `rgba(${s.c},0)`); g.addColorStop(0.5, `rgba(${s.c},.55)`); g.addColorStop(1, `rgba(${s.c},0)`);
        rc.strokeStyle = g; rc.lineWidth = s.w;
        rc.beginPath(); rc.moveTo(x, y); rc.lineTo(x + len, y - len * 0.08); rc.stroke();
      });
      // lane dashes rushing past
      const dash = ((now / 1000) * 1.6) % 1;
      rc.fillStyle = "rgba(242,236,220,.35)";
      for (let i = 0; i < 3; i++) {
        const q = (dash + i / 3) % 1, x = W * (1.05 - q * 1.25), y = H * (0.86 + q * 0.1);
        rc.save(); rc.translate(x, y); rc.rotate(0.1); rc.fillRect(0, 0, W * 0.07 * (0.6 + q), 3 + q * 4); rc.restore();
      }
      // rain
      wc.clearRect(0, 0, W, H);
      wc.strokeStyle = "rgba(210,220,240,.28)"; wc.lineWidth = 1; wc.beginPath();
      drops.forEach((d) => {
        d.y += d.s * dt * 1.4; d.x -= d.s * dt * 0.25;
        if (d.y > 1) { d.y = -0.05; d.x = Math.random() * 1.1; }
        const x = d.x * W, y = d.y * H; wc.moveTo(x, y); wc.lineTo(x - d.l * 0.25, y + d.l);
      });
      wc.stroke();
      raf = requestAnimationFrame(loop);
    };
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="stage" ref={stageRef} aria-hidden="true">
      <div className="layer l-bg" ref={bgRef} />
      <canvas className="layer" ref={roadRef} />
      <div className="layer l-van" ref={vanRef}>
        <div className="van-bounce">
          <div className="van-shadow" />
          <div className="van-img" />
          <span className="glow g-head" style={{ left: "50.65%", top: "56.71%" }} />
          <span className="glow g-head" style={{ left: "69.40%", top: "56.94%" }} />
          <span className="glow g-fog" style={{ left: "50.78%", top: "70.83%" }} />
          <span className="glow g-amber" style={{ left: "47.79%", top: "28.94%" }} />
          <span className="glow g-amber" style={{ left: "49.61%", top: "28.70%" }} />
          <span className="glow g-amber" style={{ left: "51.56%", top: "28.94%" }} />
          <span className="beam" style={{ left: "70.31%", top: "57.87%" }} />
          <span className="road-glow" style={{ left: "49.48%", top: "79.86%" }} />
          <span className="road-glow" style={{ left: "67.71%", top: "78.70%" }} />
        </div>
      </div>
      <canvas className="layer" id="rainFx" ref={rainRef} />
    </div>
  );
}
