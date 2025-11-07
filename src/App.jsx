import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Code2,
  Linkedin,
  Download,
  Sun,
  Moon,
  Palette,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Menu
} from "lucide-react";


// =============== DATA (Edit me) ===================
const PROFILE = {
  name: "Grace Asantewaa Koranteng",
  role: "Full‑stack Web Developer",
  blurb:
    "I design, build and ship fast, accessible web apps. I turn fuzzy ideas into clean, production‑ready code.",
  location: "Accra, Ghana",
  email: "adjoaakoranteng@gmail.com",
  github: "https://github.com/AdjoaAsantewaa?tab=repositories",
  linkedin: "https://www.linkedin.com/in/grace-asantewaa-koranteng/",
  portfolioCV: "/cv.pdf", // place your CV at public/cv.pdf
};

const PROJECTS = [
  {
    title: "Explore Ghana — Travel Discovery App",
    summary:
      "Find attractions, food spots, culture and events across Ghana. Save favourites and plan trips.",
    tech: ["React", "Vite", "Tailwind", "Node", "Express", "MongoDB", "JWT", "Vercel"],
    achievements: [
      "95+ Lighthouse perf; LCP < 2.0s via image optimisation, code‑splitting and caching",
      "Auth, rate‑limited APIs; 20+ unit tests (Vitest) and Playwright e2e",
      "CI/CD with GitHub Actions, preview deployments, Sentry error tracking",
    ],
    live: "/coming-soon.html",
    featured: true,
    media: [
      // Black, realistic Ghana images
      { type: "image", src: "https://images.unsplash.com/photo-1545147986-3e7f5fd9ab6b?q=80&w=1400&auto=format&fit=crop" },
      { type: "image", src: "https://images.unsplash.com/photo-1558980664-10ea1809dede?q=80&w=1400&auto=format&fit=crop" },
      { type: "youtube", src: "https://www.youtube.com/embed/ysz5S6PUM-U" },
    ],
  },
  {
    title: "Business Analytics Dashboard",
    summary:
      "Role‑based dashboards with charts, server‑side filtering and exports for 100k+ rows.",
    tech: ["React", "Recharts", "Node", "Express", "Postgres", "Zod", "JWT"],
    achievements: [
      "~40% faster TTI via memoisation and lazy‑loading",
      "Pagination + server‑side filters; CSV export",
      "Helmet/CSP and input validation for security",
    ],
    live: "/coming-soon.html",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop" },
    ],
  },
  {
    title: "E‑commerce Storefront",
    summary:
      "Modern storefront with product catalogue, cart, checkout and admin analytics.",
    tech: ["Next.js", "React", "Tailwind", "Redux Toolkit", "Stripe", "Node"],
    achievements: [
      "Image optimisation + caching for fast PDPs",
      "Accessible forms and keyboard nav for checkout",
      "Ready for SSR/ISR deployment on Vercel",
    ],
    live: "/coming-soon.html",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop" },
    ],
  },
  {
    title: "Daven Consultants Website",
    summary:
      "Responsive marketing site with semantic HTML, AA contrast and high‑converting contact form.",
    tech: ["Tailwind", "Bootstrap", "HTML", "Netlify/Vercel Forms"],
    achievements: [
      "100 SEO on Lighthouse; WCAG AA colours",
      "Spam‑safe forms (hCaptcha) + GA4 events",
    ],
    live: "#",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
  {
    title: "Multipointer Limited Website",
    summary:
      "Component‑driven landing + services with crisp visuals and CMS‑ready structure.",
    tech: ["Tailwind", "JavaScript", "HTML"],
    achievements: [
      "CLS < 0.05 via careful layout + responsive images",
      "Automated image pipeline to modern formats",
    ],
    live: "#",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" },
    ],
  },
];

