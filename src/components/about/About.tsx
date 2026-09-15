import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Languages, GraduationCap, Compass, CircleDot } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const infoCards = [
  {
    icon: MapPin,
    label: "Location",
    items: ["Nowshera, Pakistan"],
  },
  {
    icon: Languages,
    label: "Languages",
    items: ["English", "Urdu"],
  },
  {
    icon: GraduationCap,
    label: "Education",
    items: ["Master of Computer Science (MCS)"],
  },
  {
    icon: Compass,
    label: "Current Focus",
    items: ["AI Products", "Frontend Engineering", "UI/UX Design"],
  },
  {
    icon: CircleDot,
    label: "Availability",
    items: ["Freelance", "Full-Time", "Remote Projects"],
  },
];

export function About() {
  const reduce = useReducedMotion();
  const anim = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, ease, delay: 0.05 + i * 0.06 },
        };

  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div {...anim(0)} className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            001 / About
          </span>
          <div className="h-px flex-1 bg-rule" />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — 60% */}
          <div className="lg:col-span-7">
            <motion.h2
              {...anim(1)}
              className="font-display text-[40px] leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]"
            >
              About <span className="italic text-ink-soft">Me.</span>
            </motion.h2>

            <motion.div
              {...anim(2)}
              className="mt-8 space-y-5 text-[17px] leading-[1.7] text-ink-soft"
            >
              <p>
                I'm Afza Noor — an AI Engineer, UI/UX Designer and Frontend Developer based in
                Nowshera. I like sitting at the intersection of design and engineering, where
                intelligent systems meet interfaces that feel calm and considered.
              </p>
              <p>
                My work spans modern web development with React and Next.js, shaping clean UI in
                Figma, and integrating AI into real product flows. I care about clarity, honest
                typography and small interactions that make a product feel human.
              </p>
              <p className="text-ink-muted">
                Curiosity drives most of what I build. I'm continuously learning — new models, new
                patterns, better ways to solve real problems for real people.
              </p>
            </motion.div>
          </div>

          {/* Right — 40% */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {infoCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    {...anim(i + 2)}
                    className="group relative overflow-hidden rounded-2xl border border-rule bg-paper-elevated/70 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-ink/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rule bg-paper text-ink transition-colors group-hover:border-ink/30">
                        <Icon size={16} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                          {card.label}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[14px] leading-snug text-ink">
                          {card.items.map((item, idx) => (
                            <span key={item} className="flex items-center gap-2">
                              {item}
                              {idx < card.items.length - 1 && (
                                <span className="text-ink-muted">·</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
