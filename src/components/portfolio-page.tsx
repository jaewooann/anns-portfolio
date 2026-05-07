"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaJava } from "react-icons/fa6";
import { FiCheck, FiMail, FiSend } from "react-icons/fi";
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

const skillColorMap: Record<SkillIconKey, string> = {
  nextjs: "#111111",
  react: "#61dafb",
  reactnative: "#61dafb",
  typescript: "#3178c6",
  javascript: "#f7df1e",
  nestjs: "#e0234e",
  java: "#f89820",
  spring: "#6db33f",
  nodejs: "#68a063",
  mongodb: "#47a248",
  postgresql: "#4169e1",
  mysql: "#4479a1",
  docker: "#2496ed",
  git: "#f05032",
};

const identityCards: Record<
  Locale,
  Array<{ title: string; description: string }>
> = {
  en: [
    {
      title: "Product sense",
      description:
        "Turns ambiguous workflows into crisp product surfaces with copy and states close to real use.",
    },
    {
      title: "Frontend depth",
      description:
        "Builds responsive, motion-aware interfaces with disciplined typography and component states.",
    },
    {
      title: "AI fluency",
      description:
        "Designs agent-assisted operations and AI features where reliability matters more than spectacle.",
    },
  ],
  ko: [
    {
      title: "제품 감각",
      description:
        "모호한 워크플로를 실제 사용에 가까운 명확한 제품 화면과 상태로 정리합니다.",
    },
    {
      title: "프론트엔드 깊이",
      description:
        "타이포그래피, 컴포넌트 상태, 반응형 동작을 고려해 프로덕션 인터페이스를 구현합니다.",
    },
    {
      title: "AI 활용 역량",
      description:
        "화려함보다 신뢰성이 중요한 에이전트 기반 운영과 AI 기능에 관심을 두고 있습니다.",
    },
  ],
};

const journeyCopy: Record<
  Locale,
  Array<{ title: string; description: string }>
> = {
  en: [
    {
      title: "Known work first.",
      description:
        "The portfolio leads with verified project work and leaves room for stronger case-study evidence later.",
    },
    {
      title: "Operations over theatre.",
      description:
        "Interpreter Platform and Operations Admin are framed as practical product surfaces and workflows.",
    },
  ],
  ko: [
    {
      title: "확인된 작업부터.",
      description:
        "검증된 프로젝트를 먼저 보여주고, 추후 더 깊은 케이스 스터디로 확장할 수 있게 둡니다.",
    },
    {
      title: "보여주기보다 운영 도구.",
      description:
        "통역사 플랫폼과 운영 어드민을 실제 업무 흐름을 다루는 제품 화면으로 정리합니다.",
    },
  ],
};

function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`od-shell ${className}`.trim()}>{children}</div>;
}

function Header({
  locale,
  activeSection,
  onLocaleChange,
}: {
  locale: Locale;
  activeSection: SectionId;
  onLocaleChange: (locale: Locale) => void;
}) {
  const content = portfolioContent.en;

  return (
    <header className="od-topbar">
      <Shell className="od-nav">
        <a href="#home" className="od-mark" aria-label="Jaewoo Ann home">
          <span className="od-mark-dot" />
          <span>jaewoo.ann / portfolio</span>
        </a>

        <nav className="od-nav-links" aria-label="Primary navigation">
          {content.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="od-nav-actions">
          <div className="od-lang-toggle" aria-label="Language toggle">
            {localeOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                onClick={() => onLocaleChange(option.code)}
                className={locale === option.code ? "is-active" : ""}
              >
                {option.label}
              </button>
            ))}
          </div>
          <a href="#contact" className="od-button">
            Coffee chat
          </a>
        </div>
      </Shell>
    </header>
  );
}

