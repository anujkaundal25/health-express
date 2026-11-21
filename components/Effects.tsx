"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Intro loader with spinning gold logo + ECG line. */
export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const hide = () => setTimeout(() => setDone(true), 900);
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    const failsafe = setTimeout(() => setDone(true), 5000);
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(failsafe);
    };
  }, []);
  return (
    <div id="loader" className={done ? "done" : ""} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-coin.png" alt="" />
      <svg viewBox="0 0 260 50">
        <polyline fill="none" stroke="#c9a55c" strokeWidth="2" points="0,30 90,30 100,22 108,38 120,4 134,46 146,30 160,26 172,30 260,30" />
      </svg>
      <p>HEALTH EXPRESS AMBULETTE</p>
    </div>
  );
}

/** Scroll progress bar + cursor glow + scroll-reveal for every `.reveal` element. */
export function PageEffects() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    const onMove = (e: MouseEvent) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    // re-run on every page change so new pages' .reveal elements animate in
    const t = setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el)), 30);
    onScroll();

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <div id="progress" ref={bar} />
      <div id="glow" ref={glow} />
    </>
  );
}

/** 3D tilt card with gold light that follows the cursor. */
export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = ref.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    c.style.transform = `rotateY(${(x - 0.5) * 18}deg) rotateX(${(0.5 - y) * 18}deg)`;
    c.style.setProperty("--mx", x * 100 + "%");
    c.style.setProperty("--my", y * 100 + "%");
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div className="card3d reveal">
      <div className="card-inner" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </div>
    </div>
  );
}
