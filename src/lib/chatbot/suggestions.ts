import type { QuickSuggestion } from "@/types/chatbot";

export const quickSuggestions: QuickSuggestion[] = [
  { id: "projects", label: "Show projects", prompt: "Show me your projects" },
  { id: "skills", label: "Skills & stack", prompt: "What are your skills?" },
  { id: "education", label: "Education", prompt: "What's your education background?" },
  { id: "resume", label: "Resume", prompt: "Can I see your resume?" },
  { id: "contact", label: "Get in touch", prompt: "How can I contact you?" },
];
