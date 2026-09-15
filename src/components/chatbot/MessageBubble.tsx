import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  GraduationCap,
  Folder,
  Wrench,
} from "lucide-react";
import type { ChatCard, ChatMessage } from "@/types/chatbot";
import { site, education, projectsSummary, skillsSummary } from "@/data/site";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CardBlock({ card }: { card: ChatCard }) {
  const wrap = "mt-2 rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-3 shadow-sm";

  if (card.kind === "projects") {
    return (
      <div className={wrap}>
        <Header icon={<Folder size={12} />} label="Selected projects" />
        <ul className="mt-2 grid gap-1.5">
          {projectsSummary.map((p) => (
            <li
              key={p.name}
              className="flex items-start justify-between gap-3 rounded-lg border border-[var(--rule)] bg-[var(--paper-elevated)] px-2.5 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-[var(--ink)]">{p.name}</p>
                <p className="truncate text-[11.5px] text-[var(--ink-muted)]">{p.tagline}</p>
              </div>
              <span className="shrink-0 rounded-full border border-[var(--rule)] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                {p.tag} · {p.year}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (card.kind === "skills") {
    return (
      <div className={wrap}>
        <Header icon={<Wrench size={12} />} label="Skills & stack" />
        <div className="mt-2 space-y-2">
          {Object.entries(skillsSummary).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono text-[9.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                {group}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--rule)] bg-[var(--paper-elevated)] px-2 py-0.5 text-[11px] text-[var(--ink-soft)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (card.kind === "education") {
    return (
      <div className={wrap}>
        <Header icon={<GraduationCap size={12} />} label="Education" />
        <ul className="mt-2 space-y-2">
          {education.map((e) => (
            <li
              key={e.degree}
              className="rounded-lg border border-[var(--rule)] bg-[var(--paper-elevated)] px-2.5 py-2"
            >
              <p className="text-[12.5px] font-medium text-[var(--ink)]">{e.degree}</p>
              <p className="text-[11.5px] text-[var(--ink-muted)]">
                {e.school} · {e.period}
              </p>
              <p className="mt-1 text-[11.5px] text-[var(--ink-soft)]">{e.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (card.kind === "contact") {
    const rows = [
      { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
      ...site.socials.map((s) => ({
        Icon: s.label === "GitHub" ? Github : Linkedin,
        label: s.label,
        value: s.href.replace(/^https?:\/\//, ""),
        href: s.href,
      })),
    ];
    const openContactForm = () => {
      const form = document.getElementById("contact-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        const input = document.getElementById("contact-name") as HTMLInputElement | null;
        input?.focus();
      } else {
        window.location.hash = "#contact";
      }
    };
    return (
      <div className={wrap}>
        <Header icon={<Mail size={12} />} label="Get in touch" />
        <ul className="mt-2 space-y-1.5">
          {rows.map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-[var(--rule)] bg-[var(--paper-elevated)] px-2.5 py-2 transition-colors hover:border-[var(--accent-primary)]/40"
              >
                <span className="grid h-7 w-7 place-items-center rounded-md border border-[var(--rule)] text-[var(--ink)]">
                  <r.Icon size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                    {r.label}
                  </p>
                  <p className="truncate text-[12px] text-[var(--ink)]">{r.value}</p>
                </div>
                <ArrowUpRight
                  size={13}
                  className="text-[var(--ink-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={openContactForm}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-3 py-2 text-[12px] font-medium text-[var(--paper)] transition-colors hover:bg-[var(--ink-soft)]"
        >
          Send Afza a message
          <ArrowUpRight size={13} />
        </button>
      </div>
    );
  }

  if (card.kind === "resume") {
    return (
      <div className={wrap}>
        <Header icon={<Download size={12} />} label="Resume" />
        <a
          href={site.resumeHref}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex items-center justify-between rounded-lg border border-[var(--rule)] bg-[var(--paper-elevated)] px-3 py-2.5 text-[12.5px] text-[var(--ink)] transition-colors hover:border-[var(--accent-primary)]/40"
        >
          <span className="flex items-center gap-2">
            <Download size={13} /> Download PDF
          </span>
          <ArrowUpRight size={13} className="text-[var(--ink-muted)]" />
        </a>
      </div>
    );
  }

  return null;
}

function Header({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-[var(--ink-muted)]">
      <span className="grid h-4 w-4 place-items-center rounded-sm bg-[var(--paper-elevated)] text-[var(--ink-soft)]">
        {icon}
      </span>
      {label}
    </div>
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
          }}
          aria-hidden
        >
          <Sparkles size={13} strokeWidth={2.2} />
        </div>
      )}

      <div className={`flex max-w-[85%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={
            isUser
              ? "rounded-2xl rounded-br-md bg-[var(--ink)] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[var(--paper)] shadow-sm"
              : "rounded-2xl rounded-bl-md border border-[var(--rule)] bg-[var(--paper-elevated)] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[var(--ink)] shadow-sm"
          }
        >
          {message.content}
          {message.cards?.map((c, i) => (
            <CardBlock key={i} card={c} />
          ))}
        </div>
        <span className="mt-1 px-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--rule)] bg-[var(--paper-elevated)] text-[10px] font-semibold text-[var(--ink)]">
          You
        </div>
      )}
    </motion.div>
  );
}
