export const site = {
  name: "Afza Noor",
  initials: "AN",
  location: "Nowshera, Pakistan",
  roles: ["AI Engineer", "UI/UX Designer", "Frontend Developer"],
  tagline:
    "Designing intelligent digital experiences with clean engineering and thoughtful design.",
  intro:
    "I work across AI engineering, frontend development and UI/UX design — building modern products where intelligent systems and considered interfaces meet.",
  status: "Available for AI Projects",
  availability: "Available",
  languages: ["English", "Urdu"],
  experience: "Growing Professional",
  resumeHref: "/resume.pdf",
  stack: ["Next.js", "React", "TypeScript", "Framer Motion", "Figma", "AI"],
  email: "afzanoor344@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/afzii" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/afza-noor-1013b6368/" },
    { label: "Behance", href: "https://www.behance.net/afzanoor3" },
  ],
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};

export type Site = typeof site;

export const education = [
  {
    degree: "BS Computer Science",
    school: "University of Central Punjab",
    period: "2022 — 2026",
    detail: "Focus on AI, human–computer interaction and applied ML.",
  },
  {
    degree: "AI & Full-Stack Bootcamps",
    school: "Self-directed · Coursera, DeepLearning.AI",
    period: "2023 — Present",
    detail: "LLMs, RAG, prompt engineering, modern React & product design.",
  },
];

export const projectsSummary = [
  { name: "Codexa", tagline: "AI code plagiarism detection", year: "2025", tag: "AI" },
  {
    name: "Boutique Tours",
    tagline: "Premium Tourism Experience for North Wales",
    year: "2026",
    tag: "UI/UX",
  },
  {
    name: "Michael's Food Store",
    tagline: "Modern e-commerce website for fresh products",
    year: "2026",
    tag: "Web Design",
  },
  {
    name: "Private Club Website",
    tagline: "Exclusive digital experience for premium members",
    year: "2026",
    tag: "UI/UX",
  },
  {
    name: "Portfolio v3",
    tagline: "This site — calm, editorial, motion-first",
    year: "2026",
    tag: "Frontend",
  },
  {
    name: "Design System Kit",
    tagline: "Token-driven UI kit in Figma + React",
    year: "2025",
    tag: "UI/UX",
  },
];

export const skillsSummary = {
  "AI & ML": ["LLMs", "RAG", "Prompting", "Embeddings", "OpenAI", "Gemini"],
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  "UI / UX": ["Figma", "Design Systems", "Prototyping", "Motion Design"],
};
