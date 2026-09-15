import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  X,
  Clock,
  User,
  Layers,
  Monitor,
  Smartphone,
  LayoutDashboard,
} from "lucide-react";

type Category =
  | "UI Design"
  | "UX Design"
  | "Web Apps"
  | "Mobile Apps"
  | "Dashboards"
  | "AI Products"
  | "Landing Pages";

type Platform =
  | "Web Application"
  | "Responsive Website"
  | "Web App"
  | "Dashboard"
  | "Mobile App"
  | "Landing Page";

type CaseStudy = {
  overview: string;
  problem: string;
  research: string;
  wireframes: string;
  designSystem: string;
  hifi: string;
  prototype: string;
  results: string;
};

type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  platform: Platform;
  role: string;
  duration: string;
  year: string;
  tools: string[];
  tags: string[];
  categories: Category[];
  links: { caseStudy?: string; prototype?: string };
  cover: { label: string; from: string; to: string; device: "desktop" | "mobile" | "dashboard"; image?: string };
  caseStudy: CaseStudy;
};

const projects: Project[] = [
  {
    slug: "codexa",
    name: "Codexa",
    tagline: "AI Code Plagiarism Detection Platform",
    description:
      "An intelligent platform that detects code similarity across student submissions using LLM embeddings and AST fingerprinting.",
    category: "AI + Dashboard",
    platform: "Web Application",
    role: "Product Designer & Full-Stack",
    duration: "6 weeks",
    year: "2025",
    tools: ["Figma", "React", "Python", "LLMs"],
    tags: ["AI", "Dashboard", "SaaS"],
    categories: ["AI Products", "Dashboards", "Web Apps", "UI Design"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Codexa", from: "#2563EB", to: "#7C3AED", device: "dashboard", image: "/codexa.png" },
    caseStudy: {
      overview:
        "Codexa helps instructors detect paraphrased, AI-rewritten and structurally-similar code across hundreds of submissions in minutes instead of hours.",
      problem:
        "Traditional token-based tools miss AI-rewritten or semantically similar code. Instructors were reviewing manually at scale.",
      research:
        "Interviewed 8 university instructors and analysed 1,200+ real submissions to map failure modes of existing tools.",
      wireframes:
        "Low-fidelity flows for upload, batch review, similarity graph and per-file diff, iterated with two instructors.",
      designSystem:
        "Neutral editorial system with a single accent, monospaced code surface and calm data-viz palette.",
      hifi: "High-fidelity dashboard with side-by-side diff, similarity heatmap and cluster view.",
      prototype:
        "Interactive Figma prototype covering upload → cluster → per-pair review → export report.",
      results:
        "Cut manual review time by ~70% in pilot classrooms and surfaced matches that legacy tools missed.",
    },
  },
  {
    slug: "boutique-tours",
    name: "Boutique Tours",
    tagline: "Premium Tourism Experience for North Wales",
    description: "Designed and developed the \"Boutique Tours of North Wales\" website, showcasing personalized travel experiences, scenic destinations, and seamless booking features.",
    category: "UI / UX Design",
    platform: "Responsive Website",
    role: "UI/UX Designer",
    duration: "1 week",
    year: "2026",
    tools: ["Figma", "Web Design"],
    tags: ["Tourism", "Luxury", "UI/UX"],
    categories: ["UI Design", "UX Design", "Web Apps"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Tour Works", from: "#15803d", to: "#1e3a8a", device: "desktop", image: "/boutique-tours.jpg" },
    caseStudy: {
      overview: "Boutique Tours of North Wales is a premium tourism website designed to showcase personalized travel experiences across the breathtaking landscapes of North Wales.",
      problem: "The client needed a premium digital presence to convey luxury, trust, and memorable experiences to encourage bookings.",
      research: "Analyzed luxury tourism platforms to identify key conversion drivers and trust-building elements.",
      wireframes: "Mapped a seamless user journey focusing on curated tours and breathtaking destination imagery.",
      designSystem: "An elegant, user-friendly interface with a focus on luxury, utilizing a refined color palette and elegant typography.",
      hifi: "High-fidelity mockups highlighting stunning destinations, curated tours, and seamless navigation.",
      prototype: "Interactive prototypes demonstrating the booking flow and destination exploration.",
      results: "Delivered a design that encourages visitors to explore, connect, and book their next adventure with confidence."
    },
  },
  {
    slug: "michaels-food-store",
    name: "Michael's Food Store",
    tagline: "Modern e-commerce website for fresh products",
    description: "Designed a modern e-commerce website for Michael's Food Store, featuring fresh products, easy navigation, and a seamless online shopping experience.",
    category: "Web Design",
    platform: "Responsive Website",
    role: "UI/UX Designer",
    duration: "4 weeks",
    year: "2026",
    tools: ["Figma", "Web Design"],
    tags: ["Food", "Ecommerce", "UI/UX"],
    categories: ["UI Design", "Web Apps"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Michael's Food", from: "#ea580c", to: "#fb923c", device: "desktop", image: "/michaels-food-store.png" },
    caseStudy: {
      overview: "A fresh and modern e-commerce experience designed for Michael's Food Store.",
      problem: "The store needed a digital storefront that conveys freshness while making the online shopping experience simple and intuitive.",
      research: "Reviewed top online grocery and food delivery platforms to understand best practices for product discovery and cart management.",
      wireframes: "Created layouts emphasizing high-quality product imagery and a frictionless checkout process.",
      designSystem: "A vibrant, appetizing color palette with clean typography to let the food imagery stand out.",
      hifi: "High-fidelity screens showcasing the homepage, product categories, and a streamlined cart.",
      prototype: "Interactive flows for browsing products, adding to cart, and checking out.",
      results: "Delivered a welcoming and easy-to-use e-commerce platform that drives online sales."
    },
  },
  {
    slug: "pizza-app-design",
    name: "Pizza App Design",
    tagline: "Modern pizza ordering app",
    description: "Designed a modern pizza ordering app with an intuitive interface, quick customization, and seamless checkout.",
    category: "UI / UX Design",
    platform: "Mobile App",
    role: "UI/UX Designer",
    duration: "2 weeks",
    year: "2026",
    tools: ["Figma", "Mobile UI"],
    tags: ["Food", "Mobile", "UI/UX"],
    categories: ["UI Design", "UX Design", "Mobile Apps"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Pizza App", from: "#ef4444", to: "#f59e0b", device: "mobile", image: "/pizza-app.png" },
    caseStudy: {
      overview: "A seamless and visually appetizing mobile application designed to simplify the pizza ordering process.",
      problem: "Users often found pizza customization steps tedious and cluttered in legacy apps.",
      research: "Reviewed top food delivery platforms to identify best practices for fast customization and intuitive navigation.",
      wireframes: "Mobile-first wireframes focusing on a visual pizza builder and a quick checkout flow.",
      designSystem: "Warm and appetizing color palette paired with bold, legible typography and high-quality food photography.",
      hifi: "High-fidelity mockups of the menu, interactive pizza customizer, and streamlined cart.",
      prototype: "Clickable prototype testing the end-to-end user journey from selection to payment.",
      results: "Delivered a modern, engaging interface that reduces friction and speeds up the ordering process."
    },
  },
  {
    slug: "private-club-website",
    name: "Private Club Website",
    tagline: "Exclusive digital experience",
    description: "Designed and developed the \"Private Club Website Design\" project, delivering an exclusive digital experience with premium aesthetics, member-focused features, and seamless navigation.",
    category: "UI / UX Design",
    platform: "Web App",
    role: "UI/UX Designer",
    duration: "3 weeks",
    year: "2026",
    tools: ["Figma", "Web Design"],
    tags: ["Clubs", "Luxury", "UI/UX"],
    categories: ["UI Design", "UX Design", "Web Apps"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Private Club", from: "#d97706", to: "#78350f", device: "desktop", image: "/private-club.png" },
    caseStudy: {
      overview: "A premium digital presence designed exclusively for a distinguished private members club.",
      problem: "The club needed a digital experience that matched its real-world exclusivity and luxury while providing seamless membership management.",
      research: "Analyzed elite hospitality and luxury lifestyle websites to establish a high-end visual language and user journey.",
      wireframes: "Drafted elegant layouts focusing on high-quality imagery, clear membership tiers, and facility showcases.",
      designSystem: "A refined and luxurious design system using sophisticated typography and a premium color palette.",
      hifi: "Polished interfaces detailing the club's amenities, dining experiences, and member application flow.",
      prototype: "Interactive prototypes for the membership inquiry process and facility exploration.",
      results: "Delivered a sophisticated digital platform that reinforces the club's exclusive brand identity and simplifies member onboarding.",
    },
  },
  {
    slug: "beefixi-mobile-app",
    name: "Beefixi Mobile App",
    tagline: "Garage management & automotive service experience",
    description:
      "A modern mobile app designed for garage owners and automotive service professionals to manage customers, service jobs, appointments, earnings, vehicle information, and roadside assistance in one place.",
    category: "UI / UX Design",
    platform: "Mobile App",
    role: "UI/UX Designer",
    duration: "3 weeks",
    year: "2026",
    tools: ["Figma", "Mobile App Design", "Prototyping"],
    tags: ["Automotive", "Mobile", "UI/UX"],
    categories: ["Mobile Apps", "UI Design", "UX Design"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Beefixi", from: "#171717", to: "#4B5563", device: "mobile" },
    caseStudy: {
      overview:
        "A modern mobile app designed for garage owners and automotive service professionals to manage customers, service jobs, appointments, earnings, vehicle information, and roadside assistance in one place.",
      problem:
        "Garage owners often manage customer requests, service jobs, appointments, vehicle details, and earnings manually or through multiple systems. Beefixi was designed to bring these important daily operations into one simple and organized mobile experience.",
      research:
        "Explored the daily workflow of garage professionals and identified the most important tasks and information they need, including active jobs, customer requests, appointments, earnings, vehicle details, and roadside assistance.",
      wireframes:
        "Created mobile-first wireframes with a clear information hierarchy and simple navigation, focusing on quick access to important garage operations and reducing unnecessary steps.",
      designSystem:
        "Created a dark, modern automotive-focused design system with bold yellow accents, strong contrast, clean typography, structured cards, and clear visual hierarchy.",
      hifi:
        "Designed high-fidelity mobile screens for earnings tracking, job management, customer requests, appointments, roadside assistance, vehicle/service information, and garage operations.",
      prototype:
        "Created interactive Figma prototypes demonstrating the main user flows, including managing service jobs, viewing customer requests, checking earnings, handling appointments, and navigating core garage features.",
      results:
        "Delivered a complete and intuitive mobile UI/UX experience that helps garage professionals organize their daily operations, manage customers and service requests, track earnings, and access essential garage tools from one centralized app.",
    },
  },
  {
    slug: "finance-dashboard",
    name: "Finance Dashboard",
    tagline: "Personal finance analytics with clarity",
    description:
      "A modern finance dashboard that turns transactions into calm, understandable insight.",
    category: "Dashboard UI",
    platform: "Dashboard",
    role: "Product Designer",
    duration: "3 weeks",
    year: "2025",
    tools: ["Figma", "Illustrator"],
    tags: ["Fintech", "Data-viz", "SaaS"],
    categories: ["Dashboards", "UI Design"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Ledger", from: "#111827", to: "#2563EB", device: "dashboard" },
    caseStudy: {
      overview: "A personal finance canvas that reads like a magazine, not a spreadsheet.",
      problem: "Most finance apps drown users in charts and give them no clear next step.",
      research: "Interviewed 6 users about their monthly review ritual and pain points.",
      wireframes: "Story-first layout: headline number, then supporting breakdown.",
      designSystem: "Editorial dark theme with a single accent and disciplined data-viz palette.",
      hifi: "Cashflow story, category breakdown, goals and subscription tracker.",
      prototype: "Interactive month-by-month review flow.",
      results: "Users completed their monthly review in under 3 minutes on average.",
    },
  },
  {
    slug: "travel-mobile-app",
    name: "Travel Mobile App",
    tagline: "Plan, book and remember trips beautifully",
    description: "A mobile travel companion covering discovery, itinerary and in-trip experiences.",
    category: "Mobile UI",
    platform: "Mobile App",
    role: "UI Designer",
    duration: "4 weeks",
    year: "2025",
    tools: ["Figma", "Illustrator", "Prototype"],
    tags: ["Travel", "Mobile", "iOS"],
    categories: ["Mobile Apps", "UI Design"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Wander", from: "#F97316", to: "#DB2777", device: "mobile" },
    caseStudy: {
      overview: "A calm travel app that makes planning feel like part of the trip.",
      problem: "Travel apps are transactional; they miss the emotional side of planning.",
      research: "Studied 4 popular travel apps and interviewed 5 frequent travellers.",
      wireframes: "Discovery-first home, itinerary timeline and in-trip essentials.",
      designSystem: "Warm, editorial palette with expressive imagery and rounded surfaces.",
      hifi: "Discovery cards, itinerary day-view, and offline in-trip mode.",
      prototype: "Prototype covering search → itinerary build → day-of experience.",
      results: "Highest emotional-response score across the tested apps in a 12-person study.",
    },
  },
  {
    slug: "food-delivery-app",
    name: "Food Delivery App",
    tagline: "Fast, friendly food ordering experience",
    description: "A food delivery UX focused on speed, reorder flows and clear delivery status.",
    category: "Mobile UX",
    platform: "Mobile App",
    role: "UX Designer",
    duration: "3 weeks",
    year: "2024",
    tools: ["Figma", "Prototype"],
    tags: ["Food", "Mobile", "UX"],
    categories: ["Mobile Apps", "UX Design"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Bento", from: "#EF4444", to: "#F59E0B", device: "mobile" },
    caseStudy: {
      overview: "A food ordering flow that respects hungry users and rewards return visits.",
      problem: "Existing apps bury reorder and force users through the full flow every time.",
      research: "Analysed 200+ reviews across 3 apps to cluster recurring complaints.",
      wireframes: "One-tap reorder, live status stack, and calm empty states.",
      designSystem: "Appetite-safe warm palette with strong price and time typography.",
      hifi: "Home, restaurant, cart, checkout and order tracking screens.",
      prototype: "Prototype covering reorder in under 4 taps.",
      results: "Reduced reorder time from 42s to 9s in usability tests.",
    },
  },
  {
    slug: "saas-landing-page",
    name: "SaaS Landing Page",
    tagline: "Conversion-focused landing page for a modern SaaS",
    description:
      "A premium landing page with clear narrative, strong hero and trust-building sections.",
    category: "Landing Page",
    platform: "Landing Page",
    role: "Product Designer",
    duration: "2 weeks",
    year: "2025",
    tools: ["Figma", "Illustrator", "Photoshop"],
    tags: ["Landing", "Marketing", "SaaS"],
    categories: ["Landing Pages", "UI Design", "Web Apps"],
    links: { caseStudy: "#", prototype: "#" },
    cover: { label: "Launch", from: "#6366F1", to: "#22D3EE", device: "desktop" },
    caseStudy: {
      overview: "A landing page that tells the product story in one confident scroll.",
      problem: "The team's existing page led with features, not value, and converted poorly.",
      research: "Ran a heuristic review and 4 user tests against 3 competitor pages.",
      wireframes: "Hero-first narrative: promise, proof, product, plan.",
      designSystem: "Editorial typography, calm gradients and a single accent CTA.",
      hifi: "Hero, feature strips, testimonials, pricing and FAQ.",
      prototype: "Scrolling prototype with animated section reveals.",
      results: "Projected +38% lift in demo requests based on prototype A/B tests.",
    },
  },
];

const filters: Array<"All" | Category> = [
  "All",
  "UI Design",
  "UX Design",
  "Web Apps",
  "Mobile Apps",
  "Dashboards",
  "AI Products",
  "Landing Pages",
];

const platformIcon: Record<Platform, typeof Monitor> = {
  "Web Application": Monitor,
  "Responsive Website": Monitor,
  "Web App": Monitor,
  Dashboard: LayoutDashboard,
  "Mobile App": Smartphone,
  "Landing Page": Layers,
};

export function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(active as Category)),
    [active],
  );

  const openProject =
    filtered.find((p) => p.slug === openSlug) ?? projects.find((p) => p.slug === openSlug) ?? null;
  const openIndex = openProject ? projects.findIndex((p) => p.slug === openProject.slug) : -1;
  const nextProject = openIndex >= 0 ? projects[(openIndex + 1) % projects.length] : null;

  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSlug(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openSlug]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="work" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            <span className="h-px w-8 bg-[color:var(--rule)]" />
            <span>004 / Projects</span>
          </div>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Selected Projects
          </h2>
          <p className="mt-4 max-w-xl text-base text-[color:var(--ink-muted)] sm:text-lg">
            A case-study sequence of AI products, dashboards, mobile apps and landing pages — each
            one designed and shipped end-to-end.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f)}
                className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${isActive
                    ? "border-[color:var(--ink)] text-[color:var(--paper)]"
                    : "border-[color:var(--rule)] text-[color:var(--ink-soft)] hover:border-[color:var(--ink)]/40 hover:text-[color:var(--ink)]"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-active"
                    className="absolute inset-0 -z-10 rounded-full bg-[color:var(--ink)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {f}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                reduce={!!reduce}
                onOpen={() => setOpenSlug(p.slug)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <CaseStudyModal
            key={openProject.slug}
            project={openProject}
            nextProject={nextProject}
            onClose={() => setOpenSlug(null)}
            onNext={() => nextProject && setOpenSlug(nextProject.slug)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function DeviceMockup({ project }: { project: Project }) {
  const { from, to, label, device, image } = project.cover;

  if (image) {
    return (
      <div className="relative w-full overflow-hidden bg-[color:var(--rule)]">
        <img src={image} alt={`${project.name} preview`} className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white/90 backdrop-blur">
          {project.category}
        </div>
        <div className="absolute right-5 top-5 font-display text-lg text-white/90 drop-shadow-md">{label}</div>
      </div>
    );
  }

  const bg = `linear-gradient(135deg, ${from}, ${to})`;
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />

      {device === "mobile" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[78%] w-[38%] max-w-[180px] rounded-[28px] border border-white/25 bg-white/10 p-2 shadow-2xl backdrop-blur transition-transform duration-500 group-hover:scale-[1.04]">
            <div className="absolute left-1/2 top-2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/40" />
            <div className="mt-5 h-full w-full rounded-[20px] bg-white/15">
              <div className="p-3">
                <div className="h-2 w-1/2 rounded bg-white/50" />
                <div className="mt-2 h-2 w-1/3 rounded bg-white/30" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded-lg bg-white/25" />
                  <div className="aspect-square rounded-lg bg-white/25" />
                  <div className="aspect-square rounded-lg bg-white/25" />
                  <div className="aspect-square rounded-lg bg-white/25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-end justify-center px-8 pb-6">
          <div className="relative w-full max-w-[88%] rounded-t-xl border border-white/25 bg-white/10 shadow-2xl backdrop-blur transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/50" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="ml-3 h-1.5 w-24 rounded bg-white/25" />
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/15 p-3">
              <div className="col-span-1 space-y-2">
                <div className="h-2 w-full rounded bg-white/25" />
                <div className="h-2 w-4/5 rounded bg-white/20" />
                <div className="h-2 w-3/5 rounded bg-white/20" />
                <div className="mt-3 h-14 rounded bg-white/15" />
              </div>
              <div className="col-span-2 grid grid-rows-2 gap-2">
                <div className="rounded bg-white/15 p-2">
                  <div className="h-1.5 w-1/3 rounded bg-white/40" />
                  <div className="mt-2 flex h-10 items-end gap-1">
                    {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-white/50"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded bg-white/15" />
                  <div className="rounded bg-white/20" />
                  <div className="rounded bg-white/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white/90 backdrop-blur">
        {project.category}
      </div>
      <div className="absolute right-5 top-5 font-display text-lg text-white/90">{label}</div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  reduce,
  onOpen,
}: {
  project: Project;
  index: number;
  reduce: boolean;
  onOpen: () => void;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const PlatformIcon = platformIcon[project.platform];
  return (
    <motion.article
      layout
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: reduce ? 0 : index * 0.06 }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-[color:var(--paper-elevated)] shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_40px_-30px_rgba(0,0,0,0.15)] transition-all duration-[400ms] hover:border-[color:var(--accent-primary)]/40 hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-25px_rgba(37,99,235,0.25)]"
    >
      {/* Cover */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${project.name} case study`}
        className="block w-full text-left"
      >
        <DeviceMockup project={project} />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
        <header>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
            <PlatformIcon className="h-3.5 w-3.5" />
            <span>{project.platform}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl tracking-tight sm:text-[28px]">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm text-[color:var(--ink-muted)]">{project.tagline}</p>
        </header>

        <p className="text-[15px] leading-relaxed text-[color:var(--ink-soft)]">
          {project.description}
        </p>

        {/* Tags */}
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)] px-2.5 py-1 text-[11.5px] text-[color:var(--ink-soft)]"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Meta */}
        <dl className="grid grid-cols-3 gap-3 border-t border-[color:var(--rule)] pt-5 text-sm">
          <div>
            <dt className="flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
              <User className="h-3 w-3" /> Role
            </dt>
            <dd className="mt-1.5 text-[13px] leading-snug text-[color:var(--ink-soft)]">
              {project.role}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
              <Clock className="h-3 w-3" /> Duration
            </dt>
            <dd className="mt-1.5 text-[13px] leading-snug text-[color:var(--ink-soft)]">
              {project.duration} · {project.year}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
              <Layers className="h-3 w-3" /> Tools
            </dt>
            <dd className="mt-1.5 text-[13px] leading-snug text-[color:var(--ink-soft)]">
              {project.tools.slice(0, 3).join(", ")}
              {project.tools.length > 3 ? "…" : ""}
            </dd>
          </div>
        </dl>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--ink)] px-4 py-2 text-xs font-medium text-[color:var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--accent-primary)]"
          >
            Case Study{" "}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          {project.links.prototype && (
            <a
              href={project.links.prototype}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--rule)] px-4 py-2 text-xs font-medium text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--ink)]/40 hover:text-[color:var(--ink)]"
            >
              Live Prototype <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function CaseStudyModal({
  project,
  nextProject,
  onClose,
  onNext,
}: {
  project: Project;
  nextProject: Project | null;
  onClose: () => void;
  onNext: () => void;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const sections: Array<{ k: string; v: string }> = [
    { k: "Overview", v: project.caseStudy.overview },
    { k: "Problem", v: project.caseStudy.problem },
    { k: "Research", v: project.caseStudy.research },
    { k: "Wireframes", v: project.caseStudy.wireframes },
    { k: "Design System", v: project.caseStudy.designSystem },
    { k: "High-Fidelity Screens", v: project.caseStudy.hifi },
    { k: "Prototype", v: project.caseStudy.prototype },
    { k: "Results", v: project.caseStudy.results },
  ];
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[color:var(--ink)]/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.4, ease }}
        className="relative my-8 w-full max-w-[1100px] overflow-hidden rounded-3xl border border-[color:var(--rule)] bg-[color:var(--paper)] shadow-2xl sm:my-16"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <DeviceMockup project={project} />
        </div>

        <div className="p-8 sm:p-12">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--rule)]" />
            <span>{project.platform}</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--rule)]" />
            <span>{project.year}</span>
          </div>
          <h3 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            {project.name}
          </h3>
          <p className="mt-3 max-w-2xl text-lg text-[color:var(--ink-muted)]">{project.tagline}</p>

          {/* Meta strip */}
          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-[color:var(--rule)] py-6 sm:grid-cols-4">
            <MetaCell label="Role" value={project.role} />
            <MetaCell label="Duration" value={project.duration} />
            <MetaCell label="Timeline" value={project.year} />
            <MetaCell label="Tools" value={project.tools.join(", ")} />
          </div>

          {/* Sections */}
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {sections.map((s) => (
              <section key={s.k}>
                <h4 className="font-display text-xl tracking-tight">{s.k}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">
                  {s.v}
                </p>
              </section>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.links.prototype && (
              <a
                href={project.links.prototype}
                className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-sm font-medium text-[color:var(--paper)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Live Prototype <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--rule)] px-5 py-2.5 text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:border-[color:var(--ink)]/40 hover:text-[color:var(--ink)]"
              >
                Full Case Study <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Next project */}
          {nextProject && (
            <button
              type="button"
              onClick={onNext}
              className="group mt-12 flex w-full items-center justify-between rounded-2xl border border-[color:var(--rule)] bg-[color:var(--paper-elevated)] p-6 text-left transition-all duration-300 hover:border-[color:var(--accent-primary)]/40"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                  Next Project
                </div>
                <div className="mt-1 font-display text-2xl tracking-tight">{nextProject.name}</div>
                <div className="mt-1 text-sm text-[color:var(--ink-muted)]">
                  {nextProject.tagline}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-[color:var(--ink-muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--ink)]" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
        {label}
      </div>
      <div className="mt-1.5 text-sm text-[color:var(--ink-soft)]">{value}</div>
    </div>
  );
}
