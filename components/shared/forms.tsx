"use client";

import { useState } from "react";
import { bookingOptions, contactLocations, site } from "@/components/data/site";

type Status = "idle" | "sending" | "ok" | "error";

function useSubmit(endpoint: string, okMsg: string, asMultipart = false) {
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch(endpoint, asMultipart
        ? { method: "POST", body: fd }
        : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(fd)) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please call us.");
      setStatus("ok");
      setMsg(okMsg);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong. Please call us.");
    }
  }
  return { status, msg, onSubmit };
}

function Msg({ status, msg }: { status: Status; msg: string }) {
  return <div className={`form-msg${status === "error" ? " err" : ""}`} role="status">{msg}</div>;
}

function Field({ label, name, type = "text", required, placeholder, full, ...rest }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; full?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={full ? "f-full" : ""}>
      <label htmlFor={name}>{label}{required && <b> *</b>}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder ?? label} {...rest} />
    </div>
  );
}

function Select({ label, name, options, required, full }: {
  label: string; name: string; options: string[]; required?: boolean; full?: boolean;
}) {
  return (
    <div className={full ? "f-full" : ""}>
      <label htmlFor={name}>{label}{required && <b> *</b>}</label>
      <select id={name} name={name} required={required} defaultValue="">
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Area({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div className="f-full">
      <label htmlFor={name}>{label}{required && <b> *</b>}</label>
      <textarea id={name} name={name} rows={4} required={required} placeholder={label} />
    </div>
  );
}

/* ---------------- Schedule (full) ---------------- */
export function ScheduleFullForm() {
  const { status, msg, onSubmit } = useSubmit("/api/book", "Thank you! Our team will call you shortly to confirm your ride.");
  const today = new Date().toISOString().slice(0, 10);
  return (
    <form className="form-card reveal" onSubmit={onSubmit}>
      <div className="f-grid">
        <Select label="Transportation service" name="service" options={bookingOptions} required full />
        <Field label="Pick-up Location" name="pickup" required full autoComplete="street-address" />
        <Field label="Your Name" name="name" required autoComplete="name" />
        <Field label="Phone Number" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email Address" name="email" type="email" autoComplete="email" />
        <Field label="Appointment Date" name="date" type="date" min={today} required />
        <Field label="Appointment Time" name="time" type="time" required />
        <Area label="Message" name="message" />
      </div>
      <button className="btn btn-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Schedule Appointment"}
      </button>
      <Msg status={status} msg={msg} />
    </form>
  );
}

/* ---------------- Contact ---------------- */
export function ContactForm() {
  const { status, msg, onSubmit } = useSubmit("/api/contact", "Thank you! We received your message and will get back to you shortly.");
  return (
    <form className="form-card reveal" onSubmit={onSubmit}>
      <h3 className="gold" style={{ fontSize: "1.5rem", marginBottom: 6 }}>Need Transportation?</h3>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>Drop us a line and our dispatch team will call you back.</p>
      <div className="f-grid">
        <Field label="Your Name" name="name" required autoComplete="name" />
        <Field label="Phone Number" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email Address" name="email" type="email" autoComplete="email" />
        <Select label="Select Location" name="location" options={contactLocations} required />
        <Area label="Message" name="message" required />
      </div>
      <button className="btn btn-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit Now"}
      </button>
      <Msg status={status} msg={msg} />
    </form>
  );
}

/* ---------------- Apply as Driver ---------------- */
const YN = ["Yes", "No"];
const ATT = ["Attached", "Not Attached"];
const MAX_TOTAL = 4 * 1024 * 1024; // keep under Vercel's 4.5 MB request limit

