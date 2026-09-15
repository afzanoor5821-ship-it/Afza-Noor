// Small event bus so any part of the app can pop open the AI assistant.
// Prevents scroll-based CTAs like "Start a Conversation" from just jumping
// to a form — instead they open the assistant, focus the input, and greet.

export const OPEN_ASSISTANT_EVENT = "assistant:open";

export type OpenAssistantDetail = { prompt?: string };

export function openAssistant(detail: OpenAssistantDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenAssistantDetail>(OPEN_ASSISTANT_EVENT, { detail }));
}
