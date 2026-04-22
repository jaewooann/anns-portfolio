"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  BriefcaseBusiness,
  Cpu,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaJava } from "react-icons/fa6";
import { FiCheck, FiCopy, FiMail, FiSend } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSpring,
  SiTypescript,
} from "react-icons/si";

import {
  defaultLocale,
  localeOptions,
  portfolioContent,
  sectionIds,
  type JourneyEntry,
  type JourneyProject,
  type Locale,
  type SectionId,
  type SkillIconKey,
} from "@/data/portfolio";

const iconBySection: Record<SectionId, typeof House> = {
  home: House,
  intro: UserRound,
  skills: Cpu,
  career: BriefcaseBusiness,
  contact: Mail,
};

const skillIconMap: Record<SkillIconKey, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  reactnative: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nestjs: SiNestjs,
  java: FaJava,
  spring: SiSpring,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  docker: SiDocker,
  git: SiGit,
};

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass-panel ${className}`.trim()}>{children}</div>;
}

function HeroSection({
  content,
}: {
  content: (typeof portfolioContent)[Locale];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % content.hero.roles.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [content.hero.roles]);

  const nameChars = Array.from(content.hero.name);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center px-4"
    >
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center">
        <div className="overflow-visible py-2">
          <h1 className="display-name">
            {nameChars.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0, y: 90, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.04 * index,
                  duration: 0.72,
                  ease: [0.175, 0.885, 0.32, 1.275],
                }}
                className="char inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="relative mt-5 min-h-[42px] overflow-visible sm:min-h-[62px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={content.hero.roles[roleIndex]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "circOut" }}
              className="hero-role"
            >
              {content.hero.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute left-1/2 top-[calc(100%+6rem)] flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/38"
        >
          <span className="scroll-mouse" aria-hidden="true">
            <span className="scroll-mouse__wheel" />
          </span>
          <span>{content.hero.scrollHint}</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function IntroSection({
  content,
}: {
  content: (typeof portfolioContent)[Locale];
}) {
  return (
    <section
      id="intro"
      className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32"
    >
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 132, opacity: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sky-400 to-transparent opacity-35"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="eyebrow">{content.intro.eyebrow}</p>
        <h2 className="section-title mt-7">
          {content.intro.title}
          <br />
          <span className="text-white/38">{content.intro.accent}</span>
        </h2>
        <p className="mt-8 text-lg font-medium text-white md:text-2xl">{content.intro.stack}</p>
        <p className="section-copy mx-auto mt-4 max-w-3xl whitespace-pre-line">
          {content.intro.description}
        </p>
      </motion.div>
    </section>
  );
}

function TechUniverseSection({
  content,
}: {
  content: (typeof portfolioContent)[Locale];
}) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const categories = content.tech.categories;
  const activeCategory = categories[activeCategoryIndex] ?? categories[0];

  return (
    <section id="skills" className="section-shell pt-32">
      <div className="text-center">
        <h2 className="tech-title">{content.tech.title}</h2>
        <p className="mt-5 text-base text-white/46">{content.tech.helper}</p>
      </div>

      <div className="tech-universe-shell">
        <div className="tech-universe-content">
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={category.label}
                type="button"
                onClick={() => setActiveCategoryIndex(index)}
                className={`category-pill ${
                  index === activeCategoryIndex
                    ? "border-white/40 bg-white/10 text-white shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                    : "border-white/6 text-white/38 hover:border-white/12 hover:text-white/72"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="tech-skill-strip">
            {activeCategory.skills.map((skill) => {
              const Icon = skillIconMap[skill.icon];

              return (
                <div key={skill.name} className="tech-skill-orb">
                  <Icon className={`tech-skill-orb__icon ${skill.iconClass}`} />
                  <span className="tech-skill-orb__name">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyEntryPanel({ entry }: { entry: JourneyEntry }) {
  return (
    <Panel className="journey-panel h-full p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">{entry.period}</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {entry.company}
          </h3>
          <p className="mt-2 text-base text-white/54">{entry.role}</p>
        </div>
        <div
          className={`h-14 w-14 rounded-full bg-gradient-to-br ${entry.tone} opacity-90 blur-[1px]`}
        />
      </div>

      <p className="mt-8 max-w-xl text-lg leading-8 text-white/66">{entry.tagline}</p>

      <div className="mt-8 space-y-5">
        {entry.projects.map((project) => (
          <div key={project.name} className="journey-project">
            <h4 className="text-xl font-semibold tracking-tight text-white">{project.name}</h4>
            <p className="mt-3 text-sm leading-7 text-white/64">{project.summary}</p>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/68">
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${entry.tone}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="chip chip--muted">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

type JourneyProjectStep = {
  entry: JourneyEntry;
  project: JourneyProject;
};

function flattenJourneySteps(entries: JourneyEntry[]): JourneyProjectStep[] {
  return entries.flatMap((entry) =>
    entry.projects.map((project) => ({
      entry,
      project,
    })),
  );
}

function JourneyProjectSpotlight({
  step,
  index,
  total,
}: {
  step: JourneyProjectStep;
  index: number;
  total: number;
}) {
  const { entry, project } = step;

  return (
    <Panel className="journey-panel journey-panel--spotlight h-full p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">{entry.period}</p>
          <p className="mt-3 text-sm font-medium text-white/58">{entry.company}</p>
        </div>
        <span className="journey-step-badge">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-3xl font-semibold tracking-tight text-white">{project.name}</h3>
        <p className="mt-3 text-base text-white/52">{entry.role}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{project.summary}</p>
      </div>

      <ul className="mt-8 space-y-3">
        {project.highlights.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-white/68">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${entry.tone}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="chip chip--muted">
            {item}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function SingleCareerJourneySection({
  content,
  entry,
}: {
  content: (typeof portfolioContent)[Locale];
  entry: JourneyEntry;
}) {
  return (
    <section id="career" className="section-shell pt-32">
      <div className="text-center">
        <h2 className="journey-title text-[clamp(2.6rem,6vw,5.5rem)]">
          {content.journey.title}
          <br />
          <span className={`bg-gradient-to-r ${entry.tone} bg-clip-text text-transparent`}>
            {content.journey.accent}
          </span>
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="mt-14"
      >
        <JourneyEntryPanel entry={entry} />
      </motion.div>
    </section>
  );
}

function MultiCareerJourneySection({
  content,
  entries,
}: {
  content: (typeof portfolioContent)[Locale];
  entries: JourneyEntry[];
}) {
  const steps = flattenJourneySteps(entries);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const activeStep = steps[activeIndex] ?? steps[0]!;
  const activeEntry = activeStep?.entry ?? entries[0];
  const activeProject = activeStep.project;
  const progressScale = steps.length <= 1 ? 1 : (activeIndex + 1) / steps.length;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024 || !sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const isPinnedZone = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

      if (!isPinnedZone) {
        return;
      }

      const direction = Math.sign(event.deltaY);
      if (!direction) {
        return;
      }

      const currentIndex = activeIndexRef.current;
      const canGoNext = currentIndex < steps.length - 1;
      const canGoPrev = currentIndex > 0;

      if ((direction > 0 && canGoNext) || (direction < 0 && canGoPrev)) {
        event.preventDefault();

        const now = Date.now();
        if (now - lastWheelAtRef.current < 650) {
          return;
        }

        lastWheelAtRef.current = now;
        setActiveIndex((prev) => {
          if (direction > 0) {
            return Math.min(steps.length - 1, prev + 1);
          }

          return Math.max(0, prev - 1);
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [steps.length]);

  return (
    <>
      <section
        id="career"
        ref={sectionRef}
        className="relative hidden lg:block"
        style={{ minHeight: "100vh" }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto flex w-full max-w-7xl gap-10 px-6">
            <div className="flex w-[38%] flex-col justify-center">
              <h2 className="journey-title">
                {content.journey.title}
                <br />
                <span
                  className={`bg-gradient-to-r ${activeEntry.tone} bg-clip-text text-transparent`}
                >
                  {content.journey.accent}
                </span>
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeEntry.company}-${activeProject.name}-${activeIndex}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8 max-w-md"
                >
                  <p className="text-sm uppercase tracking-[0.26em] text-white/38">
                    {activeEntry.period}
                  </p>
                  <p className="mt-4 text-2xl font-medium tracking-tight text-white">
                    {activeEntry.company}
                  </p>
                  <p className="mt-2 text-base text-white/54">{activeEntry.role}</p>
                  <p className="mt-6 text-3xl font-semibold tracking-tight text-white">
                    {activeProject.name}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
                    {activeProject.summary}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="journey-project-nav mt-8">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={`${step.entry.company}-${step.project.name}`}
                      className={`journey-project-nav__item ${
                        isActive ? "is-active" : ""
                      }`}
                    >
                      <span className="journey-project-nav__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{step.project.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex w-[62%] items-center">
              <div className="absolute left-5 top-0 h-full w-px bg-white/6" />
              <motion.div
                style={{ scaleY: progressScale }}
                className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-sky-500 via-cyan-400 to-emerald-400"
              />
              <div className="relative ml-14 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeEntry.company}-${activeStep.project.name}`}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -26 }}
                    transition={{ duration: 0.45 }}
                  >
                    <JourneyProjectSpotlight
                      step={activeStep}
                      index={activeIndex}
                      total={steps.length}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-32 lg:hidden">
        <div className="text-center">
          <h2 className="journey-title text-4xl">
            {content.journey.title}
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              {content.journey.accent}
            </span>
          </h2>
        </div>

        <div className="mt-12 space-y-5">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.company}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <JourneyEntryPanel entry={entry} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

function CareerJourneySection({
  content,
}: {
  content: (typeof portfolioContent)[Locale];
}) {
  const entries = content.journey.entries;
  const entry = entries[0];
  const projectCount = entries.reduce((count, item) => count + item.projects.length, 0);

  if (!entry) {
    return null;
  }

  if (projectCount <= 1) {
    return <SingleCareerJourneySection content={content} entry={entry} />;
  }

  return <MultiCareerJourneySection content={content} entries={entries} />;
}

function ContactSection({
  content,
}: {
  content: (typeof portfolioContent)[Locale];
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    window.setTimeout(() => {
      const subject = encodeURIComponent(`[Portfolio] ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      );

      window.location.href = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
      setIsSending(false);
      setIsSubmitted(true);
      setForm({ name: "", email: "", message: "" });

      window.setTimeout(() => setIsSubmitted(false), 2800);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20"
    >
      <div className="grid w-full grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div>
            <h2 className="contact-title">
              {content.contact.title.line1}
              <br />
              {content.contact.title.line2}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/62">
              {content.contact.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="group relative inline-flex w-full max-w-xl cursor-pointer items-center gap-4 rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 pr-14 text-left backdrop-blur-md transition-all duration-300 hover:border-sky-400/50 hover:bg-white/[0.07]"
          >
            <div className="rounded-full bg-sky-500/20 p-3 text-sky-300 transition-colors group-hover:bg-sky-500 group-hover:text-white">
              <FiMail size={24} />
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-white/42">
                {content.contact.emailLabel}
              </span>
              <span className="text-lg font-mono text-white">{content.contact.email}</span>
            </div>

            <div className="absolute right-5 text-white/42 transition-colors group-hover:text-white">
              {copied ? <FiCheck size={20} className="text-green-400" /> : <FiCopy size={20} />}
            </div>

            {copied ? (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-green-500 px-2 py-1 text-xs font-bold text-black"
              >
                {content.contact.copied}
              </motion.span>
            ) : null}
          </button>

          <div className="flex gap-6">
            {content.contact.socials.map((social) => {
              const Icon = social.icon === "github" ? SiGithub : FiMail;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="contact-social"
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="contact-form-shell lg:ml-auto">
            <div className="contact-form-glow" />

            <div className="relative z-10 space-y-6">
              <div className="contact-form-grid">
                <div className="contact-field">
                  <label className="contact-label">{content.contact.form.nameLabel}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    required
                    className="contact-input"
                    placeholder={content.contact.form.namePlaceholder}
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label">{content.contact.form.emailLabel}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    required
                    className="contact-input"
                    placeholder={content.contact.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label">{content.contact.form.messageLabel}</label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  required
                  className="contact-input resize-none"
                  placeholder={content.contact.form.messagePlaceholder}
                />
              </div>

              <div className="contact-form-footer">
                <button
                  type="submit"
                  disabled={isSending || isSubmitted}
                  className={`contact-submit ${
                    isSubmitted ? "bg-green-500 text-black" : ""
                  }`}
                >
                  {isSending ? (
                    <span className="animate-pulse">{content.contact.form.sending}</span>
                  ) : isSubmitted ? (
                    <>
                      <FiCheck size={20} /> {content.contact.form.success}
                    </>
                  ) : (
                    <>
                      <FiSend size={18} /> {content.contact.form.submit}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const sharedContent = portfolioContent.en;
  const localizedContent = useMemo(() => portfolioContent[locale], [locale]);
  const introContent =
    locale === "ko"
      ? {
          ...sharedContent,
          intro: {
            ...sharedContent.intro,
            description: localizedContent.intro.description,
          },
        }
      : sharedContent;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const next = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (next) {
          setActiveSection(next.target.id as SectionId);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-sky-500/30">
      <div className="pointer-events-none fixed inset-0">
        <div className="aurora-layer absolute inset-0 opacity-40" />
        <div className="noise-layer absolute inset-0 opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      <div className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md md:right-6 md:top-6">
        {localeOptions.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => setLocale(option.code)}
            className={`relative rounded-full px-3 py-1.5 text-xs font-bold tracking-wider transition-all duration-300 ${
              locale === option.code ? "text-white" : "text-white/34 hover:text-white/74"
            }`}
          >
            {locale === option.code ? (
              <motion.span
                layoutId="locale-bg"
                className="absolute inset-0 rounded-full border border-white/20 bg-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none fixed right-4 top-1/2 z-[999] hidden -translate-y-1/2 flex-col gap-5 lg:flex">
        {sharedContent.nav.map((item) => {
          const Icon = iconBySection[item.id];
          const isActive = activeSection === item.id;

          return (
            <div key={item.id} className="group pointer-events-auto relative flex items-center justify-center">
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`nav-orb ${
                  isActive
                    ? "border-sky-400/80 bg-black/60 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                    : "border-white/10 bg-black/30 text-white"
                }`}
                aria-label={item.label}
              >
                <Icon size={16} />
                <span className="absolute right-full mr-4 whitespace-nowrap rounded border border-white/10 bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </button>
              {isActive ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="absolute left-full ml-3 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 pb-28">
        <HeroSection content={sharedContent} />
        <div className="h-[14vh]" />
        <IntroSection content={introContent} />
        <div className="h-[16vh]" />
        <TechUniverseSection content={sharedContent} />
        <div className="h-[18vh]" />
        <CareerJourneySection key={`career-${locale}`} content={localizedContent} />
        <div className="h-[18vh]" />
        <ContactSection key={`contact-${locale}`} content={localizedContent} />

        <footer className="border-t border-white/5 py-10 text-center text-sm text-white/34">
          <p>
            © 2026 {sharedContent.hero.name}. {sharedContent.footer}
          </p>
        </footer>
      </div>
    </main>
  );
}
