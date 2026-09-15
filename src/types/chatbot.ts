export type ChatRole = "assistant" | "user";

export type ChatCardKind = "projects" | "skills" | "education" | "contact" | "resume";

export interface ChatCard {
  kind: ChatCardKind;
  title?: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  cards?: ChatCard[];
  followUps?: string[];
}

export interface QuickSuggestion {
  id: string;
  label: string;
  prompt: string;
}

export interface AssistantResponse {
  content: string;
  cards?: ChatCard[];
  followUps?: string[];
}

export interface AssistantProvider {
  name: string;
  send: (messages: ChatMessage[], signal?: AbortSignal) => Promise<AssistantResponse>;
}
