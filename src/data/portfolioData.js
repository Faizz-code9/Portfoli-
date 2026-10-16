// ─── Navigation Items ───────────────────────────────────────────
export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const baseUrl = import.meta.env.BASE_URL;

// ─── Hero Section ───────────────────────────────────────────────
export const heroData = {
  name: 'Mohammed Faizan',
  subtitle: 'AI/ML Engineer & Software Developer',
  bio: 'B.Tech Computer Science (AI & ML) student building agentic AI systems, embedded security hardware, and full-stack applications with a focus on secure, real-world engineering.',
  resumeUrl: `${baseUrl}Mohammed_Faizan_Resume.pdf?v=20261016`,
  cvUrl: `${baseUrl}Mohammed_Faizan_CV_Photo.pdf?v=20261016`,
  photoUrl: `${baseUrl}assets/faizan_photo.jpeg`,
  phone: '+91 7019569171',
  email: 'faizzz9842@gmail.com',
  location: 'Bengaluru, Karnataka, India',
  social: {
    github: 'https://github.com/Faizz-code9',
    linkedin: 'https://www.linkedin.com/in/mohammed-faizan-9a69a4357/',
    twitter: 'https://x.com/Faizz_98_',
  },
};

// ─── Projects ───────────────────────────────────────────────────
export const projectsData = [
  {
    id: 1,
    title: 'Agentic AI SOC Analyst',
    category: 'Agentic AI & Security',
    description: 'Built an autonomous team of AI agents using LangGraph and Wazuh SIEM that automatically review security alerts, investigate threats, and orchestrate incident response.',
    features: [
      'Autonomous multi-agent alert investigation workflows',
      'Wazuh SIEM integration with real-time threat parsing',
      'Layered prompt injection mitigation & firewall defenses',
      'Live interactive telemetry dashboard with IP blocking',
      'Semantic similarity lookup with ChromaDB & PostgreSQL',
    ],
    technologies: ['Python', 'LangGraph', 'Wazuh SIEM', 'PostgreSQL', 'ChromaDB', 'HTMX', 'FastAPI'],
    image: `${baseUrl}assets/p1.png`,
    githubUrl: 'https://github.com/Faizz-code9',
    liveUrl: 'https://github.com/Faizz-code9',
    gradientFrom: '#06b6d4',
    gradientTo: '#3b82f6',
  },
  {
    id: 2,
    title: 'BharatKey – Hardware Security Key',
    category: 'Hardware Security & Cryptography',
    description: 'Open-source FIDO2/WebAuthn hardware security key implemented on an STM32F411 MCU for passwordless authentication across Google, GitHub, and enterprise portals.',
    features: [
      'FIDO2 / WebAuthn passwordless authentication protocol',
      'Hardware-accelerated ECDSA P-256 crypto operations',
      'USB HID communications stack & CTAP2 authentication',
      'Smart-card digital PDF signing with mbedTLS engine',
      'Tamper-resistant on-chip flash credential storage',
    ],
    technologies: ['C', 'STM32', 'USB', 'mbedTLS', 'FIDO2', 'CTAP2', 'Cryptography'],
    image: `${baseUrl}assets/p2.png`,
    githubUrl: 'https://github.com/Faizz-code9',
    liveUrl: 'https://github.com/Faizz-code9',
    gradientFrom: '#a855f7',
    gradientTo: '#ec4899',
  },
  {
    id: 3,
    title: 'Multi-Material Defect Inspection System',
    category: 'Computer Vision & Edge AI',
    description: 'Architected an edge computer vision pipeline (ResNet-18 + YOLOv10) detecting 25 defect classes across Steel, Aluminum, and Wood with real-time hardware defect rejection.',
    features: [
      'Edge CV pipeline (ResNet-18 + YOLOv10) across 25 defect classes',
      'Steel, Aluminum & Wood inspection with +14.2% micro-scratch recall',
      'Custom shape-descriptor module for fine surface anomaly detection',
      'Low-latency FastAPI/WebSocket backend streaming live diagnostics at ~45ms/frame (22 FPS)',
      'Integrated ESP32 microcontroller triggering real-time defect-rejection hardware',
    ],
    technologies: ['PyTorch', 'YOLOv10', 'ResNet-18', 'FastAPI', 'WebSockets', 'ESP32', 'Python'],
    image: `${baseUrl}assets/p3.png`,
    githubUrl: 'https://github.com/Faizz-code9',
    liveUrl: 'https://github.com/Faizz-code9',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
  },
  {
    id: 4,
    title: 'TRISP – Safety-Aware Routing Engine',
    category: 'AI & Graph Intelligence',
    description: 'Real-time safety-aware routing engine covering Bengaluru’s 65 km² street network. Integrates live TomTom & OpenWeatherMap APIs with a 3-stage Mistral-7B crime intelligence pipeline.',
    features: [
      'Twin-probe TSA-NAMOA* resolving Pareto Front Collapse',
      'Real-time safety routing over Bengaluru’s 65 km² grid',
      '3-stage Mistral-7B RSS crime-intelligence processing',
      '0% worst-case failures & +2.28% cost reduction in 600 queries',
      'Co-authored IEEE research submission with 1.03s latency',
    ],
    technologies: ['Python', 'Mistral-7B', 'TomTom API', 'OpenWeatherMap', 'Algorithms', 'FastAPI'],
    image: `${baseUrl}assets/p4.png`,
    githubUrl: 'https://github.com/Faizz-code9',
    liveUrl: 'https://github.com/Faizz-code9',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
  },
];

