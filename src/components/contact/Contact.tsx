import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { z } from "zod";
import {
  ArrowUpRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Figma,
  MapPin,
  CircleDot,
  Check,
  Loader2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { site } from "@/data/site";
import { submitContact } from "@/lib/contact/provider";
import { openAssistant } from "@/lib/openAssistant";

const ease = [0.22, 1, 0.36, 1] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a little more").max(1500),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;

const projectTypes = [
  "AI Application",
  "Frontend Development",
  "UI/UX Design",
  "AI Integration",
  "Other",
];

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
  budget: "",
};

export function Contact() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const anim = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, ease, delay: 0.05 + i * 0.06 },
        };

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setStatus("loading");
    setSubmitError(null);
    const result = await submitContact(parsed.data, "Portfolio Contact Form");
    if (!result.ok) {
      setStatus("error");
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
      return;
    }
    setStatus("sent");
    setSubmitError(null);
    setValues(initial);
    setTimeout(() => setStatus("idle"), 3600);
  };

  const info = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      icon: Github,
      label: "GitHub",
      value: "@afzanoor",
      href: site.socials.find((s) => s.label === "GitHub")?.href ?? "#",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/afzanoor",
      href: site.socials.find((s) => s.label === "LinkedIn")?.href ?? "#",
    },
    {
      icon: Figma,
      label: "Behance",
      value: "behance.net/afzanoor3",
      href: site.socials.find((s) => s.label === "Behance")?.href ?? "#",
    },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: CircleDot, label: "Availability", value: "Open to opportunities" },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <motion.div {...anim(0)} className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            006 / Contact
          </span>
          <div className="h-px flex-1 bg-rule" />
        </motion.div>

        {/* CTA block */}
        <motion.div
          {...anim(1)}
          className="relative mb-10 overflow-hidden rounded-3xl border border-rule bg-paper-elevated/70 p-10 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_30px_60px_-40px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-14"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,var(--amber-soft)_0%,transparent_75%)] opacity-70" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-[40px] leading-[1.05] tracking-tight text-ink sm:text-[56px]">
                Have an <span className="italic text-ink-soft">idea?</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-ink-soft">
                Let's turn it into reality — thoughtful design, calm engineering and a little bit of
                AI.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openAssistant()}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 hover:bg-ink-soft"
              >
                <Sparkles className="h-4 w-4" />
                Start a Conversation
              </button>
              <a
                href={site.resumeHref}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-elevated/60 px-5 py-3 text-[13px] font-medium text-ink backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/35"
              >
                <Download className="h-4 w-4 text-ink-muted transition-colors group-hover:text-ink" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h3
          {...anim(2)}
          className="font-display text-[32px] leading-tight tracking-tight text-ink sm:text-[44px]"
        >
          Let's build something <span className="italic text-ink-soft">great together.</span>
        </motion.h3>
        <motion.p
          {...anim(3)}
          className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-ink-muted"
        >
          Whether you're a recruiter, founder or fellow builder — send a note and I'll get back
          within a couple of days.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Form */}
          <motion.form
            id="contact-form"
            {...anim(4)}
            onSubmit={onSubmit}
            noValidate
            className="lg:col-span-7 space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                error={errors.name}
                input={
                  <input
                    type="text"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    id="contact-name"
                    placeholder="Your name"
                    className={inputCls}
                  />
                }
              />
              <Field
                label="Email"
                error={errors.email}
                input={
                  <input
                    type="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Company"
                optional
                input={
                  <input
                    type="text"
                    value={values.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Optional"
                    className={inputCls}
                  />
                }
              />
              <Field
                label="Project Type"
                error={errors.projectType}
                input={
                  <select
                    value={values.projectType}
                    onChange={(e) => update("projectType", e.target.value)}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="">Choose one…</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                }
              />
            </div>

            <Field
              label="Budget"
              optional
              input={
                <input
                  type="text"
                  value={values.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  placeholder="e.g. $3k–$8k (optional)"
                  className={inputCls}
                />
              }
            />

            <Field
              label="Message"
              error={errors.message}
              input={
                <textarea
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={6}
                  placeholder="Tell me about the project…"
                  className={`${inputCls} resize-none`}
                />
              }
            />

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : status === "sent" ? (
                  <>
                    <Check className="h-4 w-4" /> Message sent
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
              <span className="text-[12px] text-ink-muted">Replies within 48 hours.</span>
            </div>
            {status === "error" && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/5 px-3 py-2.5 text-[12.5px] text-[var(--ink)]"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--danger)]" />
                <div className="flex-1">
                  <p className="font-medium">Something went wrong. Please try again.</p>
                  <p className="text-ink-muted">
                    {submitError} — you can also email{" "}
                    <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                      {site.email}
                    </a>{" "}
                    directly.
                  </p>
                </div>
              </div>
            )}
            {status === "sent" && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/5 px-3 py-2.5 text-[12.5px] text-[var(--ink)]"
              >
                Thanks! Your message has been sent successfully.
              </p>
            )}
          </motion.form>

          {/* Info */}
          <motion.aside {...anim(5)} className="lg:col-span-5">
            <div className="rounded-2xl border border-rule bg-paper-elevated/70 p-6 backdrop-blur-md sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                Direct
              </p>
              <ul className="mt-6 divide-y divide-rule">
                {info.map((row) => {
                  const Icon = row.icon;
                  const inner = (
                    <div className="flex items-center gap-4 py-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rule bg-paper text-ink">
                        <Icon size={15} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                          {row.label}
                        </div>
                        <div className="mt-0.5 truncate text-[14px] text-ink">{row.value}</div>
                      </div>
                      {row.href && (
                        <ArrowUpRight
                          size={14}
                          className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      )}
                    </div>
                  );
                  return (
                    <li key={row.label}>
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="group block transition-colors hover:text-ink"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-rule bg-paper-elevated/70 px-4 py-3 text-[14px] text-ink placeholder:text-ink-muted/70 transition-all duration-300 focus:border-ink/40 focus:outline-none focus:ring-4 focus:ring-ink/5";

function Field({
  label,
  input,
  error,
  optional,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </span>
        {optional && <span className="text-[10px] text-ink-muted/70">Optional</span>}
      </div>
      {input}
      {error && <p className="mt-1.5 text-[12px] text-[var(--danger)]">{error}</p>}
    </label>
  );
}
