/**
 * Sends an inquiry straight from the visitor's browser to Formspree.
 * Nothing passes through (or is stored on) the website's own server.
 *
 * Resolves `ok: true` ONLY when Formspree confirms it accepted and stored the
 * submission. Anything else is reported as a failure so the visitor can retry.
 */
export type SubmitResult = { ok: true } | { ok: false; message: string; retryable: boolean };

const TIMEOUT_MS = 60_000;

export async function submitToFormspree(formId: string, data: FormData): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    const body: unknown = await response.json().catch(() => null);
    const json = (body && typeof body === "object" ? body : {}) as {
      ok?: boolean;
      error?: string;
      errors?: { message?: string }[];
    };

    if (response.ok && json.ok !== false) return { ok: true };

    const detail = json.errors?.map((e) => e.message).filter(Boolean).join(" ") || json.error;
    if (response.status === 429) {
      return { ok: false, retryable: true, message: "We're receiving a lot of requests right now. Please wait a minute and try again." };
    }
    if (response.status >= 500) {
      return { ok: false, retryable: true, message: "Our form service is having trouble right now. Your information is still here. Please try again in a moment." };
    }
    return {
      ok: false,
      retryable: true,
      message: detail
        ? `Your request couldn't be sent: ${detail}`
        : "Your request couldn't be sent. Please check your entries and try again.",
    };
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    return {
      ok: false,
      retryable: true,
      message: timedOut
        ? "Sending took too long, which usually means a slow connection. Your information is still here. Please try again, or remove a photo or two."
        : "We couldn't reach our form service. Check your internet connection and try again. Your information is still here.",
    };
  } finally {
    clearTimeout(timer);
  }
}
