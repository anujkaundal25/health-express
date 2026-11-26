
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { contactLocations } from "@/components/data/site";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setMsg("");

    try {
      // Get Web3Forms Access Key
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        throw new Error(
          "Web3Forms access key is missing. Check your .env.local file."
        );
      }

      // Prepare form data
      const data = Object.fromEntries(formData.entries());

      // Send data directly to Web3Forms
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...data,
            access_key: accessKey,
            subject: "New Contact Form Enquiry - Health Express",
            from_name: "Health Express Website",
          }),
        }
      );

      const result = await response.json();

      // Check API response
      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || "Failed to send your message. Please try again."
        );
      }

      // Success
      setStatus("ok");
      setMsg(
        "Thank you! We received your message and will get back to you shortly."
      );

      form.reset();

    } catch (error) {
      console.error("Web3Forms Error:", error);

      setStatus("error");

      setMsg(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

    }
  }

  return (
    <form
      className="form-card reveal"
      onSubmit={onSubmit}
    >
      {/* Heading */}
      <h3
        className="gold"
        style={{
          fontSize: "1.5rem",
          marginBottom: 6,
        }}
      >
        Need Transportation?
      </h3>

      <p
        style={{
          color: "var(--muted)",
          marginBottom: 24,
        }}
      >
        Drop us a line and our dispatch team will call you back.
      </p>

      {/* Web3Forms Honeypot Spam Protection */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="f-grid">

        {/* Name */}
        <div>
          <label htmlFor="contact-name">
            Your Name <b>*</b>
          </label>

          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone">
            Phone Number <b>*</b>
          </label>

          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            autoComplete="tel"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email">
            Email Address
          </label>

          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="contact-location">
            Select Location <b>*</b>
          </label>

          <select
            id="contact-location"
            name="location"
            defaultValue=""
            required
          >
            <option value="">Select...</option>

            {contactLocations.map((location) => (
              <option
                key={location}
                value={location}
              >
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="f-full">
          <label htmlFor="contact-message">
            Message <b>*</b>
          </label>

          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Write your message..."
            required
          />
        </div>

      </div>

      {/* Submit Button */}
      <button
        className="btn btn-gold"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending"
          ? "Sending..."
          : "Submit Now"}
      </button>

      {/* Success / Error Message */}
      {msg && (
        <div
          className={`form-msg${status === "error" ? " err" : ""}`}
          role="status"
          aria-live="polite"
        >
          {msg}
        </div>
      )}

    </form>
  );
}