// ─── Experience ─────────────────────────────────────────────────
export const experienceData = [
  {
    year: 'Jun 2026 — Present',
    role: 'Research Intern',
    company: 'Center for Cloud Computing and Big Data, PES University',
    description: 'Engineered TRISP, a real-time safety-aware routing engine for Bengaluru’s 65 km² street network using live TomTom and OpenWeatherMap APIs. Designed TSA-NAMOA*, a twin-probe algorithm resolving Pareto Front Collapse in NAMOA* under peak-hour traffic, backed by a 3-stage Mistral-7B RSS crime-intelligence pipeline. Beat 5-factor literature baselines in a 600-query evaluation (0% worst-case failures, +2.28% cost reduction, 1.03s latency); co-authored an IEEE submission.',
    tech: ['Python', 'TomTom API', 'OpenWeatherMap', 'Mistral-7B', 'TSA-NAMOA*', 'FastAPI'],
    iconColor: 'text-cyan-400',
  },
  {
    year: 'Aug 2025 — Jul 2026',
    role: 'Junior Manager, Incoming Corporate Sector',
    company: 'AIESEC in Bengaluru',
    description: 'Led cold-calling outreach and market research to secure client meetings with Bengaluru startups. Managed global AIESEC relations, matching international applicants with corporate internships across India.',
    tech: ['Corporate Relations', 'Market Research', 'Client Outreach', 'Leadership', 'Negotiation'],
    iconColor: 'text-green-400',
  },
  {
    year: 'Feb 2026 — Present',
    role: 'Teaching Assistant (Python & C)',
    company: 'PES University',
    description: 'Python Programming (Sep 2026 – Present): Design lecture slides and HackerRank coding challenges; evaluate student submissions for code quality and problem-solving. C Programming (Feb 2026 – May 2026): Taught programming fundamentals, memory management, pointers, and designed quizzes/study materials to reinforce core concepts.',
    tech: ['Python', 'C Programming', 'HackerRank', 'Data Structures', 'Algorithms', 'Mentorship'],
    iconColor: 'text-purple-400',
  },
];