const SKILLS = {
  Frontend: [
    "React", "Next.js", "Vite", "TypeScript", "Tailwind", "Redux Toolkit", "Framer Motion",
  ],
  "Mobile Apps": ["React Native", "Expo", "Expo Router", "Redux Toolkit"],
  Backend: ["Node", "Express", "REST", "Postgres", "MongoDB", "Prisma", "Auth (JWT)"],
  "DevOps & Tools": ["GitHub Actions", "Docker", "Vercel", "Netlify", "Sentry", "GA4"],
  "Testing & Quality": ["Vitest", "Playwright", "ESLint", "Prettier", "Lighthouse", "axe"],
};

// =============== Theme System ===================
const THEMES = {
  // aurora: {
  //   label: "Aurora Neon",
  //   light: { bg: "#F8FAFC", surface: "#FFFFFF", text: "#0B1220", muted: "#64748B", primary: "#7C3AED", accent: "#22D3EE", border: "#E5E7EB", ring: "#7C3AED" },
  //   dark: { bg: "#0B1220", surface: "#0F172A", text: "#E5E7EB", muted: "#94A3B8", primary: "#A78BFA", accent: "#22D3EE", border: "#1E293B", ring: "#A78BFA" },
  // },
  // jade: {
  //   label: "Jade & Ink",
  //   light: { bg: "#F6F9F8", surface: "#FFFFFF", text: "#091016", muted: "#5B6B73", primary: "#0EA5A0", accent: "#F59E0B", border: "#E2E8F0", ring: "#0EA5A0" },
  //   dark: { bg: "#081317", surface: "#0B1B1E", text: "#E6F1F1", muted: "#92A8AD", primary: "#14B8A6", accent: "#F59E0B", border: "#123037", ring: "#14B8A6" },
  // },
  // royal: {
  //   label: "Royal Signal",
  //   light: { bg: "#FAFBFF", surface: "#FFFFFF", text: "#0B0A13", muted: "#636576", primary: "#4F46E5", accent: "#EC4899", border: "#E6E8EF", ring: "#4F46E5" },
  //   dark: { bg: "#0C0B14", surface: "#10111D", text: "#E6E7F1", muted: "#A1A1B3", primary: "#818CF8", accent: "#F472B6", border: "#1C1E2E", ring: "#818CF8" },
  // },
  // plumTeal: {
  //   label: "Plum & Teal",
  //   light: { bg: "#F9FAFB", surface: "#FFFFFF", text: "#0C0A1A", muted: "#6B7280", primary: "#6D28D9", accent: "#14B8A6", border: "#E5E7EB", ring: "#6D28D9" },
  //   dark: { bg: "#0B0A1A", surface: "#121020", text: "#E5E7EB", muted: "#A1A1AA", primary: "#A78BFA", accent: "#14B8A6", border: "#1F2937", ring: "#A78BFA" },
  // },
  rose: {
    label: "Rose Quartz",
    light: { bg: "#FFF8FB", surface: "#FFFFFF", text: "#19151F", muted: "#7A7282", primary: "#DB2777", accent: "#A78BFA", border: "#F1E6EE", ring: "#DB2777" },
    dark: { bg: "#120F16", surface: "#181320", text: "#F3E8EE", muted: "#B7AABB", primary: "#F472B6", accent: "#C4B5FD", border: "#2A2330", ring: "#F472B6" },
  },
};
function applyTheme(theme, mode) {
  const scheme = theme[mode];
  Object.entries(scheme).forEach(([k, v]) => document.documentElement.style.setProperty(`--${k}`, v));
}
function ThemeSwitcher({ themeKey, setThemeKey, mode, setMode }) {
  const keys = Object.keys(THEMES);
  const next = () => setThemeKey(keys[(keys.indexOf(themeKey) + 1) % keys.length]);
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 text-sm hover:bg-(--surface)/60" aria-label="Toggle color mode">
        {mode === "light" ? <Moon size={16} /> : <Sun size={16} />} {mode === "light" ? "Dark" : "Light"}
      </button>
      <button onClick={next} className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 text-sm hover:bg-(--surface)/60" aria-label="Cycle palette">
        <Palette size={16} /> {THEMES[themeKey].label}
      </button>
    </div>
  );
}

