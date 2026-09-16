import { ProjectItem } from '../types';

const encodeSvg = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

export const projectsData: ProjectItem[] = [
  // -------------------------------------------------------------
  // WEB PROJECTS (3)
  // -------------------------------------------------------------
  {
    id: 'business-website',
    title: 'Business Website',
    subtitle: 'Modern Brand Presence & Lead Generation',
    category: 'web',
    categoryLabel: 'WEB DEVELOPMENT',
    description: 'Modern responsive website for a local business or brand.',
    fullOverview: 'Custom-designed responsive website tailored to establish credibility, communicate brand identity, and convert visitors into clients. Built with blazing fast page performance, intuitive layout hierarchy, and search engine optimization.',
    deliverables: [
      'Responsive design across mobile, tablet, and desktop',
      'SEO-optimized architecture with high-speed performance',
      'Contact form integration with automated email notifications',
      'Custom branding alignment and fast content management setup',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'PLATFORM', value: 'WEB / MOBILE' },
      { label: 'LOAD TIME', value: '< 0.8s' },
      { label: 'ARCHITECTURE', value: 'NEXT.JS' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="70" y="50" width="660" height="400" fill="#0D0D0D" stroke="#1E1E1E" stroke-width="1.5"/>
        <rect x="70" y="50" width="660" height="36" fill="#121212"/>
        <circle cx="95" cy="68" r="4" fill="#333333"/>
        <circle cx="110" cy="68" r="4" fill="#333333"/>
        <circle cx="125" cy="68" r="4" fill="#333333"/>
        <rect x="150" y="60" width="280" height="16" fill="#181818" stroke="#222222"/>
        <text x="165" y="72" fill="#666666" font-family="monospace" font-size="9">https://client-business.com</text>
        <rect x="110" y="120" width="100" height="10" fill="#CCFF00"/>
        <text x="110" y="170" fill="#FFFFFF" font-family="sans-serif" font-size="24" font-weight="900" letter-spacing="1">MODERN BUSINESS PRESENCE</text>
        <text x="110" y="200" fill="#888888" font-family="sans-serif" font-size="13">High-conversion layout engineered for real-world growth.</text>
        <rect x="110" y="230" width="130" height="36" fill="#CCFF00"/>
        <text x="135" y="253" fill="#000000" font-family="sans-serif" font-size="11" font-weight="bold">GET IN TOUCH</text>
        <rect x="255" y="230" width="110" height="36" fill="#161616" stroke="#262626"/>
        <text x="275" y="253" fill="#FFFFFF" font-family="sans-serif" font-size="11">SERVICES</text>
        <g transform="translate(110, 300)">
          <rect x="0" y="0" width="170" height="110" fill="#111111" stroke="#1E1E1E"/>
          <rect x="15" y="20" width="30" height="4" fill="#CCFF00"/>
          <text x="15" y="45" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Core Service A</text>
          <text x="15" y="70" fill="#666666" font-family="sans-serif" font-size="10">Fast response design</text>
          <rect x="195" y="0" width="170" height="110" fill="#111111" stroke="#1E1E1E"/>
          <rect x="210" y="20" width="30" height="4" fill="#CCFF00"/>
          <text x="210" y="45" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Core Service B</text>
          <text x="210" y="70" fill="#666666" font-family="sans-serif" font-size="10">Engineered clarity</text>
          <rect x="390" y="0" width="170" height="110" fill="#111111" stroke="#1E1E1E"/>
          <rect x="405" y="20" width="30" height="4" fill="#CCFF00"/>
          <text x="405" y="45" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Client Proof</text>
          <text x="405" y="70" fill="#666666" font-family="sans-serif" font-size="10">Verified credibility</text>
        </g>
      </svg>
    `),
  },
  {
    id: 'ecommerce-website',
    title: 'E-Commerce Website',
    subtitle: 'High-Performance Online Store & Checkout',
    category: 'web',
    categoryLabel: 'WEB DEVELOPMENT',
    description: 'Online store with product showcase, cart, checkout and responsive design.',
    fullOverview: 'Complete e-commerce store architecture built to deliver a seamless shopping experience. Features streamlined product catalog filtering, interactive cart state, secure payment checkout flows, and mobile-first responsive interfaces.',
    deliverables: [
      'Interactive product catalog with fast search and category filtering',
      'Persistent cart management and friction-free checkout flow',
      'Secure payment gateway and transactional order processing',
      'Inventory database modeling and administrative order views',
    ],
    technologies: ['React', 'Node.js', 'Database'],
    metrics: [
      { label: 'PLATFORM', value: 'FULL-STACK' },
      { label: 'CHECKOUT', value: 'OPTIMIZED' },
      { label: 'RESPONSIVE', value: '100% MOBILE' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="60" y="50" width="680" height="400" fill="#0D0D0D" stroke="#1E1E1E" stroke-width="1.5"/>
        <rect x="60" y="50" width="680" height="40" fill="#111111"/>
        <text x="90" y="75" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="900">STORE<tspan fill="#CCFF00">FRONT</tspan></text>
        <rect x="230" y="60" width="220" height="20" fill="#181818" stroke="#222222"/>
        <text x="245" y="74" fill="#666666" font-family="sans-serif" font-size="10">Search catalog...</text>
        <rect x="630" y="60" width="80" height="20" fill="#1A1A1A" stroke="#2A2A2A"/>
        <text x="645" y="74" fill="#CCFF00" font-family="monospace" font-size="10">CART (3)</text>
        <g transform="translate(90, 110)">
          <rect x="0" y="0" width="180" height="220" fill="#111111" stroke="#1E1E1E"/>
          <rect x="20" y="20" width="140" height="110" fill="#181818"/>
          <circle cx="90" cy="75" r="28" fill="#222222"/>
          <path d="M 75 75 L 105 75" stroke="#CCFF00" stroke-width="2"/>
          <text x="20" y="155" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Product Item 01</text>
          <text x="20" y="175" fill="#CCFF00" font-family="monospace" font-size="12" font-weight="bold">$120.00</text>
          <rect x="20" y="188" width="140" height="22" fill="#1C1C1C" stroke="#2A2A2A"/>
          <text x="60" y="203" fill="#888888" font-family="sans-serif" font-size="9">ADD TO CART</text>
          <rect x="210" y="0" width="180" height="220" fill="#111111" stroke="#1E1E1E"/>
          <rect x="230" y="20" width="140" height="110" fill="#181818"/>
          <rect x="260" y="55" width="80" height="40" fill="#222222"/>
          <text x="230" y="155" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Product Item 02</text>
          <text x="230" y="175" fill="#CCFF00" font-family="monospace" font-size="12" font-weight="bold">$85.00</text>
          <rect x="230" y="188" width="140" height="22" fill="#1C1C1C" stroke="#2A2A2A"/>
          <text x="270" y="203" fill="#888888" font-family="sans-serif" font-size="9">ADD TO CART</text>
          <rect x="420" y="0" width="180" height="220" fill="#111111" stroke="#1E1E1E"/>
          <rect x="440" y="20" width="140" height="110" fill="#181818"/>
          <circle cx="510" cy="75" r="28" fill="#222222"/>
          <text x="440" y="155" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Product Item 03</text>
          <text x="440" y="175" fill="#CCFF00" font-family="monospace" font-size="12" font-weight="bold">$195.00</text>
          <rect x="440" y="188" width="140" height="22" fill="#CCFF00"/>
          <text x="475" y="203" fill="#000000" font-family="sans-serif" font-size="9" font-weight="bold">IN STOCK</text>
        </g>
        <rect x="90" y="350" width="600" height="70" fill="#111111" stroke="#1E1E1E"/>
        <text x="120" y="380" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">CHECKOUT TELEMETRY</text>
        <text x="120" y="400" fill="#666666" font-family="monospace" font-size="10">SECURE ENCRYPTION // STRIPE INTEGRATION // INSTANT INVOICING</text>
        <rect x="540" y="365" width="120" height="36" fill="#CCFF00"/>
        <text x="560" y="388" fill="#000000" font-family="sans-serif" font-size="11" font-weight="bold">CHECKOUT</text>
      </svg>
    `),
  },
  {
    id: 'portfolio-brand-website',
    title: 'Portfolio & Brand Website',
    subtitle: 'Immersive Identity & Creative Showcase',
    category: 'web',
    categoryLabel: 'WEB DEVELOPMENT',
    description: 'Premium portfolio and brand website designed to build a strong online presence.',
    fullOverview: 'An immersive digital showcase designed for creative studios, executives, architects, and forward-thinking brands. Combines bold typographic hierarchy with fluid micro-interactions and smooth page transitions.',
    deliverables: [
      'Tailored visual identity showcase with high-definition typography',
      'Fluid project showcase galleries with responsive aspect ratios',
      'Smooth micro-interactions and performant entrance animations',
      'Clean direct client inquiry and collaboration module',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'DESIGN', value: 'BESPOKE' },
      { label: 'FRAMEWORK', value: 'NEXT.JS' },
      { label: 'AESTHETIC', value: 'MINIMALIST' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="60" y="50" width="680" height="400" fill="#0C0C0C" stroke="#1F1F1F" stroke-width="1.5"/>
        <rect x="60" y="50" width="680" height="36" fill="#121212"/>
        <circle cx="85" cy="68" r="4" fill="#333333"/>
        <circle cx="100" cy="68" r="4" fill="#333333"/>
        <circle cx="115" cy="68" r="4" fill="#333333"/>
        <text x="620" y="72" fill="#888888" font-family="monospace" font-size="10">PORTFOLIO // 2026</text>
        <text x="100" y="150" fill="#FFFFFF" font-family="sans-serif" font-size="32" font-weight="900" letter-spacing="-1">CREATIVE STUDIO</text>
        <text x="100" y="180" fill="#666666" font-family="sans-serif" font-size="14">Design direction, visual engineering &amp; digital craft.</text>
        <line x1="100" y1="205" x2="700" y2="205" stroke="#1E1E1E"/>
        <g transform="translate(100, 230)">
          <rect x="0" y="0" width="180" height="180" fill="#141414" stroke="#222222"/>
          <rect x="15" y="15" width="150" height="90" fill="#1B1B1B"/>
          <text x="15" y="130" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Identity Series 01</text>
          <text x="15" y="150" fill="#666666" font-family="monospace" font-size="10">BRAND DIRECTION</text>
          <circle cx="150" cy="140" r="8" fill="#CCFF00"/>
          <rect x="210" y="0" width="180" height="180" fill="#141414" stroke="#222222"/>
          <rect x="225" y="15" width="150" height="90" fill="#1B1B1B"/>
          <text x="225" y="130" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Editorial Works</text>
          <text x="225" y="150" fill="#666666" font-family="monospace" font-size="10">TYPOGRAPHY</text>
          <rect x="420" y="0" width="180" height="180" fill="#141414" stroke="#222222"/>
          <rect x="435" y="15" width="150" height="90" fill="#1B1B1B"/>
          <text x="435" y="130" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Digital Experience</text>
          <text x="435" y="150" fill="#CCFF00" font-family="monospace" font-size="10">INTERACTION</text>
        </g>
      </svg>
    `),
  },

  // -------------------------------------------------------------
  // MOBILE PROJECTS (3)
  // -------------------------------------------------------------
  {
    id: 'business-mobile-app',
    title: 'Business Mobile App',
    subtitle: 'Cross-Platform Enterprise Operations & Field Tool',
    category: 'mobile',
    categoryLabel: 'APP DEVELOPMENT',
    description: 'Custom Android and cross-platform mobile application built around real business needs.',
    fullOverview: 'A cross-platform mobile solution tailored for commercial operations, staff coordination, and live business telemetry. Built with React Native to deliver fluid 60fps performance, offline resilience, and Firebase cloud data synchronization.',
    deliverables: [
      'Cross-platform deployment across Android and iOS ecosystems',
      'Real-time cloud database synchronization via Firebase',
      'Secure user authentication with role-based feature gating',
      'Offline-first caching and automatic background data sync',
    ],
    technologies: ['React Native', 'Firebase'],
    metrics: [
      { label: 'PLATFORM', value: 'ANDROID & iOS' },
      { label: 'BACKEND', value: 'FIREBASE' },
      { label: 'PERFORMANCE', value: '60 FPS' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <g transform="translate(290, 40)">
          <rect x="0" y="0" width="220" height="420" rx="28" fill="#0D0D0D" stroke="#222222" stroke-width="2"/>
          <rect x="70" y="14" width="80" height="12" rx="6" fill="#1A1A1A"/>
          <rect x="20" y="45" width="180" height="50" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="68" fill="#888888" font-family="sans-serif" font-size="10">OPERATIONS CONSOLE</text>
          <text x="35" y="86" fill="#FFFFFF" font-family="monospace" font-size="12" font-weight="bold">ACTIVE PIPELINE</text>
          <circle cx="180" cy="70" r="4" fill="#CCFF00"/>
          <rect x="20" y="110" width="180" height="110" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="132" fill="#888888" font-family="sans-serif" font-size="10">WEEKLY METRICS</text>
          <path d="M 35 185 L 65 160 L 95 175 L 125 145 L 155 165 L 185 135" fill="none" stroke="#CCFF00" stroke-width="2"/>
          <circle cx="185" cy="135" r="3" fill="#CCFF00"/>
          <rect x="20" y="235" width="180" height="110" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="258" fill="#888888" font-family="sans-serif" font-size="10">TEAM STATUS</text>
          <rect x="35" y="272" width="150" height="24" fill="#1A1A1A"/>
          <text x="45" y="288" fill="#CCCCCC" font-family="monospace" font-size="10">Field Dispatch // OK</text>
          <rect x="35" y="304" width="150" height="24" fill="#1A1A1A"/>
          <text x="45" y="320" fill="#CCFF00" font-family="monospace" font-size="10">Cloud Sync // Connected</text>
          <rect x="85" y="395" width="50" height="4" rx="2" fill="#333333"/>
        </g>
        <text x="80" y="240" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="900">MOBILE</text>
        <text x="80" y="265" fill="#CCFF00" font-family="monospace" font-size="12">ENGINEERED FOR FIELD USE</text>
      </svg>
    `),
  },
  {
    id: 'student-college-app',
    title: 'Student / College App',
    subtitle: 'Campus Operations, Schedule & Attendance',
    category: 'mobile',
    categoryLabel: 'APP DEVELOPMENT',
    description: 'Practical mobile application designed for students, institutions and campus use.',
    fullOverview: 'Engineered specifically for colleges and educational institutions. Offers student profiles, daily timetables, real-time campus notices, attendance status, and automated push notifications powered by a robust Firebase cloud architecture.',
    deliverables: [
      'Interactive daily timetable and schedule reminder alerts',
      'Attendance tracking dashboard with calculation metrics',
      'Institutional noticeboard with instant push notifications',
      'Student identity verification and offline access support',
    ],
    technologies: ['React Native', 'Firebase'],
    metrics: [
      { label: 'AUDIENCE', value: 'CAMPUS & STUDENTS' },
      { label: 'PERSISTENCE', value: 'FIREBASE' },
      { label: 'NOTIFICATIONS', value: 'INTEGRATED' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <g transform="translate(290, 40)">
          <rect x="0" y="0" width="220" height="420" rx="28" fill="#0D0D0D" stroke="#222222" stroke-width="2"/>
          <rect x="70" y="14" width="80" height="12" rx="6" fill="#1A1A1A"/>
          <text x="25" y="60" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">CAMPUS PORTAL</text>
          <text x="25" y="75" fill="#888888" font-family="monospace" font-size="9">ROLL NO: #2026-ENG</text>
          <rect x="20" y="90" width="180" height="75" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="112" fill="#888888" font-family="sans-serif" font-size="10">ATTENDANCE BENCHMARK</text>
          <text x="35" y="138" fill="#CCFF00" font-family="monospace" font-size="20" font-weight="bold">88.5%</text>
          <text x="110" y="138" fill="#666666" font-family="sans-serif" font-size="9">ELIGIBLE FOR EXAMS</text>
          <rect x="20" y="180" width="180" height="160" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="202" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">SCHEDULE</text>
          <rect x="35" y="215" width="150" height="34" fill="#1A1A1A"/>
          <text x="45" y="230" fill="#FFFFFF" font-family="sans-serif" font-size="10">09:00 - Data Structures</text>
          <text x="45" y="242" fill="#CCFF00" font-family="monospace" font-size="8">ROOM 302 // ATTENDED</text>
          <rect x="35" y="258" width="150" height="34" fill="#1A1A1A"/>
          <text x="45" y="273" fill="#FFFFFF" font-family="sans-serif" font-size="10">11:30 - Microcontrollers</text>
          <text x="45" y="285" fill="#888888" font-family="monospace" font-size="8">LAB B // UPCOMING</text>
          <rect x="35" y="300" width="150" height="26" fill="#1A1A1A"/>
          <text x="45" y="316" fill="#CCCCCC" font-family="sans-serif" font-size="9">Notice: Seminar at 3PM</text>
          <rect x="85" y="395" width="50" height="4" rx="2" fill="#333333"/>
        </g>
        <text x="560" y="240" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="900">COLLEGE</text>
        <text x="560" y="265" fill="#CCFF00" font-family="monospace" font-size="12">CAMPUS SYSTEM</text>
      </svg>
    `),
  },
  {
    id: 'custom-utility-app',
    title: 'Custom Utility App',
    subtitle: 'Problem-Solving Mobile Utility & Task Engine',
    category: 'mobile',
    categoryLabel: 'APP DEVELOPMENT',
    description: 'Custom mobile application designed to solve a specific real-world problem.',
    fullOverview: 'Targeted mobile utility app built to streamline daily workflows, sensor readings, or specialized calculations. Features clean UX ergonomics, local-first offline state persistence, and seamless cloud syncing via Firebase.',
    deliverables: [
      'Problem-tailored user experience with minimal cognitive overhead',
      'Local-first encrypted data storage and background sync',
      'Intuitive input controls and responsive action triggers',
      'Modular clean architecture ready for feature expansion',
    ],
    technologies: ['Flutter', 'Firebase'],
    metrics: [
      { label: 'FRAMEWORK', value: 'FLUTTER' },
      { label: 'SYNC', value: 'FIREBASE' },
      { label: 'OFFLINE', value: 'SUPPORTED' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <g transform="translate(290, 40)">
          <rect x="0" y="0" width="220" height="420" rx="28" fill="#0D0D0D" stroke="#222222" stroke-width="2"/>
          <rect x="70" y="14" width="80" height="12" rx="6" fill="#1A1A1A"/>
          <text x="25" y="60" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">UTILITY ENGINE</text>
          <text x="25" y="75" fill="#888888" font-family="monospace" font-size="9">STATUS: ACTIVE // FLUTTER</text>
          <rect x="20" y="90" width="180" height="90" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="112" fill="#888888" font-family="sans-serif" font-size="10">ACTIVE CALCULATION</text>
          <text x="35" y="142" fill="#CCFF00" font-family="monospace" font-size="22" font-weight="bold">0.0042</text>
          <text x="120" y="142" fill="#888888" font-family="sans-serif" font-size="10">COEFFICIENT</text>
          <g transform="translate(20, 200)">
            <rect x="0" y="0" width="85" height="70" rx="6" fill="#141414" stroke="#1F1F1F"/>
            <text x="15" y="25" fill="#888888" font-family="sans-serif" font-size="9">MODE A</text>
            <circle cx="65" cy="22" r="5" fill="#CCFF00"/>
            <text x="15" y="52" fill="#FFFFFF" font-family="monospace" font-size="12" font-weight="bold">ACTIVE</text>
            <rect x="95" y="0" width="85" height="70" rx="6" fill="#141414" stroke="#1F1F1F"/>
            <text x="110" y="25" fill="#888888" font-family="sans-serif" font-size="9">MODE B</text>
            <circle cx="160" cy="22" r="5" fill="#333333"/>
            <text x="110" y="52" fill="#666666" font-family="monospace" font-size="12">IDLE</text>
          </g>
          <rect x="20" y="290" width="180" height="60" rx="8" fill="#141414" stroke="#1F1F1F"/>
          <text x="35" y="312" fill="#888888" font-family="sans-serif" font-size="10">OFFLINE PERSISTENCE</text>
          <text x="35" y="332" fill="#CCFF00" font-family="monospace" font-size="10">CACHED 100% LOCALLY</text>
          <rect x="85" y="395" width="50" height="4" rx="2" fill="#333333"/>
        </g>
      </svg>
    `),
  },

  // -------------------------------------------------------------
  // AUTOMATION PROJECTS (4)
  // -------------------------------------------------------------
  {
    id: 'smart-iot-system',
    title: 'Smart IoT System',
    subtitle: 'Hardware Sensor Telemetry & Remote Control',
    category: 'automation',
    categoryLabel: 'AUTOMATION',
    description: 'IoT-based smart system combining sensors, connectivity and automated control.',
    fullOverview: 'Complete Internet of Things (IoT) hardware-to-cloud ecosystem. Uses ESP32 microcontrollers to interface with environmental, proximity, and analog sensors, broadcasting metrics via MQTT to an interactive real-time telemetry dashboard.',
    deliverables: [
      'Firmware programming for ESP32 microcontroller architecture',
      'Multi-sensor data acquisition with noise filtering and calibration',
      'MQTT / WebSockets bidirectional cloud communication channel',
      'Automated threshold alert triggers and relay actuator control',
    ],
    technologies: ['ESP32', 'IoT', 'Sensors'],
    metrics: [
      { label: 'HARDWARE', value: 'ESP32 / MCU' },
      { label: 'PROTOCOL', value: 'MQTT / WS' },
      { label: 'MONITORING', value: 'REAL-TIME' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="80" y="60" width="640" height="380" fill="#0C0C0C" stroke="#1E1E1E" stroke-width="1.5"/>
        <rect x="80" y="60" width="640" height="36" fill="#121212"/>
        <text x="110" y="83" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">ESP32 // IOT TELEMETRY MATRIX</text>
        <circle cx="680" cy="78" r="4" fill="#CCFF00"/>
        <text x="635" y="82" fill="#CCFF00" font-family="monospace" font-size="9">ONLINE</text>
        <g transform="translate(120, 130)">
          <rect x="0" y="0" width="160" height="110" fill="#111111" stroke="#1F1F1F"/>
          <text x="20" y="30" fill="#888888" font-family="sans-serif" font-size="10">TEMPERATURE</text>
          <text x="20" y="65" fill="#CCFF00" font-family="monospace" font-size="24" font-weight="bold">24.6°C</text>
          <text x="20" y="90" fill="#555555" font-family="monospace" font-size="9">SENSOR: DHT22</text>
          <rect x="180" y="0" width="160" height="110" fill="#111111" stroke="#1F1F1F"/>
          <text x="200" y="30" fill="#888888" font-family="sans-serif" font-size="10">HUMIDITY</text>
          <text x="200" y="65" fill="#FFFFFF" font-family="monospace" font-size="24" font-weight="bold">56.2%</text>
          <text x="200" y="90" fill="#555555" font-family="monospace" font-size="9">RELATIVE LEVEL</text>
          <rect x="360" y="0" width="180" height="110" fill="#111111" stroke="#1F1F1F"/>
          <text x="380" y="30" fill="#888888" font-family="sans-serif" font-size="10">RELAY ACTUATOR</text>
          <text x="380" y="65" fill="#CCFF00" font-family="monospace" font-size="20" font-weight="bold">ENGAGED</text>
          <text x="380" y="90" fill="#555555" font-family="monospace" font-size="9">STATE: AUTO-SWITCH</text>
        </g>
        <rect x="120" y="270" width="540" height="130" fill="#111111" stroke="#1F1F1F"/>
        <text x="140" y="295" fill="#888888" font-family="sans-serif" font-size="10">LIVE SENSOR WAVEFORM (ADC BUFFER)</text>
        <path d="M 140 370 L 190 350 L 240 365 L 290 330 L 340 340 L 390 315 L 440 335 L 490 310 L 540 325 L 590 300 L 640 315" fill="none" stroke="#CCFF00" stroke-width="2"/>
        <circle cx="640" cy="315" r="4" fill="#CCFF00"/>
      </svg>
    `),
  },
  {
    id: 'ai-ml-project',
    title: 'AI & Machine Learning Project',
    subtitle: 'Automated Detection, Prediction & Data Intelligence',
    category: 'automation',
    categoryLabel: 'AUTOMATION',
    description: 'AI-powered solution designed to automate detection, prediction or decision-making.',
    fullOverview: 'Machine learning workflow and intelligent classification system. Implements Python-based predictive algorithms or computer vision pipelines to analyze raw inputs, extract features, and automate operational decisions without manual intervention.',
    deliverables: [
      'Data preprocessing, cleaning, and feature extraction pipeline',
      'Supervised / unsupervised machine learning model training',
      'Inference API endpoint for rapid prediction queries',
      'Performance evaluation metrics (precision, recall, F1-score)',
    ],
    technologies: ['Python', 'AI', 'Machine Learning'],
    metrics: [
      { label: 'LANGUAGE', value: 'PYTHON' },
      { label: 'MODEL TYPE', value: 'INFERENCE' },
      { label: 'ACCURACY', value: 'OPTIMIZED' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="80" y="60" width="640" height="380" fill="#0C0C0C" stroke="#1E1E1E" stroke-width="1.5"/>
        <rect x="80" y="60" width="640" height="36" fill="#121212"/>
        <text x="110" y="83" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">AI INFERENCE // NEURAL TOPOLOGY</text>
        <text x="600" y="83" fill="#CCFF00" font-family="monospace" font-size="10">PYTHON 3.11</text>
        <g stroke="#222222" stroke-width="1.5">
          <line x1="200" y1="180" x2="360" y2="150"/>
          <line x1="200" y1="180" x2="360" y2="230"/>
          <line x1="200" y1="180" x2="360" y2="310"/>
          <line x1="200" y1="260" x2="360" y2="150"/>
          <line x1="200" y1="260" x2="360" y2="230"/>
          <line x1="200" y1="260" x2="360" y2="310"/>
          <line x1="200" y1="340" x2="360" y2="150"/>
          <line x1="200" y1="340" x2="360" y2="230"/>
          <line x1="200" y1="340" x2="360" y2="310"/>
          <line x1="360" y1="150" x2="520" y2="200"/>
          <line x1="360" y1="230" x2="520" y2="200"/>
          <line x1="360" y1="310" x2="520" y2="200"/>
          <line x1="360" y1="150" x2="520" y2="280"/>
          <line x1="360" y1="230" x2="520" y2="280"/>
          <line x1="360" y1="310" x2="520" y2="280"/>
        </g>
        <circle cx="200" cy="180" r="14" fill="#141414" stroke="#333333"/>
        <circle cx="200" cy="260" r="14" fill="#141414" stroke="#333333"/>
        <circle cx="200" cy="340" r="14" fill="#141414" stroke="#333333"/>
        <text x="188" y="145" fill="#888888" font-family="monospace" font-size="9">INPUT</text>
        <circle cx="360" cy="150" r="14" fill="#141414" stroke="#CCFF00"/>
        <circle cx="360" cy="230" r="14" fill="#141414" stroke="#CCFF00"/>
        <circle cx="360" cy="310" r="14" fill="#141414" stroke="#CCFF00"/>
        <text x="330" y="115" fill="#CCFF00" font-family="monospace" font-size="9">HIDDEN LAYERS</text>
        <circle cx="520" cy="200" r="14" fill="#141414" stroke="#CCFF00" stroke-width="2"/>
        <circle cx="520" cy="280" r="14" fill="#141414" stroke="#333333"/>
        <text x="500" y="165" fill="#FFFFFF" font-family="monospace" font-size="9">OUTPUT</text>
        <rect x="560" y="180" width="120" height="40" fill="#111111" stroke="#222222"/>
        <text x="575" y="198" fill="#888888" font-family="sans-serif" font-size="9">CLASSIFICATION</text>
        <text x="575" y="212" fill="#CCFF00" font-family="monospace" font-size="11" font-weight="bold">CONFIDENCE: 98%</text>
        <rect x="120" y="390" width="560" height="30" fill="#111111" stroke="#1E1E1E"/>
        <text x="135" y="410" fill="#666666" font-family="monospace" font-size="10">AUTOMATED PREDICTIVE DECISION ENGINE // REAL-TIME INFERENCE</text>
      </svg>
    `),
  },
  {
    id: 'embedded-robotics-project',
    title: 'Embedded & Robotics Project',
    subtitle: 'Hardware Control, Actuators & Automation Logic',
    category: 'automation',
    categoryLabel: 'AUTOMATION',
    description: 'Custom embedded and robotics system combining hardware, software and intelligent automation.',
    fullOverview: 'Hardware-level embedded control system built around ESP32 or Arduino microcontrollers. Integrates motor drivers, ultrasonic range sensors, servo actuators, and automated logic controllers for physical robotics automation.',
    deliverables: [
      'Microcontroller schematic design and circuit assembly',
      'Pulse-width modulation (PWM) precision motor speed control',
      'Sensor-driven obstacle detection and autonomous pathing',
      'Hardware-level fail-safe protocols and power management',
    ],
    technologies: ['ESP32', 'Arduino', 'Embedded'],
    metrics: [
      { label: 'CONTROLLER', value: 'ESP32 / ARDUINO' },
      { label: 'ACTUATION', value: 'PWM / SERVO' },
      { label: 'HARDWARE', value: 'CUSTOM LOGIC' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="80" y="60" width="640" height="380" fill="#0C0C0C" stroke="#1E1E1E" stroke-width="1.5"/>
        <rect x="80" y="60" width="640" height="36" fill="#121212"/>
        <text x="110" y="83" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">ROBOTICS &amp; EMBEDDED // CIRCUIT BLUEPRINT</text>
        <text x="600" y="83" fill="#CCFF00" font-family="monospace" font-size="10">HARDWARE</text>
        <rect x="140" y="140" width="180" height="220" fill="#141414" stroke="#333333" stroke-width="1.5"/>
        <text x="165" y="175" fill="#CCFF00" font-family="monospace" font-size="14" font-weight="bold">MICROCONTROLLER</text>
        <text x="165" y="195" fill="#888888" font-family="monospace" font-size="10">ESP32 / ARDUINO</text>
        <g fill="#222222">
          <rect x="125" y="210" width="15" height="8"/>
          <rect x="125" y="230" width="15" height="8"/>
          <rect x="125" y="250" width="15" height="8"/>
          <rect x="125" y="270" width="15" height="8"/>
          <rect x="320" y="210" width="15" height="8"/>
          <rect x="320" y="230" width="15" height="8"/>
          <rect x="320" y="250" width="15" height="8"/>
          <rect x="320" y="270" width="15" height="8"/>
        </g>
        <g stroke="#CCFF00" stroke-width="1.5" fill="none">
          <path d="M 335 214 L 460 214 L 460 170 L 500 170"/>
          <path d="M 335 254 L 460 254 L 460 300 L 500 300"/>
        </g>
        <rect x="500" y="140" width="170" height="70" fill="#111111" stroke="#262626"/>
        <text x="520" y="165" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">MOTOR CONTROLLER</text>
        <text x="520" y="185" fill="#CCFF00" font-family="monospace" font-size="10">PWM LOGIC: 85%</text>
        <rect x="500" y="270" width="170" height="70" fill="#111111" stroke="#262626"/>
        <text x="520" y="295" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold">SENSOR ARRAY</text>
        <text x="520" y="315" fill="#888888" font-family="monospace" font-size="10">PROXIMITY: 45CM</text>
        <rect x="140" y="380" width="530" height="30" fill="#111111" stroke="#1E1E1E"/>
        <text x="160" y="400" fill="#666666" font-family="monospace" font-size="10">INTELLIGENT EMBEDDED AUTOMATION SYSTEM // VERIFIED HARDWARE</text>
      </svg>
    `),
  },
  {
    id: 'final-year-project-development',
    title: 'Final Year Project Development',
    subtitle: 'End-to-End College Final Year Technical Implementation',
    category: 'automation',
    categoryLabel: 'AUTOMATION',
    description: 'End-to-end development support for innovative college final-year projects involving AI, IoT, robotics and embedded systems.',
    fullOverview: 'Comprehensive technical guidance and execution for college final-year engineering projects. Covers concept validation, hardware circuit design, algorithm implementation in AI/IoT/Embedded systems, working prototype construction, and thorough technical documentation.',
    deliverables: [
      'Circuit design, hardware assembly, and sensor integration',
      'Core software codebase implementation (Python, C/C++, Embedded C)',
      'Web or mobile telemetry dashboard for live demonstration',
      'System flowcharts, block diagrams, and project documentation aid',
    ],
    technologies: ['AI', 'IoT', 'ESP32', 'Arduino'],
    metrics: [
      { label: 'SUPPORT', value: 'END-TO-END' },
      { label: 'DOMAIN', value: 'AI / IoT / ROBOTICS' },
      { label: 'EXECUTION', value: 'HARDWARE & CODE' },
    ],
    image: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#070707"/>
        <g stroke="#161616" stroke-width="1">
          <line x1="0" y1="100" x2="800" y2="100"/>
          <line x1="0" y1="200" x2="800" y2="200"/>
          <line x1="0" y1="300" x2="800" y2="300"/>
          <line x1="0" y1="400" x2="800" y2="400"/>
          <line x1="200" y1="0" x2="200" y2="500"/>
          <line x1="400" y1="0" x2="400" y2="500"/>
          <line x1="600" y1="0" x2="600" y2="500"/>
        </g>
        <rect x="80" y="60" width="640" height="380" fill="#0C0C0C" stroke="#1E1E1E" stroke-width="1.5"/>
        <rect x="80" y="60" width="640" height="36" fill="#121212"/>
        <text x="110" y="83" fill="#FFFFFF" font-family="monospace" font-size="11" font-weight="bold">FINAL YEAR CAPSTONE // SYSTEM ARCHITECTURE</text>
        <text x="590" y="83" fill="#CCFF00" font-family="monospace" font-size="10">COLLEGE / R&amp;D</text>
        <g transform="translate(110, 130)">
          <rect x="0" y="0" width="140" height="120" fill="#121212" stroke="#222222"/>
          <text x="20" y="30" fill="#CCFF00" font-family="monospace" font-size="10">PHASE 1</text>
          <text x="20" y="55" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Sensors &amp; MCU</text>
          <text x="20" y="75" fill="#888888" font-family="monospace" font-size="9">ESP32 / Arduino</text>
          <text x="20" y="95" fill="#555555" font-family="monospace" font-size="8">Data Capture</text>
          <path d="M 140 60 L 180 60" stroke="#CCFF00" stroke-width="2"/>
          <rect x="180" y="0" width="140" height="120" fill="#121212" stroke="#CCFF00" stroke-width="1.5"/>
          <text x="200" y="30" fill="#CCFF00" font-family="monospace" font-size="10">PHASE 2</text>
          <text x="200" y="55" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">AI / Logic Layer</text>
          <text x="200" y="75" fill="#888888" font-family="monospace" font-size="9">Python / Model</text>
          <text x="200" y="95" fill="#CCFF00" font-family="monospace" font-size="8">Processing</text>
          <path d="M 320 60 L 360 60" stroke="#CCFF00" stroke-width="2"/>
          <rect x="360" y="0" width="140" height="120" fill="#121212" stroke="#222222"/>
          <text x="380" y="30" fill="#CCFF00" font-family="monospace" font-size="10">PHASE 3</text>
          <text x="380" y="55" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Cloud &amp; UI</text>
          <text x="380" y="75" fill="#888888" font-family="monospace" font-size="9">Web / Mobile</text>
          <text x="380" y="95" fill="#555555" font-family="monospace" font-size="8">Live Demo</text>
        </g>
        <rect x="110" y="280" width="580" height="120" fill="#111111" stroke="#1E1E1E"/>
        <text x="130" y="310" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">COMPLETE PROJECT DELIVERABLE PACKAGE</text>
        <g transform="translate(130, 330)">
          <text x="0" y="0" fill="#CCFF00" font-family="monospace" font-size="10">[✓] Working Hardware Prototype</text>
          <text x="260" y="0" fill="#CCFF00" font-family="monospace" font-size="10">[✓] Source Code with Comments</text>
          <text x="0" y="24" fill="#CCFF00" font-family="monospace" font-size="10">[✓] Technical Circuit Schematics</text>
          <text x="260" y="24" fill="#CCFF00" font-family="monospace" font-size="10">[✓] Comprehensive Documentation</text>
        </g>
      </svg>
    `),
  },
];
