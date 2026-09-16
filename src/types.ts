export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  icon: 'globe' | 'smartphone' | 'cpu';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'mobile' | 'automation';
  categoryLabel: string;
  description: string;
  fullOverview: string;
  deliverables: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  image: string;
  featured?: boolean;
  liveUrl?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange?: string;
  message: string;
}