function Fieldset({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="f-set">
      <legend><span className="gold">{String(n).padStart(2, "0")}</span> {title}</legend>
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

  const handle = (e: React.FormEvent<HTMLFormElement>) => {
    const files = Array.from(e.currentTarget.querySelectorAll<HTMLInputElement>("input[type=file]")).flatMap((i) => Array.from(i.files ?? []));
    const total = files.reduce((s, f) => s + f.size, 0);
    if (total > MAX_TOTAL) {
      e.preventDefault();
      setFileErr(`Your documents are ${(total / 1048576).toFixed(1)} MB in total. Please keep all three under 4 MB together (a phone photo or compressed PDF works), or email them to ${site.email}.`);
      return;
    }
    setFileErr("");
    onSubmit(e);
  };

  return (
    <form className="form-card driver-form" onSubmit={handle}>
      <Fieldset n={1} title="Personal Information">
        <Field label="Full Name" name="fullName" required autoComplete="name" />
        <Field label="Phone Number" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email Address" name="email" type="email" required autoComplete="email" />
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
        {[1, 2, 3].map((i) => (
          <div className="f-sub f-full" key={i}>
            <h4>Employer #{i}</h4>
            <div className="f-grid">
              <Field label="Name" name={`emp${i}Name`} />
              <Field label="Contact" name={`emp${i}Contact`} />
              <Field label="Address" name={`emp${i}Address`} full />
              <Field label="From" name={`emp${i}From`} type="date" />
              <Field label="To" name={`emp${i}To`} type="date" />
              <Field label="Title" name={`emp${i}Title`} />
              <Field label="Reason for leaving" name={`emp${i}Reason`} />
              <Field label="Responsibilities" name={`emp${i}Duties`} full />
            </div>
          </div>
        ))}
      </Fieldset>

      <Fieldset n={3} title="Driving Experience">
        <Field label="Types of Vehicles Driven" name="vehicles" full />
        <Field label="Years of Experience" name="years" type="number" min={0} max={60} />
        <Field label="Special Certifications" name="certs" />
      </Fieldset>

      <Fieldset n={4} title="Education & Training">
        <Select label="High School Diploma/GED" name="diploma" options={YN} required />
        <Select label="Defensive Driving Course Completed" name="defensive" options={YN} required />
        <Field label="If yes, date completed" name="defensiveDate" type="date" />
        <Field label="Relevant Training or Certifications" name="training" />
      </Fieldset>

      <Fieldset n={5} title="References (3 Professional References)">
        {[1, 2, 3].map((i) => (
          <div className="f-sub f-full" key={i}>
            <h4>Reference #{i}</h4>
            <div className="f-grid f-grid-3">
              <Field label="Name" name={`ref${i}Name`} />
              <Field label="Contact" name={`ref${i}Contact`} />
              <Field label="Relationship" name={`ref${i}Relation`} />
            </div>
          </div>
        ))}
      </Fieldset>

      <Fieldset n={6} title="Legal & Compliance">
        <Select label="Consent for Background Check" name="bgCheck" options={YN} required />
        <Select label="Drug and Alcohol Testing Consent" name="drugTest" options={YN} required />
        <Select label="Driving Record (DMV Abstract)" name="dmvAbstract" options={ATT} required />
        <Select label="Medical Examination Report (19-A)" name="medReport" options={ATT} required />
        <Select label="Annual Review of Driving Record (19-A)" name="annualReview" options={ATT} required />
        <Select label="Felony Conviction?" name="felony" options={YN} required />
        <Area label="If yes, explain" name="felonyExplain" />
      </Fieldset>

      <Fieldset n={7} title="19-A Compliance Requirements">
        <Field label="Physical Exam (19-A) – Date" name="physicalDate" type="date" />
        <Field label="Vision Test (19-A) – Date" name="visionDate" type="date" />
        <Field label="Road Test (19-A) – Date" name="roadDate" type="date" />
        <Select label="Article 19-A Certification" name="art19a" options={YN} required />
        <Select label="Pre-Service Training (19-A)" name="preService" options={["Completed", "Not Completed"]} required />
      </Fieldset>

      <Fieldset n={8} title="Additional Information">
        <Field label="Availability" name="availability" placeholder="e.g. Mon–Fri, mornings" />
        <Select label="Work Weekends/Holidays?" name="weekends" options={YN} required />
        <Field label="Special Skills / Languages" name="skills" full />
      </Fieldset>

      <Fieldset n={9} title="Emergency Contact">
        <Field label="Name" name="emName" />
        <Field label="Relationship" name="emRelation" />
        <Field label="Phone Number" name="emPhone" type="tel" />
      </Fieldset>

      <Fieldset n={10} title="Required Documents">
        <p className="f-full f-note">PDF, JPG or PNG. Please keep all three files under 4 MB in total.</p>
        <Field label="Driver's License" name="docLicense" type="file" required accept=".pdf,.jpg,.jpeg,.png" placeholder="" />
        <Field label="SSN Card" name="docSsn" type="file" required accept=".pdf,.jpg,.jpeg,.png" placeholder="" />
        <Field label="Medical Exam – Physical 19-A" name="docMedical" type="file" required accept=".pdf,.jpg,.jpeg,.png" placeholder="" />
      </Fieldset>

      <label className="f-consent">
        <input type="checkbox" name="certify" value="yes" required />
        <span>I certify that the information in this application is true and complete.</span>
      </label>
      <button className="btn btn-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Uploading…" : "Submit Full Application"}
      </button>
      <div className="form-msg err" role="alert">{fileErr}</div>
      <Msg status={status} msg={msg} />
    </form>
  );
}
