"use client";

import { useRef, useState } from "react";
import { faqs as defaultFaqs } from "@/components/data/site";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ans = useRef<HTMLDivElement>(null);
  return (
    <div className={`faq reveal${open ? " open" : ""}`}>
      <button aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {q}
        <span aria-hidden="true">▼</span>
      </button>
      <div className="ans" ref={ans} style={{ maxHeight: open ? (ans.current?.scrollHeight ?? 0) + 40 : 0 }}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function Faq({
  items = defaultFaqs,
  title = <>Frequently Asked <span className="gold">Questions</span></>,
  id = "faq",
}: {
  items?: { q: string; a: string }[];
  title?: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{title}</h2>
          <div className="divider" />
        </div>
        <div className="faq-list">
          {items.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
