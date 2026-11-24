"use client";

import { useEffect, useState } from "react";

export default function Loader() {
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
