export type Service = {
  slug: string
  title: string
  description: string
  capabilities: string[]
  relatedSlugs: string[]
}

const services: Service[] = [
  {
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Application Development',
    description:
      'We design and develop scalable, secure, and high-performance web applications tailored to your business needs.',
    capabilities: [
      'Custom Web App Development (Frontend + Backend)',
      'REST API & GraphQL Development',
      'SaaS Product Development',
      'Role-Based Dashboards & Admin Portals',
      'Authentication Systems (JWT, OAuth)',
      'Progressive Web Apps (PWA)',
      'Cloud Deployment & Scaling',
    ],
    relatedSlugs: ['system-architecture', 'database-architecture', 'custom-website-design'],
  },
  {
    slug: 'system-architecture',
    title: 'System Architecture & Infrastructure Design',
    description:
      'We engineer systems built for scale, security, and long-term performance.',
    capabilities: [
      'Cloud Infrastructure Design (AWS, GCP, Azure)',
      'API Architecture & Microservices',
      'Monolith-to-Microservices Transition',
      'Load Balancing & High Availability',
      'CI/CD Pipeline Setup',
      'DevOps Strategy',
      'Security Architecture Planning',
      'Performance Engineering',
    ],
    relatedSlugs: ['full-stack-web-development', 'database-architecture', 'code-audits'],
  },
  {
    slug: 'database-architecture',
    title: 'Database Architecture & Management',
    description:
      'Structured, optimized, and scalable data systems designed for reliability and growth.',
    capabilities: [
      'Database Design & Schema Planning',
      'Performance Tuning & Index Optimization',
      'Backup & Recovery Planning',
      'Secure Data Storage',
      'Cloud Database Setup',
      'Ongoing Database Maintenance',
    ],
    relatedSlugs: ['system-architecture', 'data-migration', 'code-audits'],
  },
  {
    slug: 'data-migration',
    title: 'Data Migration & System Transitions',
    description:
      'Seamless, secure, zero-loss migrations from any system to any system.',
    capabilities: [
      'EMR to EMR Migration',
      'WordPress to Shopify Migration',
      'CRM Migrations',
      'Legacy System Modernization',
      'Hosting Migration',
      'Email Marketing Platform Transitions',
      'Accounting Software Migrations',
    ],
    relatedSlugs: ['database-architecture', 'business-process-automation', 'ecommerce-solutions'],
  },
  {
    slug: 'custom-website-design',
    title: 'Custom Website Design & Modern Development',
    description:
      'High-performance, conversion-focused digital experiences built for your brand.',
    capabilities: [
      'Custom UI/UX Design',
      'Responsive & Mobile-Optimized Layouts',
      'SEO-Optimized Structure',
      'ADA Accessibility Compliance',
      'Custom Animations & Interactive UI',
      'CMS Integration',
      'Landing Page Optimization',
      'Shopify, WordPress, Wix, Headless CMS, Custom Frameworks',
    ],
    relatedSlugs: ['full-stack-web-development', 'ecommerce-solutions', 'marketing-technology'],
  },
  {
    slug: 'ecommerce-solutions',
    title: 'E-Commerce Solutions & Platform Integration',
    description:
      'End-to-end eCommerce architecture and automation for modern online businesses.',
    capabilities: [
      'Shopify Custom Apps & Checkout Customization',
      'WooCommerce & Wix eCommerce',
      'ShipStation, QuickBooks, Stripe/Square Integration',
      'Subscription Platforms',
      'Multi-Vendor Commission Systems',
      'Automated Payout Systems',
      'Inventory Management Systems',
      'Accounting Sync & Reporting Automation',
      'POS Integrations',
    ],
    relatedSlugs: ['custom-website-design', 'data-migration', 'marketing-technology'],
  },
  {
    slug: 'ai-integration',
    title: 'AI Integration & Intelligent Automation',
    description:
      'Modern businesses need intelligent systems. We build and integrate them.',
    capabilities: [
      'AI Chatbots & Support Systems',
      'OpenAI API Integrations',
      'Predictive Analytics',
      'AI Sales Assistants',
      'Workflow Automation',
      'AI Content & Marketing Tools',
      'Machine Learning Deployment',
      'Data Classification Systems',
    ],
    relatedSlugs: ['business-process-automation', 'marketing-technology', 'full-stack-web-development'],
  },
  {
    slug: 'marketing-technology',
    title: 'Marketing Technology & Growth Systems',
    description:
      'We build full marketing ecosystems — from email automation to paid ads and SEO.',
    capabilities: [
      'Mailchimp, Klaviyo, HubSpot, ActiveCampaign, ConvertKit, Brevo',
      'Google Ads, Meta Ads, TikTok Ads, YouTube Ads, LinkedIn Ads',
      'Technical & On-Page SEO',
      'Schema Markup & GA4 Setup',
      'Conversion Tracking & Funnel Optimization',
      'A/B Testing & Heatmaps',
    ],
    relatedSlugs: ['ai-integration', 'ecommerce-solutions', 'custom-website-design'],
  },
  {
    slug: 'code-audits',
    title: 'Code Audits & Technical Reviews',
    description:
      'We analyze and improve existing systems to ensure stability, security, and scalability.',
    capabilities: [
      'Full Codebase Review',
      'Security Vulnerability Assessment',
      'Performance Bottleneck Identification',
      'Refactoring Strategy',
      'Architecture Evaluation',
      'Technical Debt Assessment',
      'Compliance & Best Practices Review',
    ],
    relatedSlugs: ['system-architecture', 'database-architecture', 'technical-documentation'],
  },
  {
    slug: 'technical-documentation',
    title: 'Technical Documentation & System Documentation',
    description:
      'Clear documentation ensures your team can scale without dependency risk.',
    capabilities: [
      'API Documentation',
      'System Architecture Diagrams',
      'Database Schema Documentation',
      'Developer Onboarding Guides',
      'Deployment & DevOps Documentation',
      'SOP Documentation',
      'User Manuals',
      'Internal Knowledge Base Setup',
    ],
    relatedSlugs: ['code-audits', 'staff-training', 'system-architecture'],
  },
  {
    slug: 'staff-training',
    title: 'Staff Training & Technical Workshops',
    description:
      'We empower teams to operate independently and confidently with their tools and systems.',
    capabilities: [
      'Platform Training (Shopify, WordPress, CRM systems)',
      'Marketing Tool Training (Klaviyo, Mailchimp, Google Ads)',
      'Internal Software Training',
      'Developer Onboarding Workshops',
      'Cybersecurity Best Practices',
      'Workflow Automation Training',
      'Live Workshops, On-Site & Virtual Sessions',
      'Recorded Training Modules',
    ],
    relatedSlugs: ['technical-documentation', 'business-process-automation', 'marketing-technology'],
  },
  {
    slug: 'business-process-automation',
    title: 'Business Process Automation & Digital Transformation',
    description:
      'We streamline operations and reduce overhead through intelligent automation.',
    capabilities: [
      'Workflow Automation (Zapier, Make)',
      'CRM Automation',
      'Lead Scoring Systems',
      'Reporting Dashboards',
      'Internal KPI Tracking',
      'Digital Transformation Strategy',
      'Cost Reduction Optimization',
    ],
    relatedSlugs: ['ai-integration', 'data-migration', 'staff-training'],
  },
]

export function getAllServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug)
  if (!service) return []
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => s !== undefined)
}