function HeroSection({
  content,
}: {
  content: (typeof portfolioContent)[Locale];
}) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % content.hero.roles.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [content.hero.roles.length]);

  return (
    <section id="home" className="od-hero">
      <Shell className="od-hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="od-hero-copy"
        >
          <p className="od-eyebrow">AI-native product systems</p>
          <h1 className="od-hero-title">
            Jaewoo Ann builds
            <br />
            <span className="od-role-rotator">
              <AnimatePresence mode="wait">
                <motion.span
                  key={content.hero.roles[roleIndex]}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.36, ease: "circOut" }}
                >
                  {content.hero.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="od-lede">
            A technical product builder focused on clear interfaces, useful
            automation, and the operating systems behind AI-enabled teams.
          </p>
          <div className="od-hero-actions">
            <a href="#career" className="od-button">
              View journey
            </a>
            <a href="#skills" className="od-button od-button-secondary">
              Inspect stack
            </a>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}

function IntroSection({
  content,
  locale,
}: {
  content: (typeof portfolioContent)[Locale];
  locale: Locale;
}) {
  return (
    <section id="intro" className="od-section">
      <Shell>
        <div className="od-section-head">
          <div className="od-label">01 / identity</div>
          <div>
            <h2>{content.intro.title}</h2>
            <p className="od-section-copy od-section-copy-strong">
              {content.intro.description}
            </p>
          </div>
        </div>

        <div className="od-identity-grid">
          {identityCards[locale].map((card, index) => (
            <article key={card.title} className="od-identity-card">
              <span className="od-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Shell>
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
    <section id="skills" className="od-section">
      <Shell>
        <div className="od-section-head">
          <div className="od-label">02 / stack</div>
          <div>
            <h2>Large primitives, small surface area.</h2>
            <p className="od-section-copy">{content.tech.helper}</p>
          </div>
        </div>

        <div className="od-category-row">
          {categories.map((category, index) => (
            <button
              key={category.label}
              type="button"
              onClick={() => setActiveCategoryIndex(index)}
              className={index === activeCategoryIndex ? "is-active" : ""}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="od-stack-grid" aria-label="Technology stack">
          {activeCategory.skills.map((skill) => {
            const Icon = skillIconMap[skill.icon];
            const style = {
              "--tech-color": skillColorMap[skill.icon],
            } as React.CSSProperties;

            return (
              <article key={skill.name} className="od-tech-card" style={style}>
                <Icon className="od-tech-icon" />
                <div>
                  <b>{skill.name}</b>
                  <span>{activeCategory.label}</span>
                </div>
              </article>
            );
          })}
        </div>
      </Shell>
    </section>
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

function ProjectCard({
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
    <motion.article
      key={`${entry.company}-${project.name}`}
      initial={{ opacity: 0, y: 28, rotateX: 4, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: -22, rotateX: -3, scale: 0.98 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="od-project-card"
    >
      <div>
        <div className="od-project-top">
          <span className="od-chip">{entry.company}</span>
          <span className="od-chip">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>

      <div>
        <ul className="od-highlight-list">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="od-chip-row">
          {project.stack.map((item) => (
            <span key={item} className="od-chip">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function CareerJourneySection({
  content,
  locale,
}: {
  content: (typeof portfolioContent)[Locale];
  locale: Locale;
}) {
  const steps = flattenJourneySteps(content.journey.entries);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const lastWheelAtRef = useRef(0);
  const activeStep = steps[activeIndex] ?? steps[0];
  const progressWidth = `${((activeIndex + 1) / Math.max(steps.length, 1)) * 100}%`;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 980 || !sectionRef.current || steps.length <= 1) {
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
        if (now - lastWheelAtRef.current < 620) {
          return;
        }

        lastWheelAtRef.current = now;
        setActiveIndex((prev) =>
          direction > 0
            ? Math.min(steps.length - 1, prev + 1)
            : Math.max(0, prev - 1),
        );
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [steps.length]);

  if (!activeStep) {
    return null;
  }

  return (
    <>
      <section id="career" ref={sectionRef} className="od-journey od-journey-desktop">
        <Shell className="od-journey-layout">
          <div className="od-journey-stage">
            <div>
              <div className="od-label">03 / career journey</div>
              <h2>
                {content.journey.title}
                <br />
                {content.journey.accent}
              </h2>
              <p className="od-section-copy">{content.journey.entries[0]?.tagline}</p>
            </div>

            <div className="od-project-viewport" aria-live="polite">
              <AnimatePresence mode="wait">
                <ProjectCard
                  key={`${activeStep.entry.company}-${activeStep.project.name}`}
                  step={activeStep}
                  index={activeIndex}
                  total={steps.length}
                />
              </AnimatePresence>
            </div>

            <div className="od-journey-progress" aria-hidden="true">
              <i style={{ width: progressWidth }} />
            </div>
          </div>

          <div className="od-journey-copy">
            {steps.map((step, index) => {
              const copy = journeyCopy[locale][index] ?? {
                title: step.project.name,
                description: step.project.summary,
              };

              return (
                <button
                  key={`${step.entry.company}-${step.project.name}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`od-journey-step ${activeIndex === index ? "is-active" : ""}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{copy.title}</strong>
                  <small>{copy.description}</small>
                </button>
              );
            })}
          </div>
        </Shell>
      </section>

      <section className="od-section od-journey-mobile">
        <Shell>
          <div className="od-section-head">
            <div className="od-label">03 / career journey</div>
            <h2>
              {content.journey.title}
              <br />
              {content.journey.accent}
            </h2>
          </div>
          <div className="od-mobile-projects">
            {steps.map((step, index) => (
              <ProjectCard
                key={`${step.entry.company}-${step.project.name}`}
                step={step}
                index={index}
                total={steps.length}
              />
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
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
      window.setTimeout(() => setIsSubmitted(false), 2600);
    }, 650);
  };

  return (
    <section id="contact" className="od-contact">
      <Shell>
        <div className="od-contact-panel">
          <div className="od-contact-copy">
            <div>
              <div className="od-label">04 / coffee chat</div>
              <h2>
                {content.contact.title.line1}
                <br />
                {content.contact.title.line2}
              </h2>
              <p>{content.contact.description}</p>
            </div>

            <div className="od-link-grid">
              <button type="button" onClick={handleCopy} className="od-link-card">
                <span>{content.contact.emailLabel}</span>
                <b>{content.contact.email}</b>
                <small>{copied ? content.contact.copied : "Copy email"}</small>
              </button>
              {content.contact.socials.map((social) => {
                const Icon = social.icon === "github" ? SiGithub : FiMail;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                    className="od-link-card"
                  >
                    <span>{social.label}</span>
                    <b>
                      <Icon size={18} /> {social.label}
                    </b>
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="od-contact-form">
            <label>
              <span>{content.contact.form.nameLabel}</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                required
                placeholder={content.contact.form.namePlaceholder}
              />
            </label>
            <label>
              <span>{content.contact.form.emailLabel}</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                required
                placeholder={content.contact.form.emailPlaceholder}
              />
            </label>
            <label className="od-form-wide">
              <span>{content.contact.form.messageLabel}</span>
              <textarea
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                required
                placeholder={content.contact.form.messagePlaceholder}
              />
            </label>
            <button
              type="submit"
              disabled={isSending || isSubmitted}
              className="od-button od-contact-submit"
            >
              {isSending ? (
                content.contact.form.sending
              ) : isSubmitted ? (
                <>
                  <FiCheck size={18} /> {content.contact.form.success}
                </>
              ) : (
                <>
                  <FiSend size={17} /> {content.contact.form.submit}
                </>
              )}
            </button>
          </form>
        </div>
      </Shell>
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
    <main className="od-page">
      <Header
        locale={locale}
        activeSection={activeSection}
        onLocaleChange={setLocale}
      />
      <HeroSection content={sharedContent} />
      <IntroSection content={introContent} locale={locale} />
      <TechUniverseSection content={sharedContent} />
      <CareerJourneySection
        key={`career-${locale}`}
        content={localizedContent}
        locale={locale}
      />
      <ContactSection key={`contact-${locale}`} content={localizedContent} />
      <footer className="od-footer">
        <Shell className="od-footer-line">
          <span>© 2026 {sharedContent.hero.name}. Portfolio prototype.</span>
          <span>{sharedContent.footer}</span>
        </Shell>
      </footer>
    </main>
  );
}
