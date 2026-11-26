"use client";

import { useState } from "react";
import type {
  FormEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { bookingOptions, contactLocations, site } from "@/components/data/site";

type Status = "idle" | "sending" | "ok" | "error";

function useSubmit(endpoint: string, okMsg: string, asMultipart = false) {
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setMsg("");

    try {
      const response = await fetch(
        endpoint,
        asMultipart
          ? { method: "POST", body: formData }
          : {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(formData.entries())),
            }
      );
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "Something went wrong. Please call us.";
        throw new Error(errorMessage);
      }

      setStatus("ok");
      setMsg(okMsg);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMsg(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call us."
      );
    }
  }

  return { status, msg, onSubmit };
}

function Msg({ status, msg }: { status: Status; msg: string }) {
  return (
    <div className={`form-msg${status === "error" ? " err" : ""}`} role="status">
      {msg}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  full,
  ...rest
}: {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  full?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "required" | "placeholder"
>) {
  return (
    <div className={full ? "f-full" : ""}>
      <label htmlFor={name}>
        {label}
        {required && <b> *</b>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder ?? label}
        {...rest}
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
  full,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={full ? "f-full" : ""}>
      <label htmlFor={name}>
        {label}
        {required && <b> *</b>}
      </label>
      <select id={name} name={name} required={required} defaultValue="">
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function Area({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="f-full">
      <label htmlFor={name}>
        {label}
        {required && <b> *</b>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        required={required}
        placeholder={label}
      />
    </div>
  );
}

export function ScheduleFullForm() {
  const { status, msg, onSubmit } = useSubmit(
    "/api/book",
    "Thank you! Our team will call you shortly to confirm your ride."
  );
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form className="form-card reveal" onSubmit={onSubmit}>
      <div className="f-grid">
        <Select
          label="Transportation service"
          name="service"
          options={bookingOptions}
          required
          full
        />
        <Field
          label="Pick-up Location"
          name="pickup"
          required
          full
          autoComplete="street-address"
        />
        <Field label="Your Name" name="name" required autoComplete="name" />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
        />
        <Field
          label="Appointment Date"
          name="date"
          type="date"
          min={today}
          required
        />
        <Field
          label="Appointment Time"
          name="time"
          type="time"
          required
        />
        <Area label="Message" name="message" />
      </div>
      <button
        className="btn btn-gold"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Schedule Appointment"}
      </button>
      <Msg status={status} msg={msg} />
    </form>
  );
}

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
      const accessKey = "38564f66-8b2d-45a2-8756-75fe93df1fe3";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...Object.fromEntries(formData.entries()),
          access_key: accessKey,
          subject: "New Contact Form Enquiry - Health Express",
          from_name: "Health Express Website",
        }),
      });
      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || "Failed to send your message. Please try again."
        );
      }

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
    <form className="form-card reveal" onSubmit={onSubmit}>
      <h3
        className="gold"
        style={{ fontSize: "1.5rem", marginBottom: 6 }}
      >
        Need Transportation?
      </h3>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Drop us a line and our dispatch team will call you back.
      </p>

      <input
        type="checkbox"
        name="botcheck"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="f-grid">
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
        <div>
          <label htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
          />
        </div>
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
            <option value="">Select…</option>
            {contactLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
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

      <button
        className="btn btn-gold"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Submit Now"}
      </button>
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

const YN = ["Yes", "No"];
const ATT = ["Attached", "Not Attached"];
const MAX_TOTAL = 4 * 1024 * 1024;

function Fieldset({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="f-set">
      <legend>
        <span className="gold">{String(n).padStart(2, "0")}</span> {title}
      </legend>
      <div className="f-grid">{children}</div>
    </fieldset>
  );
}

export function DriverForm() {
  const { status, msg, onSubmit } = useSubmit(
    "/api/driver",
    "Thank you for applying! Our team will review your application and contact you.",
    true
  );
  const [fileErr, setFileErr] = useState("");

  const handle = (e: FormEvent<HTMLFormElement>) => {
    const files = Array.from(
      e.currentTarget.querySelectorAll<HTMLInputElement>('input[type="file"]')
    ).flatMap((input) => Array.from(input.files ?? []));
    const total = files.reduce((size, file) => size + file.size, 0);

    if (total > MAX_TOTAL) {
      e.preventDefault();
      setFileErr(
        `Your documents are ${(total / 1048576).toFixed(1)} MB in total. Please keep all three under 4 MB together (a phone photo or compressed PDF works), or email them to ${site.email}.`
      );
      return;
    }

    setFileErr("");
    onSubmit(e);
  };

  return (
    <form className="form-card driver-form" onSubmit={handle}>
      <Fieldset n={1} title="Personal Information">
        <Field label="Full Name" name="fullName" required autoComplete="name" />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <Field label="Date of Birth" name="dob" type="date" />
        <Field label="Address" name="address" full autoComplete="street-address" />
        <Field label="City" name="city" autoComplete="address-level2" />
        <Field label="State" name="state" autoComplete="address-level1" />
        <Field label="ZIP Code" name="zip" autoComplete="postal-code" />
        <Field label="Driver's License Number" name="licenseNumber" />
        <Field label="State of Issue" name="licenseState" />
        <Field label="Expiration Date" name="licenseExpiry" type="date" />
        <Field label="CDL Class" name="cdlClass" />
        <Field label="Endorsement" name="endorsement" />
      </Fieldset>

      <Fieldset n={2} title="Employment History (Last 3 Employers)">
        {[1, 2, 3].map((index) => (
          <div className="f-sub f-full" key={index}>
            <h4>Employer #{index}</h4>
            <div className="f-grid">
              <Field label="Name" name={`emp${index}Name`} />
              <Field label="Contact" name={`emp${index}Contact`} />
              <Field label="Address" name={`emp${index}Address`} full />
              <Field label="From" name={`emp${index}From`} type="date" />
              <Field label="To" name={`emp${index}To`} type="date" />
              <Field label="Title" name={`emp${index}Title`} />
              <Field label="Reason for leaving" name={`emp${index}Reason`} />
              <Field label="Responsibilities" name={`emp${index}Duties`} full />
            </div>
          </div>
        ))}
      </Fieldset>

      <Fieldset n={3} title="Driving Experience">
        <Field label="Types of Vehicles Driven" name="vehicles" full />
        <Field
          label="Years of Experience"
          name="years"
          type="number"
          min={0}
          max={60}
        />
        <Field label="Special Certifications" name="certs" />
      </Fieldset>

      <Fieldset n={4} title="Education & Training">
        <Select
          label="High School Diploma/GED"
          name="diploma"
          options={YN}
          required
        />
        <Select
          label="Defensive Driving Course Completed"
          name="defensive"
          options={YN}
          required
        />
        <Field label="If yes, date completed" name="defensiveDate" type="date" />
        <Field label="Relevant Training or Certifications" name="training" />
      </Fieldset>

      <Fieldset n={5} title="References (3 Professional References)">
        {[1, 2, 3].map((index) => (
          <div className="f-sub f-full" key={index}>
            <h4>Reference #{index}</h4>
            <div className="f-grid">
              <Field label="Name" name={`ref${index}Name`} />
              <Field label="Contact" name={`ref${index}Contact`} />
              <Field label="Relationship" name={`ref${index}Relation`} />
            </div>
          </div>
        ))}
      </Fieldset>

      <Fieldset n={6} title="Legal & Compliance">
        <Select
          label="Consent for Background Check"
          name="bgCheck"
          options={YN}
          required
        />
        <Select
          label="Drug and Alcohol Testing Consent"
          name="drugTest"
          options={YN}
          required
        />
        <Select
          label="Driving Record (DMV Abstract)"
          name="dmvAbstract"
          options={ATT}
          required
        />
        <Select
          label="Medical Examination Report (19-A)"
          name="medReport"
          options={ATT}
          required
        />
        <Select
          label="Annual Review of Driving Record (19-A)"
          name="annualReview"
          options={ATT}
          required
        />
        <Select label="Felony Conviction?" name="felony" options={YN} required />
        <Area label="If yes, explain" name="felonyExplain" />
      </Fieldset>

      <Fieldset n={7} title="19-A Compliance Requirements">
        <Field label="Physical Exam (19-A) – Date" name="physicalDate" type="date" />
        <Field label="Vision Test (19-A) – Date" name="visionDate" type="date" />
        <Field label="Road Test (19-A) – Date" name="roadDate" type="date" />
        <Select
          label="Article 19-A Certification"
          name="art19a"
          options={YN}
          required
        />
        <Select
          label="Pre-Service Training (19-A)"
          name="preService"
          options={["Completed", "Not Completed"]}
          required
        />
      </Fieldset>

      <Fieldset n={8} title="Additional Information">
        <Field
          label="Availability"
          name="availability"
          placeholder="e.g. Mon–Fri, mornings"
        />
        <Select
          label="Work Weekends/Holidays?"
          name="weekends"
          options={YN}
          required
        />
        <Field label="Special Skills / Languages" name="skills" full />
      </Fieldset>

      <Fieldset n={9} title="Emergency Contact">
        <Field label="Name" name="emName" />
        <Field label="Relationship" name="emRelation" />
        <Field label="Phone Number" name="emPhone" type="tel" />
      </Fieldset>

      <Fieldset n={10} title="Required Documents">
        <p className="f-full f-note">
          PDF, JPG or PNG. Please keep all three files under 4 MB in total.
        </p>
        <Field
          label="Driver's License"
          name="docLicense"
          type="file"
          required
          accept=".pdf,.jpg,.jpeg,.png"
          placeholder=""
        />
        <Field
          label="SSN Card"
          name="docSsn"
          type="file"
          required
          accept=".pdf,.jpg,.jpeg,.png"
          placeholder=""
        />
        <Field
          label="Medical Exam – Physical 19-A"
          name="docMedical"
          type="file"
          required
          accept=".pdf,.jpg,.jpeg,.png"
          placeholder=""
        />
      </Fieldset>

      <label className="f-consent">
        <input type="checkbox" name="certify" value="yes" required />
        <span>
          I certify that the information in this application is true and complete.
        </span>
      </label>
      <button
        className="btn btn-gold"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Uploading…" : "Submit Full Application"}
      </button>
      <div className="form-msg err" role="alert">
        {fileErr}
      </div>
      <Msg status={status} msg={msg} />
    </form>
  );
}
