export type Locale = "ko" | "en";

export const defaultLocale: Locale = "en";

export const localeOptions: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
];

export const sectionIds = ["home", "intro", "skills", "career", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];

export type SkillIconKey =
  | "nextjs"
  | "react"
  | "reactnative"
  | "typescript"
  | "javascript"
  | "nestjs"
  | "java"
  | "spring"
  | "nodejs"
  | "mongodb"
  | "postgresql"
  | "mysql"
  | "docker"
  | "git";

export type TechSkill = {
  name: string;
  icon: SkillIconKey;
  iconClass: string;
};

export type TechCategory = {
  label: string;
  skills: TechSkill[];
};

export type JourneyProject = {
  name: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type JourneyEntry = {
  company: string;
  role: string;
  period: string;
  tagline: string;
  tone: string;
  projects: JourneyProject[];
};

export type ContactSocial = {
  label: string;
  href: string;
  icon: "github" | "mail";
};

type ContactContent = {
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  emailLabel: string;
  email: string;
  copied: string;
  socials: ContactSocial[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
  };
};

type PortfolioContent = {
  nav: Array<{ id: SectionId; label: string }>;
  hero: {
    name: string;
    roles: string[];
    scrollHint: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    accent: string;
    stack: string;
    description: string;
  };
  tech: {
    title: string;
    helper: string;
    coreLabel: string;
    coreValue: string;
    categories: TechCategory[];
  };
  journey: {
    title: string;
    accent: string;
    entries: JourneyEntry[];
  };
  contact: ContactContent;
  footer: string;
};

export const portfolioContent: Record<Locale, PortfolioContent> = {
  ko: {
    nav: [
      { id: "home", label: "Home" },
      { id: "intro", label: "Intro" },
      { id: "skills", label: "Skills" },
      { id: "career", label: "Career" },
      { id: "contact", label: "Contact" },
    ],
    hero: {
      name: "Jaewoo Ann",
      roles: ["AI Product Engineer", "Frontend Engineer", "AI Developer"],
      scrollHint: "Scroll Down",
    },
    intro: {
      eyebrow: "Who I am",
      title: "Frontend Developer",
      accent: "Based in Seoul.",
      stack: "Next.js · React · TypeScript",
      description:
        "React Native · Next.js로 3년간 프로덕션 웹·모바일 제품을 설계하고 출시해왔습니다.\nAI 네이티브 개발 및 워크플로우에 관심을 가지고 있습니다.",
    },
    tech: {
      title: "Tech Universe",
      helper: "Hover (or Tap) over the stars to explore.",
      coreLabel: "Core",
      coreValue: "Frontend Craft",
      categories: [
        {
          label: "Frontend",
          skills: [
            { name: "Next.js", icon: "nextjs", iconClass: "text-white" },
            { name: "React", icon: "react", iconClass: "text-blue-400" },
            { name: "TypeScript", icon: "typescript", iconClass: "text-blue-500" },
            { name: "JavaScript", icon: "javascript", iconClass: "text-yellow-400" },
            { name: "React Native", icon: "reactnative", iconClass: "text-violet-500" },
          ],
        },
        {
          label: "Backend",
          skills: [{ name: "Node.js", icon: "nodejs", iconClass: "text-green-500" }],
        },
        {
          label: "Database",
          skills: [
            { name: "PostgreSQL", icon: "postgresql", iconClass: "text-blue-300" },
            { name: "MySQL", icon: "mysql", iconClass: "text-blue-500" },
            { name: "MongoDB", icon: "mongodb", iconClass: "text-green-500" },
          ],
        },
        {
          label: "DevOps",
          skills: [
            { name: "Docker", icon: "docker", iconClass: "text-blue-500" },
            { name: "Git", icon: "git", iconClass: "text-orange-600" },
          ],
        },
      ],
    },
    journey: {
      title: "Career",
      accent: "Journey.",
      entries: [
        {
          company: "Ire Marketing",
          role: "Frontend Developer",
          period: "2025.07 - 2025.10",
          tagline: "통역사용 웹앱과 관리자용 어드민을 프론트엔드 중심으로 구축했습니다.",
          tone: "from-blue-500 to-cyan-400",
          projects: [
            {
              name: "통역사 플랫폼",
              summary: "통역사가 일정과 예약을 빠르게 확인하고 대응할 수 있는 웹앱 화면을 설계하고 구현했습니다.",
              highlights: [
                "예약 및 스케줄 확인 UI 설계",
                "상태 관리 흐름 정리",
                "모바일 우선 인터랙션 구성",
              ],
              stack: [
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Zustand",
                "TanStack Query",
                "Axios",
              ],
            },
            {
              name: "운영 어드민",
              summary: "관리자가 예약, 사용자 상태, 운영 데이터를 관리할 수 있는 어드민 화면을 설계하고 구현했습니다.",
              highlights: [
                "운영/관리용 대시보드 구성",
                "관리자 페이지 구현",
                "데이터 조회 흐름 최적화",
              ],
              stack: [
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Zustand",
                "TanStack Query",
                "Axios",
              ],
            },
          ],
        },
      ],
    },
    contact: {
      title: {
        line1: "이야기를",
        line2: "시작해볼까요.",
      },
      description: "새로운 프로젝트 이야기나 커피챗은 언제든 편하게 연락 주세요.",
      emailLabel: "이메일 주소",
      email: "wodndi0321@gmail.com",
      copied: "복사됨!",
      socials: [
        { label: "GitHub", href: "https://github.com/jaewooann", icon: "github" },
        { label: "Email", href: "mailto:wodndi0321@gmail.com", icon: "mail" },
      ],
      form: {
        nameLabel: "이름",
        namePlaceholder: "홍길동",
        emailLabel: "이메일",
        emailPlaceholder: "hello@example.com",
        messageLabel: "메시지",
        messagePlaceholder: "안녕하세요. 같이 이야기 나눠보고 싶습니다.",
        submit: "메시지 보내기",
        sending: "전송 중...",
        success: "전송 완료!",
      },
    },
    footer: "Built with Next.js, Geist, TailwindCSS and Framer Motion.",
  },
  en: {
    nav: [
      { id: "home", label: "Home" },
      { id: "intro", label: "Intro" },
      { id: "skills", label: "Skills" },
      { id: "career", label: "Career" },
      { id: "contact", label: "Contact" },
    ],
    hero: {
      name: "Jaewoo Ann",
      roles: ["AI Product Engineer", "Frontend Engineer", "AI Developer"],
      scrollHint: "Scroll Down",
    },
    intro: {
      eyebrow: "Who I am",
      title: "Frontend Developer",
      accent: "Based in Seoul.",
      stack: "Next.js · React · TypeScript",
      description:
        "For 3 years, I have designed and shipped production web and mobile products with React Native and Next.js.\nI am interested in AI-native development and workflow systems.",
    },
    tech: {
      title: "Tech Universe",
      helper: "Hover (or Tap) over the stars to explore.",
      coreLabel: "Core",
      coreValue: "Frontend Craft",
      categories: [
        {
          label: "Frontend",
          skills: [
            { name: "Next.js", icon: "nextjs", iconClass: "text-white" },
            { name: "React", icon: "react", iconClass: "text-blue-400" },
            { name: "TypeScript", icon: "typescript", iconClass: "text-blue-500" },
            { name: "JavaScript", icon: "javascript", iconClass: "text-yellow-400" },
            { name: "React Native", icon: "reactnative", iconClass: "text-violet-500" },
          ],
        },
        {
          label: "Backend",
          skills: [{ name: "Node.js", icon: "nodejs", iconClass: "text-green-500" }],
        },
        {
          label: "Database",
          skills: [
            { name: "PostgreSQL", icon: "postgresql", iconClass: "text-blue-300" },
            { name: "MySQL", icon: "mysql", iconClass: "text-blue-500" },
            { name: "MongoDB", icon: "mongodb", iconClass: "text-green-500" },
          ],
        },
        {
          label: "DevOps",
          skills: [
            { name: "Docker", icon: "docker", iconClass: "text-blue-500" },
            { name: "Git", icon: "git", iconClass: "text-orange-600" },
          ],
        },
      ],
    },
    journey: {
      title: "Career",
      accent: "Journey.",
      entries: [
        {
          company: "Ire Marketing",
          role: "Frontend Developer",
          period: "2025.07 - 2025.10",
          tagline: "Built the interpreter-facing web app and the admin experience around a single frontend flow.",
          tone: "from-blue-500 to-cyan-400",
          projects: [
            {
              name: "Interpreter Platform",
              summary: "Built the interpreter-facing web experience for schedules, reservations, and day-to-day task handling.",
              highlights: [
                "Reservation and schedule UI structure",
                "State flow cleanup",
                "Mobile-first interaction design",
              ],
              stack: [
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Zustand",
                "TanStack Query",
                "Axios",
              ],
            },
            {
              name: "Operations Admin",
              summary: "Built the admin experience for reservation control, user status management, and internal operation flows.",
              highlights: [
                "Operations dashboard structure",
                "Admin interface implementation",
                "Data lookup flow optimization",
              ],
              stack: [
                "Next.js",
                "TypeScript",
                "TailwindCSS",
                "Zustand",
                "TanStack Query",
                "Axios",
              ],
            },
          ],
        },
      ],
    },
    contact: {
      title: {
        line1: "Let's Start a",
        line2: "Conversation.",
      },
      description: "Always open for new projects and coffee chats.",
      emailLabel: "Email Address",
      email: "wodndi0321@gmail.com",
      copied: "Copied!",
      socials: [
        { label: "GitHub", href: "https://github.com/jaewooann", icon: "github" },
        { label: "Email", href: "mailto:wodndi0321@gmail.com", icon: "mail" },
      ],
      form: {
        nameLabel: "Your Name",
        namePlaceholder: "John Doe",
        emailLabel: "Your Email",
        emailPlaceholder: "john@example.com",
        messageLabel: "Message",
        messagePlaceholder: "Hello, I'd like to talk about...",
        submit: "Send Message",
        sending: "Transmitting...",
        success: "Signal Sent!",
      },
    },
    footer: "Built with Next.js, Geist, TailwindCSS and Framer Motion.",
  },
};
