import { Service, Project, Testimonial, NavItem, SectionId, TechDomain, ProcessStep } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Empowering Businesses Through Advanced Engineering";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: `/` },
  { label: 'Services', href: `/services` },
  { label: 'Portfolio', href: `/portfolio` },
  { label: 'About', href: `/about` },
  { label: 'Contact', href: `/contact` },
];

export const TRUSTED_PARTNERS = [
  { name: 'TECHFLOW', icon: 'TF' },
  { name: 'CLOUDSCALE', icon: 'CS' },
  { name: 'INNOVATE', icon: 'IN' },
  { name: 'NEXUS', icon: 'NX' },
  { name: 'VANTAGE', icon: 'VT' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and market landscape to define a clear roadmap.',
    icon: 'Search',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our design team creates intuitive, user-centric interfaces and interactive prototypes for early validation.',
    icon: 'Layers',
  },
  {
    id: 'development',
    number: '03',
    title: 'Agile Development',
    description: 'Using high-performance tech stacks, we build your solution in sprints, ensuring transparency and quality.',
    icon: 'Code',
  },
  {
    id: 'testing',
    number: '04',
    title: 'Quality Assurance',
    description: 'Rigorous manual and automated testing ensures your product is bug-free, secure, and ready for scale.',
    icon: 'ShieldCheck',
  },
  {
    id: 'deployment',
    number: '05',
    title: 'Launch & Evolution',
    description: 'We handle the deployment and provide ongoing support to scale your product based on user feedback.',
    icon: 'Rocket',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Enterprise Web Solutions',
    description: 'We architect scalable, high-performance web applications tailored for complex business logic and high-traffic environments. Our approach ensures long-term maintainability and seamless user experiences across all platforms.',
    icon: 'Globe',
    features: ['React & Next.js Optimization', 'Cloud-Native SaaS Architecture', 'High-Conversion E-commerce', 'Headless CMS & API Integration'],
  },
  {
    id: 'mobile-dev',
    title: 'Native Mobile Apps',
    description: 'Crafting premium iOS and Android experiences that leverage native hardware capabilities for maximum performance. We focus on creating fluid animations and intuitive interfaces that keep users engaged.',
    icon: 'Smartphone',
    features: ['Swift & Kotlin Expertise', 'React Native & Flutter Mastery', 'Offline-First Functionality', 'Biometric & Device API Integration'],
  },
  {
    id: 'dedicated-teams',
    title: 'Dedicated Teams',
    description: 'High-velocity engineering teams integrated directly into your workflow to accelerate product delivery cycles. We provide senior-level talent that adapts to your culture and engineering standards.',
    icon: 'Users',
    features: ['Seamless Staff Augmentation', 'Agile Governance & Scrum', 'Full-stack Product Teams', 'On-demand Technical Leadership'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    description: 'Modernizing infrastructure with AWS, Azure, and GCP best practices, ensuring 99.99% availability and automated scaling. We build resilient systems that grow alongside your business demands.',
    icon: 'Cloud',
    features: ['Serverless & Microservices', 'Kubernetes Cluster Management', 'Automated CI/CD Pipelines', 'Proactive Disaster Recovery'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinTech Analytics Hub',
    category: 'Enterprise Software',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366fd9?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'A comprehensive financial analytics dashboard for real-time market tracking.',
    fullDescription: 'We engineered a low-latency data ingestion pipeline for real-time stock market analysis, providing institutional-grade charting tools. The system handles over 10k concurrent data points per second with advanced visualization.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/finance.vtt'
  },
  {
    id: '2',
    title: 'Luma Healthcare App',
    category: 'Mobile Application',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'A HIPAA-compliant telemedicine platform with secure video conferencing.',
    fullDescription: 'Our mobile team focused on high-security standards (HIPAA) and low-latency video streaming to connect patients with specialists globally. Features include encrypted health records, automated prescription refills, and instant appointment management.',
    technologies: ['Flutter', 'Firebase', 'WebRTC'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/healthcare.vtt'
  },
  {
    id: '3',
    title: 'Global Logistics Engine',
    category: 'Supply Chain',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'AI-driven logistics platform managing complex global supply chains.',
    fullDescription: 'Integrating AI for predictive route optimization, this platform reduced fuel costs for a major shipping firm by 14% in its first quarter of operation using real-time GPS tracking and weather forecasting data.',
    technologies: ['Next.js', 'Python', 'AWS SageMaker'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/logistics.vtt'
  },
  {
    id: '4',
    title: 'EduStream Pro',
    category: 'E-Learning',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'Cloud-based learning management system for universities.',
    fullDescription: 'A scalable LMS built to support over 50,000 students. Includes real-time testing, automated grading, a collaborative virtual classroom module, and rich multimedia resource storage.',
    technologies: ['Vue.js', 'Firebase', 'Node.js', 'Redis'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/edu.vtt'
  },
  {
    id: '5',
    title: 'EcoTrack IoT',
    category: 'Smart Industry',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'Industrial IoT monitoring for sustainable manufacturing.',
    fullDescription: 'Connects factory floor sensors to a central dashboard to monitor carbon footprint and energy waste in real-time. Built with a focus on edge computing and high-availability data streams.',
    technologies: ['Angular', 'Go', 'MQTT', 'Docker'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/eco.vtt'
  },
  {
    id: '6',
    title: 'Nexus Real Estate VR',
    category: 'Real Estate',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'Web-based VR walkthroughs for luxury property listings.',
    fullDescription: 'Allowing potential buyers to explore properties from their browser with high-fidelity 3D rendering and interactive floor plans, significantly increasing conversion rates for global buyers.',
    technologies: ['React', 'Three.js', 'WebGL', 'AWS S3'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackAds.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/vr.vtt'
  },
  {
    id: '7',
    title: 'CloudScale Infrastructure',
    category: 'Cloud Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'Automated multitenant provisioning system for enterprise cloud users.',
    fullDescription: 'A robust orchestration tool that manages resource allocation across hybrid cloud environments, providing a single pane of glass for multi-cloud deployments.',
    technologies: ['Terraform', 'Go', 'Kubernetes', 'AWS'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/cloud.vtt'
  },
  {
    id: '8',
    title: 'OmniShop AI',
    category: 'E-Commerce',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'Personalized e-commerce engine with real-time AI recommendations.',
    fullDescription: 'We built a high-conversion retail platform that uses machine learning to predict user behavior and provide ultra-fast search results across millions of SKU items.',
    technologies: ['React', 'Next.js', 'Python', 'ElasticSearch'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/shop.vtt'
  },
  {
    id: '9',
    title: 'MediVision Diagnosis',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366fd9?auto=format&fit=crop&q=80&w=800&fm=webp',
    description: 'AI-powered diagnostic imaging assistant for radiologists.',
    fullDescription: 'A deep-learning application that assists medical professionals in identifying anomalies in X-rays and MRIs with 94% accuracy, integrated into existing hospital PACS systems.',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'AWS'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    captionsUrl: 'https://storage.googleapis.com/caption-demo/med.vtt'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechFlow Global',
    content: "OITS Dhaka is not just a vendor; they are our technology partners. Their ability to translate complex requirements into clean code is exceptional.",
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 't2',
    name: 'Rahat Ahmed',
    role: 'Founder',
    company: 'Pathao (Demo)',
    content: "The engineering discipline and communication standard maintained by OITS Dhaka helped us ship our MVP weeks ahead of schedule.",
    avatar: 'https://i.pravatar.cc/150?u=rahat',
  },
];

export const TECH_STACK = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Docker", "Flutter", "PostgreSQL", "Go", "Kubernetes"
];

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Three.js']
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Node.js', 'Python', 'Go', 'NestJS', 'PostgreSQL', 'Redis', 'GraphQL']
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD']
  }
];