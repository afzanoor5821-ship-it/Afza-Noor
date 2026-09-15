import { submitPortfolioContact } from "./server";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
  source?: "Portfolio Contact Form" | "AI Portfolio Assistant";
}

export interface ContactResult {
  ok: boolean;
  error?: string;
}

export type ProviderName = "console" | "api" | "resend" | "emailjs";

export async function submitContact(
  payload: ContactPayload,
  source: ContactPayload["source"] = "Portfolio Contact Form",
): Promise<ContactResult> {
  const safePayload = {
    ...payload,
    projectType: payload.projectType || "General enquiry",
    source,
  };

  const provider = (import.meta.env.VITE_CONTACT_PROVIDER ?? "resend") as ProviderName;

  try {
    switch (provider) {
      case "api": {
        const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? "/api/contact";
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(safePayload),
        });
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          return { ok: false, error: body || `Request failed (${res.status})` };
        }
        return { ok: true };
      }
      case "resend": {
        const result = await submitPortfolioContact({ data: safePayload });
        return result ?? { ok: true };
      }
      case "emailjs": {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (!serviceId || !templateId || !publicKey) {
          return { ok: false, error: "EmailJS is not configured." };
        }
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: safePayload,
          }),
        });
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          return { ok: false, error: body || `EmailJS failed (${res.status})` };
        }
        return { ok: true };
      }
      default: {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.info("[contact:console]", safePayload);
        }
        return { ok: true };
      }
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
    };
  }
}
