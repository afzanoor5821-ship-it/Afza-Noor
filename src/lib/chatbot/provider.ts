import type { AssistantProvider, AssistantResponse, ChatMessage } from "@/types/chatbot";
import { site } from "@/data/site";

type Intent =
  | "greeting"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "contact"
  | "resume"
  | "services"
  | "availability"
  | "thanks"
  | "unknown";

function classify(text: string, prev: Intent | null): Intent {
  const q = text.toLowerCase().trim();
  if (!q) return "unknown";
  if (/(^hi\b|^hey\b|^hello\b|salaam|assalam|good (morning|evening))/.test(q)) return "greeting";
  if (/(thank|thanks|appreciate|great|awesome|cool)/.test(q) && q.length < 40) return "thanks";
  if (/(resume|cv|download)/.test(q)) return "resume";
  if (/(contact|email|reach|dm|message|hire|work with)/.test(q)) return "contact";
  if (/(available|availability|freelance|open to)/.test(q)) return "availability";
  if (/(project|portfolio|case ?study|built|shipped|work you)/.test(q)) return "projects";
  if (/(skill|stack|tech|tool|framework|language|expertise|good at)/.test(q)) return "skills";
  if (/(experience|career|history|background|worked at)/.test(q)) return "experience";
  if (/(education|study|studied|university|degree|school)/.test(q)) return "education";
  if (/(service|offer|help with|do for me)/.test(q)) return "services";
  if (/(about|who are you|introduce|bio|yourself)/.test(q)) return "about";
  // Follow-up shortcuts leveraging previous intent
  if (prev === "projects" && /(more|other|another|next)/.test(q)) return "projects";
  return "unknown";
}

const followUpBank: Record<Intent, string[]> = {
  greeting: ["Show me your projects", "What are your skills?", "How can I contact you?"],
  about: ["Show me your projects", "What's your stack?", "Are you available for work?"],
  projects: ["What tech did you use?", "Show me your skills", "Can I contact you?"],
  skills: ["Show me projects using this stack", "What's your education?", "Get in touch"],
  experience: ["What have you built?", "Show me your skills", "Contact you"],
  education: ["Show your projects", "What are your skills?", "Get in touch"],
  contact: ["Download resume", "Show your projects", "Are you available?"],
  resume: ["How can I contact you?", "Show me your projects", "What are your skills?"],
  services: ["Show me projects", "How much do you charge?", "Get in touch"],
  availability: ["How can I contact you?", "Show me your projects", "Download resume"],
  thanks: ["Show me your projects", "How can I contact you?", "Download resume"],
  unknown: ["Show me your projects", "What are your skills?", "How can I contact you?"],
};

function reply(intent: Intent): AssistantResponse {
  switch (intent) {
    case "greeting":
      return {
        content: `Hey — I'm ${site.name}'s AI assistant. I can walk you through her projects, skills, education, or the fastest way to get in touch. What would you like to explore first?`,
        followUps: followUpBank.greeting,
      };
    case "about":
      return {
        content: `${site.name} is a ${site.roles.join(" · ")} based in ${site.location}. ${site.intro}`,
        followUps: followUpBank.about,
      };
    case "projects":
      return {
        content: `Here are a few selected projects — each one spans product thinking, engineering and design:`,
        cards: [{ kind: "projects", title: "Selected work" }],
        followUps: followUpBank.projects,
      };
    case "skills":
      return {
        content: `Afza works across three areas — AI engineering, frontend development and product design:`,
        cards: [{ kind: "skills", title: "Skills & stack" }],
        followUps: followUpBank.skills,
      };
    case "education":
      return {
        content: `A quick look at her academic and self-directed learning path:`,
        cards: [{ kind: "education", title: "Education" }],
        followUps: followUpBank.education,
      };
    case "experience":
      return {
        content: `She's a growing professional focused on AI-first products — from research prototypes to shipped interfaces. The Experience section on this page has the full timeline.`,
        followUps: followUpBank.experience,
      };
    case "contact":
      return {
        content: `The fastest way to reach her is right here:`,
        cards: [{ kind: "contact", title: "Get in touch" }],
        followUps: followUpBank.contact,
      };
    case "resume":
      return {
        content: `You can grab her full resume as a PDF:`,
        cards: [{ kind: "resume", title: "Resume" }],
        followUps: followUpBank.resume,
      };
    case "services":
      return {
        content: `She takes on four types of engagements — AI app development, frontend engineering, UI/UX design, and AI integration into existing products.`,
        followUps: followUpBank.services,
      };
    case "availability":
      return {
        content: `Currently ${site.availability.toLowerCase()} for new AI and frontend projects — typically responding within 48 hours.`,
        followUps: followUpBank.availability,
      };
    case "thanks":
      return {
        content: `Anytime — happy to help. Anything else you'd like to know?`,
        followUps: followUpBank.thanks,
      };
    default:
      return {
        content: `Good question — I can help with projects, skills, education, availability, or how to contact ${site.name}. Which of those would be most useful?`,
        followUps: followUpBank.unknown,
      };
  }
}

function lastIntent(messages: ChatMessage[]): Intent | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "user") return classify(m.content, null);
  }
  return null;
}

export const mockAssistantProvider: AssistantProvider = {
  name: "mock",
  async send(messages: ChatMessage[]) {
    const last = [...messages].reverse().find((m) => m.role === "user");
    const prev = lastIntent(messages.slice(0, -1));
    const intent = classify(last?.content ?? "", prev);
    await new Promise((r) => setTimeout(r, 550 + Math.random() * 450));
    return reply(intent);
  },
};

export const assistantProvider: AssistantProvider = mockAssistantProvider;
