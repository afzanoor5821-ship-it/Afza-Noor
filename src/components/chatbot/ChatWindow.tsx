import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, X, Send, Sparkles, RotateCcw, AlertTriangle, Trash2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { quickSuggestions } from "@/lib/chatbot/suggestions";
import { useAssistant } from "@/hooks/chatbot/useAssistant";

interface Props {
  onClose: () => void;
  onMinimize: () => void;
}

export interface ChatWindowHandle {
  focusInput: () => void;
  sendPrompt: (prompt: string) => void;
}

export const ChatWindow = forwardRef<ChatWindowHandle, Props>(function ChatWindow(
  { onClose, onMinimize },
  ref,
) {
  const { messages, status, error, send, retry, reset } = useAssistant();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current?.focus(),
    sendPrompt: (p: string) => void send(p),
  }));

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    if (status === "sending" || !input.trim()) return;
    const text = input;
    setInput("");
    void send(text);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const showQuickChips = messages.length <= 1 && status !== "sending";
  const followUps = !showQuickChips && status === "idle" ? (lastAssistant?.followUps ?? []) : [];

  return (
    <motion.div
      role="dialog"
      aria-label="AI Portfolio Assistant"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="pointer-events-auto flex w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-[24px] border border-[var(--rule)] shadow-[0_30px_80px_-20px_rgba(15,15,16,0.35)] backdrop-blur-2xl"
      style={{
        height: "min(650px, calc(100vh - 120px))",
        background: "color-mix(in oklab, var(--paper-elevated) 92%, transparent)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--rule)] px-4 py-3.5">
        <div className="relative">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
            }}
          >
            <Sparkles size={16} strokeWidth={2.2} />
          </div>
          <span
            aria-hidden
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--paper-elevated)] bg-[var(--success)]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[13.5px] font-semibold text-[var(--ink)]">
              AI Portfolio Assistant
            </p>
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--rule)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
              <span className="h-1 w-1 rounded-full bg-[var(--success)]" />
              Online
            </span>
          </div>
          <p className="truncate text-[11.5px] text-[var(--ink-muted)]">
            Ask me anything about Afza Noor
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Clear conversation"
          title="Clear conversation"
          className="grid h-8 w-8 place-items-center rounded-full text-[var(--ink-muted)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--ink)]"
        >
          <Trash2 size={14} />
        </button>
        <button
          type="button"
          onClick={onMinimize}
          aria-label="Minimize"
          className="grid h-8 w-8 place-items-center rounded-full text-[var(--ink-muted)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--ink)]"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-8 w-8 place-items-center rounded-full text-[var(--ink-muted)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--ink)]"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {status === "sending" && (
            <div className="flex items-end gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
                }}
                aria-hidden
              >
                <Sparkles size={13} strokeWidth={2.2} />
              </div>
              <div className="rounded-2xl rounded-bl-md border border-[var(--rule)] bg-[var(--paper-elevated)] px-3 py-1.5 shadow-sm">
                <TypingIndicator />
              </div>
            </div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-3 py-2.5 text-[12px] text-[var(--ink)]"
            >
              <AlertTriangle size={14} className="mt-0.5 text-[var(--warning)]" />
              <div className="flex-1">
                <p className="font-medium">Couldn't reach the assistant.</p>
                <p className="text-[var(--ink-muted)]">{error ?? "Please try again."}</p>
              </div>
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--rule)] bg-[var(--paper-elevated)] px-2 py-1 text-[11px] font-medium hover:bg-[var(--secondary)]"
              >
                <RotateCcw size={11} /> Retry
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {(showQuickChips || followUps.length > 0) && (
              <motion.div
                key={showQuickChips ? "quick" : "follow"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="mt-1 flex flex-wrap gap-1.5"
              >
                {(showQuickChips
                  ? quickSuggestions.map((s) => ({ id: s.id, label: s.label, prompt: s.prompt }))
                  : followUps.map((f, i) => ({ id: `f-${i}`, label: f, prompt: f }))
                ).map((s, i) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    onClick={() => void send(s.prompt)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.28 }}
                    whileHover={{ y: -1 }}
                    className="rounded-full border border-[var(--rule)] bg-[var(--paper-elevated)] px-2.5 py-1.5 text-[11.5px] text-[var(--ink-soft)] shadow-sm transition-colors hover:border-[var(--accent-primary)]/40 hover:text-[var(--ink)]"
                  >
                    {s.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[var(--rule)] bg-[var(--paper-elevated)]/70 p-3">
        <div className="group flex items-end gap-1.5 rounded-2xl border border-[var(--rule)] bg-[var(--paper-elevated)] px-2 py-1.5 shadow-sm transition-all focus-within:border-[var(--accent-primary)]/50 focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-primary)_18%,transparent)]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            placeholder="Ask anything..."
            className="max-h-28 flex-1 resize-none bg-transparent px-2 py-1.5 text-[13.5px] leading-relaxed text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
          />
          <motion.button
            type="button"
            onClick={submit}
            disabled={!input.trim() || status === "sending"}
            whileTap={{ scale: 0.92 }}
            aria-label="Send message"
            className="grid h-8 w-8 place-items-center rounded-full text-white shadow-sm transition-opacity disabled:opacity-40"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
            }}
          >
            <Send size={14} strokeWidth={2.2} />
          </motion.button>
        </div>
        <p className="mt-2 px-1 text-center font-mono text-[9.5px] uppercase tracking-wider text-[var(--ink-muted)]">
          Powered by AI · Responses may be imperfect
        </p>
      </div>
    </motion.div>
  );
});
