import {
  SiPython,
  SiDart,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGraphql,
  SiFastapi,
  SiSupabase,
  SiFlutter,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6"; // simple-icons doesn't always have a great Java icon, FaJava is standard

export const heroData = {
  eyebrow: "Software Engineer — Flutter · Backend · AI/ML",
  headline: "Kirtan Kankotiya",
  subheadline:
    "I build cross-platform apps and intelligent systems — from a 40-module hostel platform used by 600+ residents to production ML pipelines.",
};

export const aboutData = {
  text: "I'm a Computer Applications & IT graduate (CGPA 8.53/10) who started in Flutter development and has spent the last year moving deeper into AI/ML — currently interning as an AI Engineer while building production Flutter and backend systems on the side. I like shipping things that real people use: a hostel platform running 40+ modules for 600+ residents, an e-commerce app with real-time order tracking, and now a growing set of ML projects as I prepare for postgraduate study in AI.",
};

export const skillsData = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: SiPython },
      { name: "Dart", icon: SiDart },
      { name: "SQL", icon: SiPostgresql },
      { name: "Java", icon: FaJava },
    ],
  },
  {
    category: "AI / ML / Data",
    items: [
      { name: "NumPy", icon: SiNumpy },
      { name: "pandas", icon: SiPandas },
      { name: "scikit-learn", icon: SiScikitlearn },
      { name: "Data Cleaning", icon: null },
      { name: "Supervised Learning", icon: null },
      { name: "Classification & Regression", icon: null },
    ],
  },
  {
    category: "App Development",
    items: [
      { name: "Flutter", icon: SiFlutter },
      { name: "GetX", icon: null },
      { name: "GraphQL", icon: SiGraphql },
      { name: "REST APIs", icon: null },
      { name: "Cross-platform", icon: null },
    ],
  },
  {
    category: "Backend & Infra",
    items: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Docker", icon: SiDocker },
      { name: "Firebase", icon: SiFirebase },
      { name: "Git & GitHub", icon: SiGithub },
    ],
  },
];

export const experienceData = [
  {
    title: "AI Engineer Intern",
    company: "Flora Infotech, Surat",
    period: "Jun 2026 – Present",
    points: [
      "Transitioning from Flutter/IT into AI engineering under senior mentorship.",
      "Learning LLM fundamentals and how AI products are built and deployed in industry.",
      "Applying prior API-integration experience while building applied ML skill.",
    ],
  },
  {
    title: "Intern Flutter Developer",
    company: "ClickBuy (E-commerce App) — Flora Infotech, Surat",
    period: "Dec 2025 – Jan 2026",
    points: [
      "Built responsive Flutter UI modules and integrated REST APIs + Supabase backend.",
      "Debugged and optimized existing features for performance and stability.",
      "Worked the full Agile app-development lifecycle, requirements to deployment.",
    ],
  },
];

export const projectsData = [
  {
    title: "ClickBuy — E-commerce Application",
    tags: ["Flutter", "GraphQL", "GetX", "Supabase", "PostgreSQL"],
    description:
      "Production-ready cross-platform app: dynamic catalog, cart, secure checkout, real-time order tracking. Architected the relational schema with Row-Level Security for multi-user data isolation, and built secure auth + cloud media pipelines.",
    stat: "",
    icon: "shopping-bag",
  },
  {
    title: "PramukhSevak — Hostel Management System",
    tags: ["Flutter", "GraphQL", "Ferry", "Real-time sync"],
    description:
      "Led Flutter development on a full hostel-management platform (room allocation, attendance, mobile collection, maintenance) live at BAPS APC Hostel, Anand. Coordinated a 7-person cross-functional team over a 7-month cycle; architected a modular, SOLID-principled component structure enabling parallel development across 40+ feature modules.",
    stat: "40+ modules · 600+ residents · 7-member team",
    icon: "building",
  },
  {
    title: "Student Performance Prediction Model",
    tags: ["Python", "pandas", "scikit-learn"],
    description:
      "Self-directed ML project predicting exam performance from study-related factors; compares logistic regression and decision-tree classifiers, evaluated on accuracy/precision/recall.",
    stat: "",
    icon: "chart",
  },
];

export const educationData = [
  {
    degree: "BS, Computer Application & Information Technology",
    institution:
      "Natubhai V. Patel College of Pure & Applied Sciences (NVPAS), CVM University",
    period: "Aug 2023 – May 2026",
    details: "CGPA 8.53/10",
  },
  {
    degree: "Standard 12th",
    institution: "GSHSEB",
    period: "2022–2023",
    details: "",
  },
  {
    degree: "Standard 10th",
    institution: "GSHSEB",
    period: "2020–2021",
    details: "",
  },
];

export const certificationsData = [
  {
    title: "R Programming & Java Programming",
    issuer: "Queen Learn / IBM (Coursera)",
    description:
      "OOP in Java, statistical analysis in R, applied through hands-on labs.",
  },
];

export const contactData = {
  headline: "Let's build something.",
  email: "kirtankankotiya24@gmail.com",
  github: "github.com/kirtan2407",
};
