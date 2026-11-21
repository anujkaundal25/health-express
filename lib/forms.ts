import { NextResponse } from "next/server";

export const bad = (error: string) => NextResponse.json({ error }, { status: 400 });
export const ok = () => NextResponse.json({ ok: true });

export const clean = (v: unknown, max = 500) => String(v ?? "").trim().slice(0, max);
export const validPhone = (p: string) => p.replace(/\D/g, "").length >= 10 && p.length <= 25;
export const validEmail = (e: string) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/**
 * Sends a submission to FORMS_WEBHOOK_URL (e.g. a Make.com / Zapier webhook that emails
 * dispatch@ or adds a row to a Google Sheet). Returns false if no webhook is set or it failed.
 */
export async function forward(type: string, body: Record<string, unknown> | FormData): Promise<boolean> {
  const hook = process.env.FORMS_WEBHOOK_URL;
  if (!hook) return false;
  try {
    let res: Response;
    if (body instanceof FormData) {
      body.set("formType", type);
      res = await fetch(hook, { method: "POST", body });
    } else {
      res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: type, ...body }),
      });
    }
    return res.ok;
  } catch (e) {
    console.error(`[${type}] webhook failed`, e);
    return false;
  }
}
