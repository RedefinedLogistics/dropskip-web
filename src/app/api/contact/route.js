import { NextResponse } from "next/server";
import { validateSubmission } from "@/lib/validate-inquiry";
import { createInquiry, strapiConfigured } from "@/lib/strapi";

/**
 * The contact form's only endpoint. It validates, then hands the submission to
 * Strapi, which stores it and sends the Amazon SES notification from its own
 * lifecycle hook.
 *
 * This runs on the server, so the browser never sees the Strapi URL or token —
 * and no AWS credential exists anywhere in this application.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_ERROR = "We could not send that just now. Please email support@dropskip.ai.";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { payload, error } = validateSubmission(body);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  if (!strapiConfigured) {
    console.error("[contact] STRAPI_URL is not set; the form has nowhere to submit to.");
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 503 });
  }

  try {
    await createInquiry(payload);
  } catch (submitError) {
    // Strapi answers a failed field check with 400 and a usable message; pass
    // that on. Anything else is our problem, not the visitor's.
    if (submitError.status === 400) {
      console.warn(`[contact] Strapi rejected the submission: ${submitError.detail}`);
      return NextResponse.json(
        { ok: false, error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    console.error(`[contact] submission failed: ${submitError.message}`);
    return NextResponse.json({ ok: false, error: GENERIC_ERROR }, { status: 502 });
  }

  // Stored in Strapi. The SES email is sent there and must not hold up the
  // response or turn a delivered message into an error for the visitor.
  return NextResponse.json({ ok: true, stored: true });
}
