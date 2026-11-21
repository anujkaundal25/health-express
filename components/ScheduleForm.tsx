"use client";

import { useState } from "react";
import { bookingOptions } from "@/lib/site";

export default function ScheduleForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("ok");
      setMsg("Thank you! Our team will call you shortly to confirm your ride.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong. Please call us.");
    }
  }

  return (
    <section id="schedule">
      <div className="wrap">
        <div className="schedule-box reveal">
          <div className="schedule-left">
            <p style={{ letterSpacing: ".3em", textTransform: "uppercase", fontSize: ".8rem", fontWeight: 600, marginBottom: 14 }}>
              Health Express Ambulette
            </p>
            <h2>Schedule Your Appointment Online Now</h2>
          </div>
          <form className="schedule-right" onSubmit={onSubmit}>
            <label htmlFor="svc">Select transportation service</label>
            <select id="svc" name="service" required defaultValue="">
              <option value="">Choose a service</option>
              {bookingOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <label htmlFor="phone">Contact number</label>
            <input id="phone" name="phone" type="tel" placeholder="Contact number" autoComplete="tel" required />
            <button className="btn btn-gold" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Book An Appointment"}
            </button>
            <div className={`form-msg${status === "error" ? " err" : ""}`} role="status">
              {msg}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
