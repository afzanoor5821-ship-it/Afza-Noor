import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chatbot";
import { assistantProvider } from "@/lib/chatbot/provider";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;

const STORAGE_KEY = "afza-assistant-history-v1";

const buildWelcome = (): ChatMessage => ({
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hi — I'm Afza Noor's AI assistant. Ask me about her projects, skills, education, availability or how to get in touch.",
  timestamp: Date.now(),
  followUps: ["Show me your projects", "What are your skills?", "How can I contact you?"],
});

function loadHistory(): ChatMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [buildWelcome()]);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastPromptRef = useRef<string | null>(null);
  const hydrated = useRef(false);

  // Restore session memory after mount (safe for SSR).
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const stored = loadHistory();
    if (stored) setMessages(stored);
  }, []);

  // Persist within the tab session so the conversation survives close/reopen.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* quota exceeded — ignore */
    }
  }, [messages]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content) return;
      lastPromptRef.current = content;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setStatus("sending");
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await assistantProvider.send([...messages, userMsg], controller.signal);
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: res.content,
            timestamp: Date.now(),
            cards: res.cards,
            followUps: res.followUps,
          },
        ]);
        setStatus("idle");
      } catch (e) {
        setStatus("error");
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    },
    [messages],
  );

  const retry = useCallback(() => {
    if (lastPromptRef.current) {
      const prompt = lastPromptRef.current;
      setStatus("idle");
      setError(null);
      void send(prompt);
    }
  }, [send]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([buildWelcome()]);
    setStatus("idle");
    setError(null);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, []);

  return { messages, status, error, send, retry, reset };
}
