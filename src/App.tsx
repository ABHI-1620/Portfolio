import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Award,
  CalendarDays,
  Check,
  Cloud,
  Code2,
  Database,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Menu,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";

type Project = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  stack: string[];
  challenge: string;
  approach: string;
  impact: string;
  note: string;
  steps: string[];
  link?: string;
  github?: string;
};

const projects: Project[] = [
  {
    slug: "xdr-lateral-movement",
    number: "01",
    title: "XDR Lateral Movement Detection & Containment",
    kicker: "Enterprise Threat Intelligence & Automated Containment",
    year: "2026",
    role: "Full-Stack Engineering · Threat Detection Research",
    summary: "An enterprise Extended Detection and Response (XDR) platform designed to identify, trace, and isolate lateral movement attacks across distributed network infrastructure.",
    github: "https://github.com/ABHI-1620/Lateral-Movement-Detection-and-Prevention",
    tags: ["XDR", "Machine Learning", "MITRE ATT&CK"],
    stack: ["Python", "FastAPI", "MITRE ATT&CK", "Machine Learning", "Graph Correlation"],
    challenge: "Lateral movement attacks exploit valid credentials and legitimate administrative protocols, making host-to-host pivot activity difficult to identify without unified, multi-source telemetry correlation.",
    approach: "Architected a dual-engine detection workflow combining 40+ YAML-configurable rules mapped to MITRE ATT&CK with an Isolation Forest anomaly model. Implemented temporal graph correlation for host-to-identity context and automated host isolation with a 60-minute TTL rollback mechanism.",
    impact: "Achieved over 94% detection precision with sub-5% false positive rates in validation, supporting real-time alerts, live incident triage, and automated threat containment.",
    note: "Effective security tooling goes beyond generating alerts—it provides actionable clarity for rapid incident response.",
    steps: ["Correlate Multi-Source Telemetry", "Map Attacks to MITRE ATT&CK", "Automate Policy-Driven Containment"],
  },
  {
    slug: "zera",
    number: "02",
    title: "ZERA: Zero Trust Telemetry Platform",
    kicker: "AI-Driven Endpoint Posture & Dynamic Risk Scoring",
    year: "2025",
    role: "AI Engineering · Security Architecture",
    summary: "A modular Zero Trust evaluation engine that processes continuous endpoint telemetry into explainable, risk-aware access decisions.",
    github: "https://github.com/ABHI-1620/ZERA-Chatbot",
    tags: ["Zero Trust", "LangGraph", "FastAPI"],
    stack: ["Python", "FastAPI", "LangGraph", "OpenTelemetry"],
    challenge: "Static perimeter security models fail to evaluate dynamic device health, anomalous process behaviors, and privilege escalation occurring after initial authentication.",
    approach: "Built a multi-agent analytical system with LangGraph and LLMs, integrated with OpenTelemetry collectors for real-time monitoring of process execution, persistence mechanisms, and network communication.",
    impact: "Produces explainable risk assessments with direct MITRE ATT&CK mapping, enabling adaptive, policy-driven access controls backed by verifiable telemetry.",
    note: "Zero Trust is most resilient when access decisions continuously adapt to real-time risk signals.",
    steps: ["Continuously Monitor Posture", "Explain Risk Scoring", "Automate Adaptive Policies"],
  },
  {
    slug: "port-scanner",
    number: "03",
    title: "Advanced Network Reconnaissance Scanner",
    kicker: "High-Throughput Port Auditing & Attack Surface Analysis",
    year: "2025",
    role: "Systems Tooling · Network Engineering",
    summary: "A high-performance Python toolkit for scanning target hosts, analyzing port exposure, assessing firewall behavior, and generating structured intelligence reports.",
    github: "https://github.com/ABHI-1620/Port-Scanner",
    tags: ["Python", "Network Security", "CLI Tooling"],
    stack: ["Python", "Socket Programming", "Scapy", "IPWhois", "Pandas", "CSV / JSON"],
    challenge: "Network security assessments require fast, reliable host profiling and firewall state identification without generating unstructured, difficult-to-analyze outputs.",
    approach: "Engineered multi-threaded scanning modes (TCP Connect, SYN, UDP) with service fingerprinting, IP geolocation, firewall state inference, and automated export pipelines (CSV, JSON, Tabular).",
    impact: "Provides security engineers with a repeatable, scriptable reconnaissance pipeline for discovering exposed services and evaluating perimeter defenses.",
    note: "Reconnaissance delivers the greatest value when raw data is transformed into structured, actionable intelligence.",
    steps: ["High-Throughput Socket Probing", "Service & Firewall Analysis", "Structured Intelligence Export"],
  },
  {
    slug: "ddos-detection",
    number: "04",
    title: "Real-Time SDN DDoS Detection Engine",
    kicker: "Supervised ML Classification for Software-Defined Networks",
    year: "2024",
    role: "Machine Learning · Network Traffic Analysis",
    summary: "A real-time traffic classification pipeline leveraging supervised machine learning to detect and mitigate DDoS attacks in Software-Defined Networks (SDN).",
    github: "https://github.com/ABHI-1620/DDoS-Attack",
    tags: ["SDN", "Machine Learning", "Real-Time Systems"],
    stack: ["Python", "SVM", "Random Forest", "XGBoost", "Scikit-Learn"],
    challenge: "Volumetric and distributed attack flows often disguise themselves within normal traffic variations, requiring high-throughput classification with near-zero latency overhead.",
    approach: "Trained and optimized multiple machine learning models (SVM, Random Forest, XGBoost) on the benchmark CIC-IDS 2017 dataset utilizing SMOTE balancing, integrated with a live packet flow inference pipeline.",
    impact: "Attained 100% accuracy on validation baselines, enabling real-time packet flow classification and rapid flow-rule intervention on SDN controllers.",
    note: "High-speed network defense depends on accurately isolating subtle statistical anomalies before service degradation occurs.",
    steps: ["Balance Class Distributions", "Evaluate Multi-Model Baselines", "Streamline Low-Latency Inference"],
  },
  {
    slug: "weather-forecast",
    number: "05",
    title: "Live Weather Analytics Dashboard",
    kicker: "Responsive Meteorological Interface & Geolocation Dashboard",
    year: "2024",
    role: "Frontend Engineering · API Integration",
    summary: "A responsive weather analytics web application delivering real-time atmospheric metrics and multi-day local forecasts with instant responsiveness.",
    github: "https://github.com/ABHI-1620/weather_forecast",
    tags: ["React", "REST APIs", "Responsive UI"],
    stack: ["ReactJS", "OpenWeatherMap API", "JavaScript (ES6+)", "Responsive UI"],
    challenge: "Presenting multi-dimensional meteorological data clearly across devices while handling geolocation state, external API caching, and dynamic unit conversions seamlessly.",
    approach: "Engineered a responsive React interface with dynamic condition-based styling, geolocation fallback handling, unit toggling (Celsius/Fahrenheit), and structured metric cards.",
    impact: "Provides real-time visibility into temperature, humidity, wind velocity, and atmospheric pressure with fast load times and clean cross-device usability.",
    note: "A thoughtful interface makes real-time data intuitive and effortless to interpret.",
    steps: ["Prioritize Data Hierarchy", "Handle Asynchronous State", "Optimize for Mobile Responsiveness"],
  },
  {
    slug: "club-website",
    number: "06",
    title: "FACT Amrita Community Web Platform",
    kicker: "Public-Facing Frontend Engineering & Digital Hub",
    year: "Academic",
    role: "Frontend Development · UI/UX Design",
    summary: "The official public-facing web platform for FACT Amrita, engineered with modern frontend standards, dynamic galleries, and optimized CDN asset delivery.",
    link: "https://www.factamrita.in/",
    tags: ["React", "Tailwind CSS", "Community Platform"],
    stack: ["ReactJS", "Tailwind CSS", "JavaScript (ES6+)", "CSS3", "ImageKit CDN"],
    challenge: "Creating an engaging, high-performance community portal that organizes events, team rosters, and announcements with rapid page loads across mobile and desktop devices.",
    approach: "Architected a responsive frontend with React and Tailwind CSS, featuring category-filtered event showcases, executive leadership carousels, and ImageKit CDN integration for compressed media delivery.",
    impact: "Delivered a modern digital presence that streamlined community engagement, achieved strong Core Web Vitals, and enhanced accessibility for student members.",
    note: "A well-designed web experience connects a community's vision directly with its audience.",
    steps: ["Establish Clear Visual Hierarchy", "Streamline Media Loading", "Ensure Responsive Accessibility"],
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`}>{children}</div>;
}

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "Java", "TypeScript", "JavaScript (ES6+)", "SQL"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS (CLF-C02 Certified)", "Linux", "Git", "GitHub", "OpenTelemetry"],
  },
  {
    title: "Frontend Engineering",
    icon: Globe,
    skills: ["TypeScript", "ReactJS", "Tailwind CSS", "Vite", "HTML5", "CSS3 / Responsive UI"],
  },
  {
    title: "Backend & Systems",
    icon: Terminal,
    skills: ["FastAPI", "Node.js", "RESTful APIs", "Socket Programming"],
  },
  {
    title: "Cybersecurity & Networking",
    icon: ShieldCheck,
    skills: ["Zero Trust Architecture", "XDR Detection", "MITRE ATT&CK", "Burp Suite", "Wireshark", "Scapy"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB"],
  },
];

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services (AWS)",
    year: "2025",
    description: "Official Amazon Web Services credential validating comprehensive foundational knowledge of cloud concepts, security and compliance, core AWS services, architecture principles, and cloud economics.",
    tags: ["AWS", "Cloud Architecture", "Cloud Security", "Infrastructure"],
    badge: "Certified",
  },
];

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
      if (saved) return saved;
      return "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      data-testid="button-theme-toggle"
      className={`group relative flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-all duration-300 hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] hover:scale-105 active:scale-95 ${className}`}
    >
      {theme === "light" ? (
        <Moon size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:-rotate-12" />
      ) : (
        <Sun size={15} strokeWidth={1.8} className="text-yellow-400 transition-transform duration-300 group-hover:rotate-45" />
      )}
    </button>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setMenuOpen(false), [location]);
  return (
    <header className="site-header relative z-20 border-b border-[hsl(var(--foreground)/.14)]">
      <div className="page-wrap flex h-[68px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" data-testid="link-home">
          <span className="brand-mark flex h-7 w-7 items-center justify-center rounded-md text-[10.5px] font-semibold tracking-wider">VA</span>
          <span className="font-sans text-sm font-medium tracking-tight text-[hsl(var(--foreground))] transition-colors group-hover:text-[hsl(var(--accent))]">Vakada Abhiram</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          <a href="/#work" className="eyebrow transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-work">Selected work</a>
          <a href="/#skills" className="eyebrow transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-skills">Skills</a>
          <a href="/#certifications" className="eyebrow transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-certifications">Certifications</a>
          <a href="/#about" className="eyebrow transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-about">About</a>
          <a href="/#contact" className="eyebrow transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-contact">Contact</a>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" className="flex h-9 w-9 items-center justify-center" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--background))] px-5 py-3 md:hidden" data-testid="mobile-menu">
          <nav className="flex flex-col gap-2 font-sans" aria-label="Mobile navigation">
            <a href="/#work" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.08)] pb-2 font-sans text-sm font-normal text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]" data-testid="mobile-link-work">
              <span>Selected work</span> <ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground))]" />
            </a>
            <a href="/#skills" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.08)] pb-2 font-sans text-sm font-normal text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]" data-testid="mobile-link-skills">
              <span>Skills</span> <ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground))]" />
            </a>
            <a href="/#certifications" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.08)] pb-2 font-sans text-sm font-normal text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]" data-testid="mobile-link-certifications">
              <span>Certifications</span> <ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground))]" />
            </a>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.08)] pb-2 font-sans text-sm font-normal text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]" data-testid="mobile-link-about">
              <span>About</span> <ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground))]" />
            </a>
            <a href="/#contact" onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.08)] pb-2 font-sans text-sm font-normal text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]" data-testid="mobile-link-contact">
              <span>Contact</span> <ArrowUpRight size={14} className="text-[hsl(var(--muted-foreground))]" />
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-between pt-1 font-sans text-sm font-normal text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--accent))]"
              data-testid="mobile-theme-toggle"
            >
              <span>Theme</span>
              <span className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                {theme === "light" ? <Moon size={13} /> : <Sun size={13} className="text-yellow-400" />}
                {theme === "light" ? "Switch to Dark" : "Switch to Light"}
              </span>
            </button>
          </nav>
        </div>
      )}
      {notice && (
        <div className="absolute right-5 top-[80px] z-30 max-w-[260px] border border-[hsl(var(--foreground)/.24)] bg-[hsl(var(--secondary))] p-3 text-xs shadow-[4px_4px_0_hsl(var(--foreground))]" role="status" data-testid="status-future-link">
          <p>{notice}</p>
          <button type="button" className="mt-2 eyebrow underline underline-offset-4" onClick={() => setNotice("")} data-testid="button-dismiss-notice">Got it</button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer-grid mt-10 border-t border-transparent bg-[#17221b] text-[#f4efe6] dark:border-[hsl(var(--border))] dark:bg-[#111a16] md:mt-14">
      <div className="page-wrap py-8 md:py-12">
        <div className="grid gap-6 md:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="eyebrow text-[hsl(var(--secondary))]">Open to the right problem</p>
            <h2 className="display-font mt-3 max-w-[550px] text-2xl leading-tight tracking-[-.03em] text-[#f4efe6] md:text-4xl">Let’s make the next system easier to trust.</h2>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <a href="mailto:vakada1608@gmail.com" className="inline-flex items-center gap-2.5 border-b border-[hsl(var(--secondary))] pb-1 text-sm text-[hsl(var(--secondary))] transition-transform hover:translate-x-1" data-testid="link-email">
                vakada1608@gmail.com <ArrowUpRight size={15} className="link-arrow" />
              </a>
              <a href="tel:+917569055798" className="inline-flex items-center gap-2 text-sm text-[#f4efe6]/85 transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-phone">
                <Phone size={14} className="text-[hsl(var(--secondary))]" /> +91 75690 55798
              </a>
            </div>
          </div>
          <div className="md:justify-self-end">
            <p className="eyebrow text-[#f4efe6]/60">Find me here</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <a href="https://github.com/ABHI-1620" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#f4efe6]/75 transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-github">
                <Github size={14} strokeWidth={1.5} /><span>GitHub</span><ArrowUpRight size={12} />
              </a>
              <a href="https://www.linkedin.com/in/vakada-abhiram" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#f4efe6]/75 transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-linkedin">
                <Linkedin size={14} strokeWidth={1.5} /><span>LinkedIn</span><ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-[#f4efe6]/18 pt-4 text-[11px] text-[#f4efe6]/50 sm:flex-row">
           <span>© {new Date().getFullYear()} Vakada Abhiram</span><span className="mono-font">made for curious people</span>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const featured = useMemo(() => [...projects].sort((a, b) => {
    const yearA = Number.parseInt(a.year, 10);
    const yearB = Number.parseInt(b.year, 10);
    if (Number.isNaN(yearA)) return Number.isNaN(yearB) ? 0 : 1;
    if (Number.isNaN(yearB)) return -1;
    return yearB - yearA;
  }), []);
  return (
    <div>
      <main>
        <section className="hero-section page-wrap relative py-8 md:py-12" data-testid="section-hero">
          <div className="absolute right-0 top-8 hidden w-[30%] max-w-[260px] md:block">
            <div className="rule" />
            <p className="mono-font mt-2 text-[10px] leading-relaxed text-[hsl(var(--muted-foreground))]">FULL-STACK &amp; CLOUD SYSTEMS<br />CYBERSECURITY &amp; ML DETECTION<br />SCALABLE · RELIABLE · SECURE</p>
          </div>
          <Reveal>
            <p className="eyebrow text-[hsl(var(--accent))]" data-testid="text-hero-kicker">Software Engineer · Full-Stack · Frontend · Cybersecurity</p>
          </Reveal>
          <Reveal delay={1}>
             <h1 className="display-font hero-title mt-3 max-w-[750px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[.9] tracking-[-.05em]" data-testid="text-hero-title">I build systems<br /><em className="ml-[.18em] text-[hsl(var(--accent))]">people can</em><br />trust.</h1>
          </Reveal>
           <Reveal delay={2} className="mt-5 flex max-w-[580px] flex-col gap-5 md:ml-[18%] md:flex-row md:items-end">
              <p className="max-w-[360px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]" data-testid="text-hero-summary">I am Vakada Abhiram, a Computer Science &amp; Engineering graduate (2026) from Amrita School of Computing, Amrita Vishwa Vidyapeetham. I specialize in developing high-performance full-stack web applications, cloud infrastructure, and security intelligence tools.</p>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a href="/#work" className="button-primary group inline-flex items-center gap-1.5 text-xs font-medium" data-testid="link-hero-work">Explore Selected Work <ArrowUpRight size={14} className="link-arrow" /></a>
            </div>
          </Reveal>
        </section>

        <section id="work" className="work-section border-y border-transparent bg-[#17221b] py-10 text-[#f4efe6] dark:border-[hsl(var(--border))] dark:bg-[#111a16] md:py-14" data-testid="section-work">
             <div className="page-wrap">
             <Reveal><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow text-[hsl(var(--secondary))]">Featured Projects / {String(featured.length).padStart(2, "0")} Selected Works</p><h2 className="display-font mt-2 text-2xl leading-none tracking-[-.03em] text-[#f4efe6] md:text-4xl" data-testid="text-work-heading">Systems engineered<br /><em className="text-[hsl(var(--accent))]">to hold up.</em></h2></div><p className="max-w-[260px] text-[11px] leading-relaxed text-[#f4efe6]/65">A curated collection of full-stack platforms, machine learning detection pipelines, and modern web applications.</p></div></Reveal>
             <div className="mt-6 grid gap-1.5 md:mt-8">
              {featured.map((project, index) => (
                <Reveal key={project.slug} delay={(index % 3) + 1}>
                   <Link href={`/work/${project.slug}`} className="project-row group grid gap-1 border-t border-[#f4efe6]/20 py-3 md:grid-cols-[50px_1.1fr_1fr_130px] md:items-center md:gap-4 md:py-4" data-testid={`link-project-${project.slug}`}>
                     <span className="mono-font text-[11px] text-[hsl(var(--secondary))]" data-testid={`text-project-number-${project.slug}`}>{project.number}</span>
                     <div><h3 className="display-font text-lg leading-none tracking-[-.02em] text-[#f4efe6] transition-colors group-hover:text-[hsl(var(--secondary))] md:text-xl" data-testid={`text-project-title-${project.slug}`}>{project.title}</h3><p className="mt-1 text-[11px] text-[#f4efe6]/60">{project.kicker}</p></div>
                     <div className="mt-1.5 max-w-[400px] md:mt-0"><p className="text-[11px] leading-relaxed text-[#f4efe6]/75">{project.summary}</p><div className="mt-1.5 flex flex-wrap gap-1">{project.tags.map((tag) => <span key={tag} className="tag-dark">{tag}</span>)}</div></div>
                     <div className="mt-2 flex items-center justify-between gap-2 md:mt-0 md:justify-end"><span className="mono-font text-[9px] text-[#f4efe6]/50">{project.year}</span><span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#f4efe6]">Read case study <ArrowUpRight size={13} className="link-arrow" /></span></div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="page-wrap py-10 md:py-14" data-testid="section-skills">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[.5fr_1.5fr]">
              <div>
                <p className="eyebrow text-[hsl(var(--accent))]">Technical Expertise</p>
                <h2 className="display-font mt-2 text-2xl leading-none tracking-[-.03em] md:text-3xl" data-testid="text-skills-heading">Skills &amp;<br />Competencies.</h2>
                <p className="mt-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Core languages, frameworks, developer tools, and security technologies applied across production builds and research.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {skillCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <article key={category.title} className="border-t border-[hsl(var(--foreground)/.18)] pt-3.5">
                      <div className="flex items-center gap-2 text-[hsl(var(--accent))]">
                        <Icon size={16} />
                        <h3 className="mono-font text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))]">{category.title}</h3>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {category.skills.map((skill) => (
                          <span key={skill} className="tag-light text-[11px]">{skill}</span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="certifications" className="page-wrap border-t border-[hsl(var(--foreground)/.14)] py-10 md:py-14" data-testid="section-certifications">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[.5fr_1.5fr]">
              <div>
                <p className="eyebrow text-[hsl(var(--accent))]">Industry Accreditations</p>
                <h2 className="display-font mt-2 text-2xl leading-none tracking-[-.03em] md:text-3xl" data-testid="text-certifications-heading">Certifications.</h2>
                <p className="mt-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Verified credentials and professional certifications validating cloud infrastructure, architecture, and security competencies.</p>
              </div>
              <div className="grid gap-4">
                {certifications.map((cert) => (
                  <article key={cert.title} className="group border border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--card))] p-5 transition-colors hover:border-[hsl(var(--secondary))]">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[#17221b]">
                          <Award size={16} />
                        </div>
                        <div>
                          <h3 className="display-font text-lg font-semibold leading-tight">{cert.title}</h3>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{cert.issuer}</p>
                        </div>
                      </div>
                      <span className="mono-font self-start rounded border border-[hsl(var(--foreground)/.2)] px-2 py-0.5 text-[10px] text-[hsl(var(--foreground)/.85)] sm:self-center">{cert.badge} · {cert.year}</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{cert.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.tags.map((tag) => (
                        <span key={tag} className="tag-light text-[10px]">{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="about" className="about-section bg-[hsl(var(--secondary))] px-5 py-10 text-[#17221b] dark:border-y dark:border-[hsl(var(--border))] dark:bg-[hsl(var(--card))] dark:text-[hsl(var(--foreground))] md:px-0 md:py-14" data-testid="section-about">
           <div className="page-wrap">
             <Reveal>
               <div className="grid gap-6 md:grid-cols-[.5fr_1.5fr]">
                 <div>
                   <p className="eyebrow text-[#17221b] dark:text-[hsl(var(--accent))]">Professional Profile</p>
                   <h2 className="display-font mt-2 text-2xl leading-none tracking-[-.03em] md:text-3xl">Background &amp;<br />Philosophy.</h2>
                 </div>
                 <div>
                   <p className="display-font max-w-[700px] text-lg leading-snug tracking-[-.02em] md:text-2xl" data-testid="text-about-heading">The best software architectures make complex systems intuitive, secure, and resilient.</p>
                   <div className="mt-6 grid gap-3 sm:grid-cols-3">
                     <article className="context-card flex gap-3 border-t border-[#17221b]/25 pt-2.5 dark:border-[hsl(var(--border))]">
                       <GraduationCap size={17} className="mt-0.5 text-[#17221b] dark:text-[hsl(var(--secondary))]" />
                       <div>
                         <p className="eyebrow text-[#17221b]/80 dark:text-[hsl(var(--muted-foreground))]">Education</p>
                         <h3 className="mt-1.5 text-sm font-semibold">B.Tech in Computer Science</h3>
                         <p className="mt-0.5 text-[11px] font-medium text-[#17221b]/80 dark:text-[hsl(var(--foreground))]">Amrita School of Computing</p>
                         <p className="text-[11px] text-[#17221b]/70 dark:text-[hsl(var(--muted-foreground))]">Amrita Vishwa Vidyapeetham</p>
                       </div>
                     </article>
                     <article className="context-card flex gap-3 border-t border-[#17221b]/25 pt-2.5 dark:border-[hsl(var(--border))]">
                       <ShieldCheck size={17} className="mt-0.5 text-[#17221b] dark:text-[hsl(var(--secondary))]" />
                       <div>
                         <p className="eyebrow text-[#17221b]/80 dark:text-[hsl(var(--muted-foreground))]">Core Focus</p>
                         <h3 className="mt-1.5 text-sm font-semibold">Full-Stack &amp; Security</h3>
                         <p className="mt-0.5 text-[11px] text-[#17221b]/70 dark:text-[hsl(var(--muted-foreground))]">Applied Systems, ML &amp; Web Architecture</p>
                       </div>
                     </article>
                     <article className="context-card flex gap-3 border-t border-[#17221b]/25 pt-2.5 dark:border-[hsl(var(--border))]">
                       <Globe size={17} className="mt-0.5 text-[#17221b] dark:text-[hsl(var(--secondary))]" />
                       <div>
                         <p className="eyebrow text-[#17221b]/80 dark:text-[hsl(var(--muted-foreground))]">Leadership &amp; Community</p>
                         <h3 className="mt-1.5 text-sm font-semibold">Frontend Developer</h3>
                         <p className="mt-0.5 text-[11px] text-[#17221b]/70 dark:text-[hsl(var(--muted-foreground))]">FACT Amrita (<a href="https://www.factamrita.in/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">factamrita.in</a>)</p>
                       </div>
                     </article>
                   </div>
                 </div>
               </div>
             </Reveal>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  return (
    <div>
      <main data-testid={`page-work-detail-${project.slug}`}>
        <section className="page-wrap pb-14 pt-12 md:pb-20 md:pt-16">
          <Link href="/#work" className="eyebrow inline-flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-back-work"><ArrowLeft size={13} /> Back to work</Link>
           <Reveal><div className="mt-12 grid gap-8 md:grid-cols-[.75fr_1.25fr] md:items-end"><div><p className="eyebrow text-[hsl(var(--accent))]">{project.number} / Case study</p><h1 className="display-font mt-3 max-w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[.9] tracking-[-.04em]" data-testid={`text-detail-title-${project.slug}`}>{project.title}</h1></div><div><p className="max-w-[380px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]" data-testid={`text-detail-summary-${project.slug}`}>{project.summary}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-[hsl(var(--foreground)/.45)] pb-1 text-xs transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid={`link-live-site-${project.slug}`}>Visit live site <ArrowUpRight size={14} /></a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-[hsl(var(--foreground)/.45)] pb-1 text-xs transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid={`link-github-${project.slug}`}>View on GitHub <Github size={14} /></a>}</div></div></div></Reveal>
           <div className="mt-8 grid gap-6 border-t border-[hsl(var(--foreground)/.2)] pt-5 text-xs md:grid-cols-[.65fr_.45fr_1fr]"><div><span className="eyebrow text-[hsl(var(--muted-foreground))]">Role</span><p className="mt-1.5">{project.role}</p></div><div><span className="eyebrow text-[hsl(var(--muted-foreground))]">Year</span><p className="mt-1.5 flex items-center gap-1.5"><CalendarDays size={13} />{project.year}</p></div><div><span className="eyebrow text-[hsl(var(--muted-foreground))]">Stack</span><div className="mt-1.5 flex flex-wrap gap-1.5">{project.stack.map((item) => <span key={item} className="tag-light">{item}</span>)}</div></div></div>
        </section>
        <section className="border-y border-transparent bg-[#17221b] py-14 text-[#f4efe6] dark:border-[hsl(var(--border))] dark:bg-[#111a16] md:py-20"><div className="page-wrap"><div className="grid gap-10 md:grid-cols-[.55fr_1.45fr]"><div><p className="eyebrow text-[hsl(var(--secondary))]">The story</p><p className="display-font mt-4 text-xl leading-tight text-[hsl(var(--secondary))] md:text-2xl">“{project.note}”</p></div><div className="space-y-10 md:pl-10">{[["The knot", project.challenge], ["The move", project.approach], ["What changed", project.impact]].map(([heading, copy], index) => <Reveal key={heading} delay={(index % 3) + 1}><article><span className="mono-font text-[9px] text-[#f4efe6]/50">0{index + 1}</span><h2 className="display-font mt-2 text-2xl text-[#f4efe6] md:text-3xl">{heading}</h2><p className="mt-3 max-w-[550px] text-sm leading-relaxed text-[#f4efe6]/75">{copy}</p></article></Reveal>)}</div></div></div></section>
         <section className="page-wrap py-14 md:py-20"><p className="eyebrow text-[hsl(var(--accent))]">A few principles</p><div className="mt-6 grid gap-6 md:grid-cols-3">{project.steps.map((step, index) => <Reveal key={step} delay={index + 1}><div className="border-t border-[hsl(var(--foreground)/.2)] pt-4"><span className="mono-font text-[10px]">0{index + 1}</span><h3 className="display-font mt-5 text-xl leading-none">{step}</h3></div></Reveal>)}</div><div className="mt-16 border-t border-[hsl(var(--foreground)/.2)] pt-5"><Link href="/#contact" className="group inline-flex items-center gap-2 text-lg md:text-2xl" data-testid="link-detail-contact">Have a problem or engineering challenge to solve? <ArrowUpRight className="link-arrow" /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-testid="button-scroll-to-top"
      className={`fixed bottom-5 right-5 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-[0_3px_10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-white hover:shadow-md active:scale-95 dark:hover:text-[#17221b] ${
        isVisible
          ? "pointer-events-auto scale-100 opacity-90"
          : "pointer-events-none scale-75 opacity-0"
      }`}
    >
      <ArrowUp size={16} strokeWidth={2.2} />
    </button>
  );
}

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <SiteHeader />
      {children}
      <ScrollToTopButton />
    </div>
  );
}

function PageMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const hashTarget = hash ? document.getElementById(hash.slice(1)) : null;

    if (hashTarget) {
      window.requestAnimationFrame(() => {
        hashTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location]);

  useEffect(() => {
    const pathname = location.split("#")[0];
    const project = projects.find((item) => pathname === `/work/${item.slug}`);
    const title = project
      ? `${project.title} — Vakada Abhiram | Software Engineer`
      : "Vakada Abhiram — Software Engineer | Full-Stack & Cybersecurity";
    const description = project
      ? `${project.title}: ${project.summary}`
      : "Portfolio of Vakada Abhiram, Computer Science & Engineering Graduate from Amrita School of Computing, Amrita Vishwa Vidyapeetham specializing in full-stack engineering, cloud architecture, and cybersecurity research.";

    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  }, [location]);

  return null;
}

function Router() {
  return <RoutedErrorBoundary><PageMetadata /><AppLayout><Switch><Route path="/" component={Home} /><Route path="/work/:slug" component={WorkDetail} /><Route component={NotFound} /></Switch></AppLayout></RoutedErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;