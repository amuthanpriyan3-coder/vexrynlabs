import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'WEB DEVELOPMENT',
    tagline: 'High-performance digital flagship platforms',
    description: 'Modern, responsive and high-performance websites built for businesses and brands.',
    capabilities: [
      'Custom Full-Stack Web Applications',
      'Corporate & Brand Flagship Sites',
      'High-Conversion E-Commerce & Portals',
      'Performance Optimization & Core Web Vitals',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    icon: 'globe',
  },
  {
    id: 'app-development',
    number: '02',
    title: 'APP DEVELOPMENT',
    tagline: 'Intuitive, scalable native & cross-platform apps',
    description: 'Clean and scalable mobile applications designed around real-world needs.',
    capabilities: [
      'Cross-Platform iOS & Android Systems',
      'Fluid Micro-Interactions & Gestures',
      'Offline-First Local Storage & Sync',
      'Cloud Integration & Real-time Backends',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    icon: 'smartphone',
  },
  {
    id: 'automation',
    number: '03',
    title: 'AUTOMATION & SMART SYSTEMS',
    tagline: 'AI • IOT • EMBEDDED • FINAL YEAR PROJECTS',
    description: 'From college final-year projects to real-world smart systems, we build custom technology solutions that combine hardware, software and automation.',
    capabilities: [
      'IoT & Smart Device Projects',
      'ESP32 / Arduino Based Systems',
      'AI & Machine Learning Projects',
      'Embedded & Robotics Solutions',
      'College Final Year Projects',
      'Custom Automation Systems',
    ],
    technologies: ['ESP32', 'Arduino', 'IoT', 'AI / ML', 'Robotics', 'Python'],
    icon: 'cpu',
  },
];
