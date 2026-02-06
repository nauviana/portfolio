"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RESUME_URL =
  "https://drive.google.com/file/d/1fx3EOCf7To84Z3_h8c70Wjk_S1jihWFx/view?usp=sharing";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

type TimelineItem = {
  role: string;
  org: string;
  time: string;
};

type OrgItem = {
  name: string;
  role: string;
  time: string;
  assoc?: string;
};

type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  images: string[];
  platform?: string;
  highlights?: string[];
};

type DesignItem = {
  image: string;
  width: number;
  height: number;
  link?: string;
  desc?: string;
  tool?: string;
};

// ============== Motion helpers ==============
const easeOut = [0.22, 1, 0.36, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
};

const revealFast = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOut },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOut },
  },
};

const modalOverlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalPanel = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: easeOut } },
  exit: { opacity: 0, scale: 0.98, y: 10, transition: { duration: 0.2, ease: easeOut } },
};

export default function Home() {
  // ======================
  // Typing Animation
  // ======================
  const words = ["Flutter Developer", "Mobile Developer", "Graphic Design"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 45 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, charIndex + 1);
        setText(next);
        setCharIndex((v) => v + 1);

        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1100);
        }
      } else {
        const next = currentWord.slice(0, Math.max(0, charIndex - 1));
        setText(next);
        setCharIndex((v) => Math.max(0, v - 1));

        if (charIndex - 1 <= 0) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, wordIndex]);

  // ======================
  // Modal + Slider State
  // ======================
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [openProjectId]);

  // lock body scroll when modal open
  useEffect(() => {
    if (openProjectId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openProjectId]);

  // ======================
  // Nav
  // ======================
  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Design", href: "#design" },
    { label: "About", href: "#about" },
    { label: "Resume", href: RESUME_URL, external: true },
  ];

  // ======================
  // Data
  // ======================
  const experienceItems: TimelineItem[] = [
    { role: "Mobile Developer", org: "Self & Client Projects", time: "Sep 2025 — Present" },
    { role: "Coding Tutor", org: "Digikidz", time: "Jan 2025 — Dec 2025" },
    {
      role: "Laboratory Assistant (Web Programming and Database Systems)",
      org: "Informatics Engineering Education, Universitas Muhammadiyah Surakarta",
      time: "2024 — 2025",
    },
    { role: "IT & Data Management Intern", org: "Bank BTN Syariah", time: "Sep 2024 — Oct 2024" },
    { role: "Design Tutor", org: "SMA Muhammadiyah 2 Surakarta", time: "Aug 2023 — Jan 2024" },
    { role: "Teacher & Graphic Designer", org: "Kampus Mengajar", time: "Aug 2023 — Dec 2023" },
    { role: "Event Organizer", org: "Informatics Engineering Education, Universitas Muhammadiyah Surakarta", time: "2022" },
  ];

  const awardItems: TimelineItem[] = [
    { role: "Gold Medal", org: "International Invention and Design (KIDE)", time: "2024" },
    { role: "Gold Medal", org: "AST-PTMA (Asosiasi Sains dan Teknologi PTMA ‘Aisyiyah)", time: "2024" },
    { role: "P2MW Funding Recipient", org: "Kemendikbudristek", time: "2023" },
    { role: "1st Place – FOSHUB FOSTI UMS 2022", org: "FOSTI UMS", time: "2022" },
    { role: "2nd Place – News Writing Competition", org: "Diskominfo Kudus", time: "2019" },
  ];

  const organizationItems: OrgItem[] = [
    {
      name: "Himpunan Mahasiswa Pendidikan Teknik Informatika",
      role: "Treasurer – Human Resources Development Division",
      time: "Jan 2023 — Dec 2023",
      assoc: "Universitas Muhammadiyah Surakarta",
    },
    {
      name: "Forum Open Source Teknik Informatika",
      role: "Member – Organizational Division",
      time: "Dec 2021 — Sep 2023",
      assoc: "Universitas Muhammadiyah Surakarta",
    },
  ];

  const appProjects: ProjectItem[] = [
    {
      id: "app1",
      title: "Anime image generator",
      desc:
        "Developed an iOS AI image-generation app using Flutter and API to transform photos into anime styles. Built the UI/UX flow (onboarding, style selection, before–after slider), integrated AdMob, and handled coding, prompt engineering, and assets. RevenueCat and App Store publishing were handled by another team.",
      tag: "Flutter",
      images: ["/assets/projects/app1v2.jpg", "/assets/projects/app1_2.jpg"],
      platform: "Android / iOS",
      highlights: ["Flutter", "REST API", "AdMob", "Xcode"],
    },
    {
      id: "app2",
      title: "Bedroom design app",
      desc:
        "Built a Flutter-based bedroom design app that integrates an image-processing API to transform room photos and display results with before–after comparison.",
      tag: "Flutter",
      images: ["/assets/projects/app2v2.jpg", "/assets/projects/app2_2.jpg"],
      platform: "Android / iOS",
      highlights: ["REST API", "Flutter", "Dart"],
    },
    {
      id: "app3",
      title: "Party design app",
      desc:
        "Built a Flutter-based party design app that integrates an image-generation API to create themed party decorations from photos, featuring asynchronous processing and a modular, performance-focused UI.",
      tag: "Flutter",
      images: ["/assets/projects/app3v2.jpg", "/assets/projects/app3_2.jpg"],
      platform: "Android / iOS",
      highlights: ["REST API", "Flutter", "Dart"],
    },
    {
      id: "app4",
      title: "compress and convert image app",
      desc:
        "Built a Flutter-based photo compression app that resizes and compresses images efficiently, supports gallery saving, and maintains smooth performance through asynchronous image processing.",
      tag: "Flutter",
      images: ["/assets/projects/app4.jpg", "/assets/projects/app4v2.jpg"],
      platform: "Android / iOS",
      highlights: ["flutter", "image processing", "smooth performance"],
    },
    {
      id: "app5",
      title: "Kitchen design app",
      desc: "Short description about this Flutter app.",
      tag: "Flutter",
      images: ["/assets/projects/app5.jpg", "/assets/projects/app5_2.jpg"],
      platform: "Android / iOS",
      highlights: ["REST API", "Flutter", "Dart"],
    },
    {
      id: "app6",
      title: "Zoom 40x Camera app",
      desc:
        "Built a high-zoom camera application using Flutter, featuring up to 40× digital zoom, image stabilization, and enhanced low-light performance. The app uses a native camera controller for real-time processing and offers a clean, minimalist UI. Monetization is implemented through AdMob.",
      tag: "Flutter",
      images: ["/assets/projects/app6.jpg", "/assets/projects/app6_2.jpg"],
      platform: "Android / iOS",
      highlights: ["Dart", "Camera Controller", "AdMob", "Flutter"],
    },
  ];

  const designWorks: DesignItem[] = [
    { image: "/assets/design/d1.jpg", width: 1080, height: 1350, link: "#" },
    { image: "/assets/design/d2.jpg", width: 1920, height: 1080, link: "#" },
    { image: "/assets/design/d3.jpg", width: 1080, height: 1080, link: "#" },
    { image: "/assets/design/d4.jpg", width: 1080, height: 1350, link: "#" },
  ];

  const selectedProject = useMemo(
    () => appProjects.find((p) => p.id === openProjectId) ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openProjectId]
  );

  // Keyboard: Esc close + Arrow left/right slide
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!openProjectId) return;

      if (e.key === "Escape") setOpenProjectId(null);

      if (e.key === "ArrowLeft") {
        setSlideIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "ArrowRight") {
        const max = (selectedProject?.images.length ?? 1) - 1;
        setSlideIndex((i) => Math.min(max, i + 1));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProjectId, selectedProject?.images.length]);

  return (
    <main
      className="
        min-h-screen text-white relative overflow-hidden
        bg-gradient-to-br from-[#08141e] via-[#0f2a3a] to-[#020b12]
        pt-28
      "
    >
      {/* Background glows (subtle floating) */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-400/20 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-40 -right-40 h-[520px] w-[520px] rounded-full bg-pink-500/10 blur-3xl"
        animate={{ y: [0, -16, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-sky-400/10 blur-3xl"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pill Glass Navbar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(920px,92vw)]">
        <motion.nav
          initial={{ opacity: 0, y: -14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="
            flex items-center justify-between gap-2
            rounded-full px-3 py-2
            bg-black/20 backdrop-blur-xl
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          "
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="
                flex-1 text-center
                rounded-full px-4 py-3
                text-sm text-gray-300
                hover:text-white hover:bg-white/5
                transition
              "
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      </header>

      {/* ===================== HOME ===================== */}
      <section
        id="home"
        className="
          scroll-mt-36
          max-w-6xl mx-auto px-6 pt-6 pb-20 md:pb-28
          grid md:grid-cols-2 gap-12 items-center
        "
      >
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.p variants={item} className="text-gray-400 mb-3 mt-1">
            Hello<span className="text-orange-400"></span>
          </motion.p>

          <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold leading-tight">
            I&apos;m Novi. <br />
            <span className="inline-flex items-center gap-2">
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                {text}
              </span>
              <span className="inline-block w-[2px] h-10 md:h-12 bg-orange-300/80 animate-pulse" />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-xl text-gray-300 leading-relaxed">
            Mobile developer focused on Flutter. I also do UI/UX and graphic design, building products with
            clean visuals, strong performance, and smooth experience.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-orange-400 text-black px-6 py-3 rounded-md font-medium hover:bg-orange-300 transition"
            >
              See my apps
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-orange-400 px-6 py-3 rounded-md text-orange-400 hover:bg-orange-400 hover:text-black transition"
            >
              My resume
            </a>
          </motion.div>

          {/* Chips */}
          <motion.div variants={stagger} className="mt-10 flex gap-4 text-sm text-gray-200 flex-wrap">
            {["Flutter", "REST API", "UI/UX", "Graphic Design", "Canva", "Figma", "Firebase", "AdMob"].map((t, index) => (
              <motion.span
                variants={item}
                key={`${t}-${index}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                className="
                  px-6 py-2 rounded-full
                  bg-white/5 border border-white/10
                  backdrop-blur
                  hover:bg-white/10 transition
                "
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div variants={item} className="mt-10 flex gap-6">
            {/* GitHub */}
            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/nauviana"
              target="_blank"
              rel="noreferrer"
              className="relative group w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <span className="absolute inset-0 rounded-full bg-orange-400/25 blur-xl opacity-0 group-hover:opacity-100 transition" />
              <svg className="relative w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.8 1.8-1.1.1-.7.4-1.1.7-1.3-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.1-.4 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.3-2.6 5.2-5.1 5.5.4.3.8.9.8 1.9v2.8c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              href="https://linkedin.com/in/Nauviana-Pita-Rosa"
              target="_blank"
              rel="noreferrer"
              className="relative group w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <span className="absolute inset-0 rounded-full bg-sky-400/25 blur-xl opacity-0 group-hover:opacity-100 transition" />
              <svg className="relative w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.4 20.4h-3.5v-5.4c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.5H9.4V9h3.3v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.2 2.3 4.2 5.3v6.4zM5.3 7.4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0z" />
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              href="https://instagram.com/nauvianaa_"
              target="_blank"
              rel="noreferrer"
              className="relative group w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <span className="absolute inset-0 rounded-full bg-pink-500/25 blur-xl opacity-0 group-hover:opacity-100 transition" />
              <svg className="relative w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-.9 1.5-.5.5-.9.8-1.5 1-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.2-.5-2.4-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 .9-1.5.5-.5.9-.8 1.5-1 .5-.2 1.2-.4 2.4-.5 1.3-.1 1.7-.1 4.9-.1zM12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.8a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center relative"
        >
          <motion.div
            className="
              absolute w-[320px] h-[320px] rounded-full
              bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600
              blur-3xl opacity-25
            "
            animate={{ scale: [1, 1.05, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="
              relative w-72 h-72 rounded-full
              bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600
              p-[3px] shadow-2xl
            "
          >
            <div className="w-full h-full rounded-full bg-[#0b1c26] border border-white/10 overflow-hidden">
              <Image
                src="/assets/novi1.jpg"
                alt="Novi Profile"
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== EXPERIENCE ===================== */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-2xl md:text-3xl font-semibold">Experience</h2>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 space-y-10">
              {experienceItems.map((itemx, index) => (
                <motion.div key={`${itemx.role}-${index}`} variants={item} className="relative pl-8">
                  <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
                  <div className="absolute left-[6px] top-2 h-2 w-2 rounded-full bg-white/30" />
                  <p className="font-medium text-white/90">{itemx.role}</p>
                  <p className="text-sm text-white/45 mt-1">{itemx.org}</p>
                  <p className="text-sm text-white/35 mt-2 tracking-wide">{itemx.time}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-2xl md:text-3xl font-semibold">Honor & Awards</h2>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-8 space-y-10">
              {awardItems.map((itemx, index) => (
                <motion.div key={`${itemx.role}-${index}`} variants={item} className="relative pl-8">
                  <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
                  <div className="absolute left-[6px] top-2 h-2 w-2 rounded-full bg-white/30" />
                  <p className="font-medium text-white/90">{itemx.role}</p>
                  <p className="text-sm text-white/45 mt-1">{itemx.org}</p>
                  <p className="text-sm text-white/35 mt-2 tracking-wide">{itemx.time}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== ORGANIZATIONS ===================== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">Organizations</h2>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="space-y-10">
            {organizationItems.map((itemx, index) => (
              <motion.div key={`${itemx.name}-${index}`} variants={item} className="relative pl-8">
                <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
                <div className="absolute left-[6px] top-2 h-2 w-2 rounded-full bg-white/30" />

                <p className="font-medium text-white/90">{itemx.name}</p>
                <p className="text-sm text-white/45 mt-1">{itemx.role}</p>
                <p className="text-sm text-white/35 mt-2 tracking-wide">{itemx.time}</p>

                {itemx.assoc && <p className="text-xs text-white/30 mt-3">Associated with {itemx.assoc}</p>}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== PROJECTS ===================== */}
      <section id="projects" className="scroll-mt-1 max-w-6xl mx-auto px-6 py-16">
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-bold">Apps (6)</h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} className="mt-8 grid md:grid-cols-3 gap-5">
          {appProjects.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              variants={item}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setOpenProjectId(p.id)}
              className="
                text-left rounded-xl bg-white/5 border border-white/10 p-5
                hover:bg-white/10 transition block
                flex flex-col
                min-h-[420px]
              "
              aria-label={`Open details for ${p.title}`}
              title="View detail"
            >
              <div className="relative h-40 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="font-semibold">{p.title}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200">
                  {p.tag}
                </span>
              </div>

              <p className="text-sm text-gray-300 mt-2 line-clamp-3">{p.desc}</p>

              <div className="mt-auto pt-4">
                <p className="text-sm text-orange-300 hover:text-orange-200 transition">View Details</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ===================== DESIGN (SOON UPLOAD PAGE) ===================== */}
      <section
        id="design"
        className="
          scroll-mt-36
          min-h-[70vh]
          max-w-6xl mx-auto
          px-6 py-20
          flex items-center justify-center
        "
      >
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="text-center max-w-xl">
          <p className="text-orange-400 text-sm tracking-widest uppercase">Graphic Design</p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold">Soon Upload</h2>

          <p className="mt-6 text-gray-300 leading-relaxed">
            Design portfolio is currently being prepared. UI design, branding, posters, and social media works
            will be available here soon.
          </p>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-10 flex justify-center gap-3 flex-wrap">
            {["UI Design", "Branding", "Poster", "Social Media"].map((t) => (
              <motion.span
                key={t}
                variants={item}
                className="px-4 py-2 rounded-full text-sm text-white/70 bg-white/5 border border-white/10"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section
        id="about"
        className="scroll-mt-1 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start"
      >
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} className="space-y-4">
          {[
            { title: "Flutter Mobile Developer", desc: "Build apps: architecture, UI, API integration, performance, and clean code." },
            { title: "UI/UX & Product Thinking", desc: "Design flow: wireframe → component system → prototype → consistent experience." },
            { title: "Graphic Design", desc: "Visual identity, posters, banners, and social media assets." },
          ].map((x, index) => (
            <motion.div key={`${x.title}-${index}`} variants={item} className="rounded-xl bg-white/5 border border-white/10 p-5">
              <p className="font-semibold">{x.title}</p>
              <p className="text-sm text-gray-300 mt-2">{x.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }}>
          <h2 className="text-3xl font-bold mb-4">About me</h2>
          <p className="text-gray-300 leading-relaxed">
            Hi! I’m Nauviana Pita Rosa. I’m into design, digital products, and content creation. Even though I
            come from a tech background, my main focus now is on the creative side—visuals, concepts, and how
            to turn ideas into something engaging and relatable.
            <br />
            <br />
            I’ve worked on different digital projects, from virtual tours / virtual expos to apps and visual
            content. I’m usually involved from developing the idea to the final execution.
            <br />
            <br />
            Outside of that, I love exploring creative ideas, playing with visual concepts, and creating
            content. In the future, I want to keep making digital work that doesn’t just look good, but also
            has real impact.
          </p>

          <div className="mt-8">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-orange-400 text-black font-medium hover:bg-orange-300 transition"
            >
              Open Resume (Drive) <span aria-hidden>↗</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Novi Portfolio. All rights reserved.
      </footer>

      {/* ===================== MODAL (PROJECT DETAIL + SLIDER) ===================== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setOpenProjectId(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              variants={modalPanel}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-4xl rounded-2xl bg-[#08141e]/90 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.7)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-white">{selectedProject.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                    {selectedProject.tag}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenProjectId(null)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              {/* body */}
              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* LEFT: Slider */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedProject.id}-${slideIndex}`}
                        initial={{ opacity: 0, scale: 0.995 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.995 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={selectedProject.images[slideIndex]}
                          alt={`${selectedProject.title} screenshot ${slideIndex + 1}`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* prev */}
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
                      disabled={slideIndex === 0}
                      className="
                        absolute left-3 top-1/2 -translate-y-1/2
                        w-11 h-11 rounded-full
                        bg-black/40 border border-white/10
                        flex items-center justify-center
                        hover:bg-black/55 transition
                        disabled:opacity-40 disabled:cursor-not-allowed
                      "
                      aria-label="Previous image"
                      title="Previous"
                    >
                      ‹
                    </button>

                    {/* next */}
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => Math.min(selectedProject.images.length - 1, i + 1))}
                      disabled={slideIndex === selectedProject.images.length - 1}
                      className="
                        absolute right-3 top-1/2 -translate-y-1/2
                        w-11 h-11 rounded-full
                        bg-black/40 border border-white/10
                        flex items-center justify-center
                        hover:bg-black/55 transition
                        disabled:opacity-40 disabled:cursor-not-allowed
                      "
                      aria-label="Next image"
                      title="Next"
                    >
                      ›
                    </button>

                    {/* counter */}
                    <div className="absolute bottom-3 right-3 text-xs text-white/80 bg-black/40 border border-white/10 px-2 py-1 rounded-full">
                      {slideIndex + 1}/{selectedProject.images.length}
                    </div>
                  </div>

                  {/* dots */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      {selectedProject.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSlideIndex(i)}
                          className={[
                            "h-2.5 rounded-full transition border border-white/10",
                            i === slideIndex ? "w-8 bg-orange-400" : "w-2.5 bg-white/20 hover:bg-white/35",
                          ].join(" ")}
                          aria-label={`Go to image ${i + 1}`}
                          title={`Image ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: Details */}
                <div>
                  {selectedProject.platform && <p className="text-sm text-white/60">{selectedProject.platform}</p>}
                  <p className="mt-3 text-white/80 leading-relaxed">{selectedProject.desc}</p>

                  {selectedProject.highlights?.length ? (
                    <div className="mt-6">
                      <p className="font-semibold mb-3">Tech Stack</p>

                      <div className="flex flex-wrap gap-2">
                        {selectedProject.highlights.map((tech) => (
                          <span
                            key={tech}
                            className="
                              px-3 py-1.5 text-xs font-medium
                              rounded-full
                              bg-white/5
                              border border-white/10
                              text-white/80
                              backdrop-blur
                              hover:bg-white/10 transition
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 text-xs text-white/40">
                Tip: press <span className="text-white/60">Esc</span> to close.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
