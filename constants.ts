
import { Service, Project, Testimonial, NavItem, SectionId, TechDomain, ProcessStep } from './types';

export const COMPANY_NAME = "OITS Dhaka";
export const TAGLINE = "Empowering Businesses Through Advanced Engineering";
export const CONTACT_EMAIL = "info@oitsdhaka.com";
export const ADDRESS = "House # 42, Road # 2/A, Block # Z, Dhaka 1209, Bangladesh";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: `#${SectionId.HOME}` },
  { label: 'Services', href: `#${SectionId.SERVICES}` },
  { label: 'Workflow', href: `#${SectionId.PROCESS}` },
  { label: 'Portfolio', href: `#${SectionId.PORTFOLIO}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
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
    description: 'Scalable, high-performance web applications built for business logic and seamless integration.',
    icon: 'Globe',
    features: ['React & Next.js Experts', 'SaaS Architecture', 'E-commerce Engine', 'Custom CMS'],
  },
  {
    id: 'mobile-dev',
    title: 'Native Mobile Apps',
    description: 'High-fidelity iOS and Android applications that deliver native-grade performance and fluid UX.',
    icon: 'Smartphone',
    features: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter'],
  },
  {
    id: 'dedicated-teams',
    title: 'Dedicated Teams',
    description: 'Expand your engineering capacity with our highly skilled full-time developers and designers.',
    icon: 'Users',
    features: ['Staff Augmentation', 'Project Management', 'Full-stack Experts', 'Agile Setup'],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    description: 'Robust AWS/GCP infrastructure with automated CI/CD pipelines and high availability.',
    icon: 'Cloud',
    features: ['AWS / GCP / Azure', 'DevOps Automation', 'Cybersecurity', 'Database Tuning'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinTech Analytics Hub',
    category: 'Enterprise Software',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366fd9?auto=format&fit=crop&q=80&w=1000',
    description: 'A comprehensive financial analytics dashboard for real-time market tracking.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: '2',
    title: 'Luma Healthcare App',
    category: 'Mobile Application',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
    description: 'A HIPAA-compliant telemedicine platform with secure video conferencing.',
    technologies: ['Flutter', 'Firebase', 'WebRTC'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '3',
    title: 'Global Logistics Engine',
    category: 'Supply Chain',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    description: 'AI-driven logistics platform managing complex global supply chains.',
    technologies: ['Next.js', 'Python', 'AWS SageMaker'],
    demoVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