// =============== UI Helpers ===================
const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">{title}</h2>
      {children}
    </div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-(--border) px-3 py-1 text-xs md:text-sm mr-2 mb-2">
    {children}
  </span>
);

const LinkIcon = ({ href, children, Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-3 py-2 text-sm hover:shadow-md transition"
  >
    <Icon size={16} /> {children}
  </a>
);

// =============== Media Components ===================
function MediaThumb({ item, onClick }) {
  return (
    <button onClick={onClick} className="group relative block w-full overflow-hidden rounded-xl border border-(--border)">
      <div className="aspect-video bg-black/10">
        {item.type === "image" ? (
          <img src={item.src} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PlayCircle size={56} className="opacity-80 group-hover:opacity-100" />
          </div>
        )}
      </div>
    </button>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const item = items?.[index];
  if (!item) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl">
          <button onClick={onClose} className="absolute -top-10 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X size={20} /></button>
          <div className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--surface)">
            <div className="aspect-video flex items-center justify-center">
              {item.type === "image" && <img src={item.src} alt="" className="max-h-[80vh] w-full object-contain" />}
              {item.type === "youtube" && (
                <iframe className="h-full w-full" src={item.src} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              )}
              {item.type === "video" && <video controls className="max-h-[80vh] w-full"><source src={item.src} /></video>}
            </div>
          </div>
          {items.length > 1 && (
            <>
              <button onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronLeft /></button>
              <button onClick={onNext} className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronRight /></button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// =============== Main Component ===================
export default function PortfolioApp() {
  const [themeKey, setThemeKey] = useState("rose");
  const [mode, setMode] = useState("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lightbox state
  const [lightbox, setLightbox] = useState({ open: false, items: [], index: 0 });
  const openLightbox = (items, index = 0) => setLightbox({ open: true, items, index });
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));
  const nextLightbox = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % s.items.length }));
  const prevLightbox = () => setLightbox((s) => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length }));

  useEffect(() => {
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox.open]);
  useEffect(() => { applyTheme(THEMES[themeKey], mode); }, [themeKey, mode]);
  return (
    <div className="min-h-screen bg-(--bg) text-(--text) selection:bg-(--primary) selection:text-white">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-(--surface)/60 border-b border-(--border)">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight flex items-center gap-2">
            <Code2 className="opacity-70" /> {PROFILE.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              { href: "#projects", label: "Projects" },
              { href: "#skills", label: "Skills" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="hover:opacity-70">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.github}
              aria-label="GitHub"
              className="p-2 rounded-lg hover:bg-(--surface)/60 hidden sm:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
            </a>
            <a
              href={PROFILE.linkedin}
              aria-label="LinkedIn"
              className="p-2 rounded-lg hover:bg-(--surface)/60 hidden sm:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-(--primary) text-white px-3 py-2 text-sm"
            >
              <Mail size={16} /> Email
            </a>
            <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden p-2 rounded-lg hover:bg-(--surface)/60" aria-label="Open menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-(--border) bg-(--surface)">
            <nav className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
              {[
                { href: "#projects", label: "Projects" },
                { href: "#skills", label: "Skills" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-lg hover:bg-(--surface)/60">
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-(--surface)/60"><Github size={16}/> GitHub</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-(--surface)/60"><Linkedin size={16}/> LinkedIn</a>
                <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 px-2 py-2 rounded-lg bg-(--primary) text-white"><Mail size={16}/> Email</a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[radial-gradient(900px_500px_at_10%_-10%,_var(--accent)_10%,_transparent_60%),radial-gradient(800px_500px_at_90%_0%,_var(--primary)_10%,_transparent_60%),linear-gradient(to_bottom,transparent,transparent)] opacity-30" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-sm text-(--muted) mb-4">
                <MapPin size={16} className="opacity-70" /> {PROFILE.location}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-full border border-(--border) text-(--primary) bg-(--surface)/60 mb-3">
                <Sparkles size={14} /> Frontend‑first Full‑Stack
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {PROFILE.role}
              </h1>
              <p className="mt-4 text-(--muted) max-w-prose">
                {PROFILE.blurb}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={PROFILE.portfolioCV} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-(--primary) text-white px-4 py-2"
                >
                  <Download size={16} /> View CV
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-4 py-2"
                >
                  <Mail size={16} /> Contact
                </a>
                <ThemeSwitcher themeKey={themeKey} setThemeKey={setThemeKey} mode={mode} setMode={setMode} />
              </div>
            </div>
            <div className="md:justify-self-end">
              {/* Simple showcase tile */}
              <div className="grid grid-cols-2 gap-4">
                {PROJECTS.slice(0, 2).map((p) => (
                  <a
                    key={p.title}
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-(--border) p-4 hover:shadow-md transition bg-(--surface)"
                  >
                    <h3 className="font-semibold mb-1 text-sm">{p.title.split(" — ")[0]}</h3>
                    <p className="text-xs text-(--muted) line-clamp-2 mb-3">{p.summary}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1"><Globe size={14} /> Live</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <Section id="projects" title="Selected Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <motion.article
              key={proj.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-(--border) p-6 bg-(--surface) hover:shadow-md transition"
            >
              {proj.media?.length ? (
                <div className="mb-4">
                  <MediaThumb item={proj.media[0]} onClick={() => openLightbox(proj.media, 0)} />
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">{proj.title}</h3>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm hover:underline"
                  >
                    <Globe size={16} /> Live
                  </a>
                </div>
              </div>
              <p className="mt-2 text-sm text-(--muted)">{proj.summary}</p>
              <div className="mt-4 flex flex-wrap">
                {proj.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {proj.achievements.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-gray-800" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools">
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className="rounded-2xl border border-(--border) p-6 bg-(--surface)">
              <h3 className="font-semibold mb-3">{group}</h3>
              <div className="flex flex-wrap">
                {items.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section id="about" title="About">
        <div className="rounded-2xl border border-(--border) p-6 bg-(--surface)">
          <p className="text-(--muted) leading-relaxed">
            I craft user‑centred, performant web applications with a focus on accessibility and clean architecture.
            Over the past year I’ve built dashboards, content sites and location‑aware apps, shipping CI/CD pipelines
            and testing along the way. I care about details: meaningful metrics (Core Web Vitals), semantic HTML and
            straightforward docs so teams can scale and maintain work with confidence.
          </p>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="rounded-2xl border border-(--border) p-6 bg-(--surface)">
          <div className="flex flex-wrap items-center gap-3">
            <LinkIcon href={`mailto:${PROFILE.email}`} Icon={Mail}>Email</LinkIcon>
            <LinkIcon href={PROFILE.github} Icon={Github}>GitHub</LinkIcon>
            <LinkIcon href={PROFILE.linkedin} Icon={Linkedin}>LinkedIn</LinkIcon>
          </div>
          <p className="mt-4 text-sm text-(--muted)">
            Prefer a quick intro? Send a link to your brief or a screenshot of your requirements — I’ll reply with the next steps.
          </p>
        </div>
      </Section>

      <footer className="py-10 border-t border-(--border)">
        <div className="max-w-6xl mx-auto px-4 text-sm text-(--muted) flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              <Github size={14} /> GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1 hover:underline">
              <Mail size={14} /> Contact
            </a>
          </div>
        </div>
      </footer>
      {lightbox.open && (
        <Lightbox items={lightbox.items} index={lightbox.index} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
      )}
    </div>
  );
}