// ─── Education ──────────────────────────────────────────────────
export const educationData = [
  {
    period: '2024 — Present',
    degree: 'B.Tech in Computer Science (AI & ML)',
    institution: 'PES University, Bengaluru, KA',
    cgpa: 'Top Academic Standing',
    icon: '🎓',
  },
  {
    period: '2022 — 2024',
    degree: 'Pre-University (State Board of Karnataka)',
    institution: 'Shaheen PU College, Bengaluru, KA',
    cgpa: '95.88%',
    icon: '📖',
  },
  {
    period: '2021 — 2022',
    degree: 'Grade 10 (State Board of Karnataka)',
    institution: 'GEM School, Bengaluru, KA',
    cgpa: '97.00%',
    icon: '📚',
  },
];

// ─── Achievements / Awards ─────────────────────────────────────
export const achievementsData = [
  {
    title: '1st Place – Ignite Room',
    subtitle: 'Bangalore Zonal level champions.',
    period: '2025–2026',
    badge: 'Zonal Winner',
    icon: '🏆',
  },
  {
    title: '3rd Place – Cybersecurity Hackathon',
    subtitle: 'National-Level Cybersecurity Hackathon.',
    period: '2025',
    badge: 'National Rank 3',
    icon: '🛡️',
  },
  {
    title: 'Top 6 – Computer Vision Hackathon',
    subtitle: 'National-Level Hackathon organized by RVCE.',
    period: '2026',
    badge: 'RVCE Top 6',
    icon: '👁️',
  },
  {
    title: '4x CNR Scholarship Recipient',
    subtitle: 'Prestigious merit scholarship recipient at PES University.',
    period: '2024–Present',
    badge: 'Merit Award',
    icon: '🎖️',
  },
  {
    title: 'Top 10 in 4 Hackathons',
    subtitle: 'Top 15 in 2 CTFs; Mentor at State-Level Hackathon.',
    period: '2024–2026',
    badge: 'Hackathon Finalist',
    icon: '🚀',
  },
  {
    title: 'Head of Volunteers & Student Coordinator',
    subtitle: 'AI 360° Unmasking AI for Society – Pre-Summit Event of India-AI Impact Summit 2026, PES University.',
    period: '2026',
    badge: 'Leadership',
    icon: '🌟',
  },
  {
    title: 'Campus Involvement: 5 Student Clubs',
    subtitle: 'Active member of AIESEC, Samarpana, Weal, DEBSOC, and AL Coding.',
    period: '2024–Present',
    badge: 'Campus Clubs',
    icon: '🤝',
  },
  {
    title: 'Best Outgoing Student of the Year',
    subtitle: 'Valedictorian & Outstanding Student Award (GEM School 2022).',
    period: '2022',
    badge: 'Gold Medalist',
    icon: '⭐',
  },
];

// ─── Certificates Carousel ──────────────────────────────────────
export const certificatesData = [
  { id: 1, title: 'Agentic AI Systems & LangGraph', issuer: 'DeepLearning.AI', date: '2026', color: '#06B6D4', link: '#' },
  { id: 2, title: 'Hardware Security & FIDO2', issuer: 'mbedTLS Security', date: '2026', color: '#A855F7', link: '#' },
  { id: 3, title: 'SIEM & SOC Threat Analysis', issuer: 'Wazuh Security', date: '2026', color: '#10B981', link: '#' },
  { id: 4, title: 'TensorFlow & Machine Learning', issuer: 'Google Cloud', date: '2025', color: '#F59E0B', link: '#' },
  { id: 5, title: 'Full Stack & FastAPI Engineering', issuer: 'Meta Blueprint', date: '2025', color: '#3B82F6', link: '#' },
  { id: 6, title: 'Cybersecurity Operations & Defense', issuer: 'Cisco Systems', date: '2025', color: '#EF4444', link: '#' },
  { id: 7, title: 'Advanced C & Embedded Systems', issuer: 'PES University', date: '2025', color: '#6366F1', link: '#' },
  { id: 8, title: 'Python for Data Science & AI', issuer: 'Python Institute', date: '2024', color: '#EC4899', link: '#' },
];

