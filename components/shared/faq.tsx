"use client";

import { useId, useState } from "react";
import { faqs as defaultFaqs } from "@/components/data/site";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const answerId = useId();
  const buttonId = useId();

  return (
    <div className={`faq${open ? " open" : ""}`}>
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={onToggle}
      >
        {q}
        <span aria-hidden="true">▼</span>
      </button>
      <div
        className="ans"
        id={answerId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
      >
        <div className="ans-inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq({
  items = defaultFaqs,
  title = <>Frequently Asked <span className="gold">Questions</span></>,
  id = "faq",
  singleOpen = false,
}: {
  items?: { q: string; a: string }[];
  title?: React.ReactNode;
  id?: string;
  singleOpen?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <section id={id} style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>{title}</h2>
          <div className="divider" />
        </div>
        <div className="faq-list">
          {items.map((f, index) => (
            <FaqItem
              key={f.q}
              {...f}
              open={singleOpen ? openIndex === index : openIndexes.includes(index)}
              onToggle={() => {
                if (singleOpen) {
                  setOpenIndex((current) => current === index ? null : index);
                  return;
                }

                setOpenIndexes((current) => current.includes(index)
                  ? current.filter((item) => item !== index)
                  : [...current, index]);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
