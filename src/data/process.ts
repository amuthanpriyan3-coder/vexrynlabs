import { ProcessStep } from '../types';

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the idea, requirements and goals.',
    details: [
      'Understand your idea and requirements',
      'Define features, scope and goals',
      'Plan the right solution',
    ],
    iconName: 'compass',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Plan the interface, features and overall experience.',
    details: [
      'User-friendly UI and experience',
      'Feature and system planning',
      'Responsive and practical design',
    ],
    iconName: 'layout',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Build the solution using the right technology.',
    details: [
      'Web, mobile, AI, IoT and embedded development',
      'Hardware and software integration when required',
      'Testing and continuous improvement',
    ],
    iconName: 'code',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Test, launch and support the final solution.',
    details: [
      'Final testing and quality checks',
      'Deployment and project handover',
      'Post-launch support and improvements',
    ],
    iconName: 'rocket',
  },
];