// ─── Skills (Physics Playground) ────────────────────────────────
export const skillsData = [
  { key: 'python', label: 'Python', color: '#3776AB' },
  { key: 'langgraph', label: 'LangGraph', color: '#22D3EE' },
  { key: 'c', label: 'C/C++', color: '#00599C' },
  { key: 'rust', label: 'Rust', color: '#DEA584' },
  { key: 'react', label: 'React', color: '#61DAFB' },
  { key: 'next', label: 'Next.js', color: '#E0E0E0' },
  { key: 'fastapi', label: 'FastAPI', color: '#009688' },
  { key: 'wazuh', label: 'Wazuh', color: '#10B981' },
  { key: 'docker', label: 'Docker', color: '#2496ED' },
  { key: 'kubernetes', label: 'Kubernetes', color: '#326CE5' },
  { key: 'postgres', label: 'PostgreSQL', color: '#336791' },
  { key: 'mongodb', label: 'MongoDB', color: '#10AA50' },
  { key: 'chromadb', label: 'ChromaDB', color: '#F59E0B' },
  { key: 'tailwind', label: 'Tailwind', color: '#38BDF8' },
  { key: 'linux', label: 'Linux', color: '#FCC624' },
  { key: 'git', label: 'Git', color: '#F05032' },
];

// ─── LeetCode & Coding Stats ───────────────────────────────────
export const leetcodeStats = {
  rank: 'Top 5%',
  badges: '12+',
  reputation: '950+',
  solved: 480,
  total: 1200,
  easy: { solved: 210, total: 450, beats: 92 },
  medium: { solved: 215, total: 550, beats: 88 },
  hard: { solved: 55, total: 200, beats: 84 },
};

// ─── GitHub Stats ───────────────────────────────────────────────
export const githubStats = {
  grade: 'A+',
  repos: '35+',
  stars: '120+',
  contributions: '1,450+',
  prs: '65+',
  commits: '820+',
  issues: '28',
  contributed: '18',
  languages: [
    { name: 'Python', pct: 48.5, color: '#3776AB' },
    { name: 'C/C++', pct: 24.2, color: '#00599C' },
    { name: 'JavaScript', pct: 15.8, color: '#F7DF1E' },
    { name: 'Rust', pct: 7.5, color: '#DEA584' },
    { name: 'HTML/CSS', pct: 4.0, color: '#E34C26' },
  ],
};

// ─── Section Accent Colors (Cosmic Deep Space Nebula Tones) ─────
export const sectionAccents = {
  hero:         { a: 'rgba(56,189,248,0.08)',  b: 'rgba(168,85,247,0.06)',   c: 'rgba(99,102,241,0.06)' },
  about:        { a: 'rgba(245,158,11,0.08)',  b: 'rgba(236,72,153,0.06)',   c: 'rgba(139,92,246,0.06)' },
  projects:     { a: 'rgba(34,211,238,0.08)',  b: 'rgba(59,130,246,0.06)',   c: 'rgba(168,85,247,0.06)' },
  experience:   { a: 'rgba(168,85,247,0.08)',  b: 'rgba(59,130,246,0.06)',   c: 'rgba(236,72,153,0.06)' },
  skills:       { a: 'rgba(16,185,129,0.08)',  b: 'rgba(34,211,238,0.06)',   c: 'rgba(99,102,241,0.06)' },
  certificates: { a: 'rgba(245,158,11,0.08)',  b: 'rgba(239,68,68,0.06)',    c: 'rgba(168,85,247,0.06)' },
  contact:      { a: 'rgba(34,211,238,0.08)',  b: 'rgba(168,85,247,0.06)',   c: 'rgba(59,130,246,0.06)' },
  default:      { a: 'rgba(56,189,248,0.08)',  b: 'rgba(168,85,247,0.06)',   c: 'rgba(99,102,241,0.06)' },
};


