export type CapabilityCard = {
  iconName: string;
  title: string;
  description: string;
  highlighted?: boolean;
  features?: string[];
};

export type ServiceUseCase = {
  tabLabel: string;
  tabSub: string;
  logoSrc?: string;
  projectTitle: string;
  subtitle?: string;
  visualimg?: string;
  visualSrc?: string;
  siteUrl?: string;
  description: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  ctaLabel: string;
};

export type ServiceData = {
  meta: {
    title: string;
    description: string;
    canonicalUrl?: string;
  };
  hero: {
    image?: string;
    imageAlt?: string;
    tagline: string;
    tagline2?: string;
    tagline3?: string;
    description: string;
    ctaButtons?: string[];
  };
  intro: {
    sectionLabel: string;
    title: string;
    paragraphs: string[];
  };
  capabilities: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    cards: CapabilityCard[];
  };
  scale: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    cards: CapabilityCard[];
  };
  useCases: {
    sectionLabel: string;
    title: string;
    cases: ServiceUseCase[];
  };
  cta?: {
    title: string;
    content: string;
    buttons: string[];
  };
  faq?: {
    question: string;
    answer: string;
  }[];
};

export const servicesData: Record<string, ServiceData> = {
  "core-engineering-application-architecture": {
    meta: {
      title: "Custom Software Development & SaaS Engineering Services",
      description:
        "Beno Support delivers scalable custom software development, SaaS engineering, API architecture, and microservices solutions for startups, SMBs, and enterprises.",
      canonicalUrl: "/services/core-engineering-application-architecture",
    },
    hero: {
      image: "/assets/services/core_engineering.svg",
      imageAlt: "Software development company",
      tagline: "Engineered ",
      tagline2: "for Scale. ",
      tagline3: "Built for Innovation.",
      description:
        "We engineer resilient SaaS platforms, cloud-native architectures, and enterprise applications that power modern business growth.",
      ctaButtons: ["Request a Proposal", "Talk To Our Experts"],
    },
    intro: {
      sectionLabel: "Intro",
      title: "BEYOND CODE: HIGH-PERFORMANCE SOFTWARE ENGINEERING",
      paragraphs: [
        "Modern businesses require more than software development — they require scalable engineering systems built for performance, security, and continuous innovation .",
        " At Beno Support, we help organizations develop cloud-native applications, SaaS platforms, mobile experiences, and API-driven ecosystems that support digital transformation and long-term business growth. ",
        " Our engineering teams combine architecture expertise, agile delivery, DevOps practices, and product-focused execution to deliver high-performance digital solutions.",
      ],
    },
    capabilities: {
      sectionLabel: "Core Engineering Capabilities",
      title: "OUR CORE ENGINEERING CAPABILITIES",
      subtitle:
        "From SaaS platforms to mobile applications, our full-stack engineering capability covers every layer of your technology stack with precision and scale.",
      cards: [
        {
          iconName: "Code2",
          title: "Custom SaaS\nDevelopment",
          description:
            "We design and develop scalable SaaS platforms that support subscription models, enterprise workflows, and cloud-native scalability for startups, SMBs, and growing enterprises.",
          features: [
            "Multi-tenant SaaS architecture",
            "Subscription & billing integrations",
            "Role-based access systems",
            "Scalable backend engineering",
            "Cloud-native deployment",
            "Performance optimization",
          ],
          highlighted: false,
        },
        {
          iconName: "Globe",
          title: "Web Application\nDevelopment",
          description:
            "Our web engineering services focus on secure, responsive, and scalable applications built using modern frontend and backend technologies.",
          features: [
            "Enterprise web applications",
            "Progressive web apps",
            "Secure authentication systems",
            "API-first architecture",
            "Real-time dashboards",
            "Scalable frontend frameworks",
          ],
          highlighted: false,
        },
        {
          iconName: "Smartphone",
          title: "Mobile App Development",
          description:
            "We create high-performance mobile applications for iOS and Android platforms that deliver seamless user experiences and scalable business.",
          features: [
            "Native & cross-platform apps",
            "Flutter & React Native development",
            "Enterprise mobility solutions",
            "Mobile UI/UX optimization",
            "Secure mobile integrations",
            "App modernization services",
          ],
          highlighted: true,
        },
        {
          iconName: "Link2",
          title: "API Architecture\n& Integration",
          description:
            "Our API engineering services help businesses create connected digital ecosystems with secure and scalable integrations.",
          features: [
            "REST & GraphQL APIs",
            "Third-party integrations",
            "API gateways & security",
            "Payment gateway integrations",
            "CRM & ERP integrations",
            "Middleware engineering",
          ],
          highlighted: false,
        },
        {
          iconName: "GitBranch",
          title: "Microservices &\nDistributed Systems",
          description:
            "We help organizations modernize legacy systems through scalable microservices architecture and distributed engineering practices.",
          features: [
            "Distributed systems engineering",
            "Containerized architecture",
            "Kubernetes orchestration",
            "Event-driven systems",
            "Service mesh architecture",
            "High-availability engineering",
          ],
          highlighted: false,
        },
        {
          iconName: "RefreshCw",
          title: "Application Lifecycle\nManagement",
          description:
            "Our ALM services ensure continuous monitoring, optimization, modernization, and long-term application maintenance.",
          features: [
            "Application monitoring",
            "CI/CD integration",
            "Release management",
            "DevSecOps implementation",
            "Performance optimization",
            "Long-term maintenance",
          ],
          highlighted: false,
        },
        {
          iconName: "CheckCircle",
          title: "Quality Engineering\n& Test Automation",
          description:
            "Automated quality engineering frameworks designed for reliable and faster software delivery.",
          features: [
            "End-to-end test strategy",
            "Automated testing frameworks",
            "CI/CD-integrated testing",
            "Regression & performance testing",
            "Test coverage reporting",
            "Quality metrics dashboards",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "How We Guarantee Scale",
      title: "HOW WE GUARANTEE SCALE & STABILITY",
      subtitle:
        "Beno Support combines cloud-native engineering expertise, agile development practices, and scalable architecture capabilities to help businesses build modern digital platforms.",
      cards: [
        {
          iconName: "Layers",
          title: "SaaS Product\nEngineering Expertise",
          description:
            "Enforces multi-tenant isolation, high-availability design patterns, and auto-scaling to handle 3x peak traffic using AWS/Azure/GCP and Docker.",
          highlighted: false,
        },
        {
          iconName: "Cloud",
          title: "Cloud-Native\nArchitecture Approach",
          description:
            "Governed by automated Terraform (IaC) templates and Kubernetes (EKS/AKS) orchestration SOPs to ensure rapid, repeatable, and infrastructure-independent deployments.",
          highlighted: false,
        },
        {
          iconName: "GitBranch",
          title: "Agile & DevOps-Led\nDevelopment",
          description:
            "Managed via Jira sprint workflows and automated GitHub Actions/GitLab CI pipelines; requires mandatory dual-peer code reviews before merging.",
          highlighted: true,
        },
        {
          iconName: "Shield",
          title: "Enterprise-Grade\nSecurity Practices",
          description:
            "Features a DevSecOps SOP that injects automated SonarQube/Snyk vulnerability scanning into the build pipeline and mandates HashiCorp Vault for secrets management.",
          highlighted: false,
        },
        {
          iconName: "TrendingUp",
          title: "Scalable\nEngagement Models",
          description:
            "Governed by strict SLA tracking and automated regression testing to ensure seamless platform scaling without accumulating technical debt.",
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "Dedicated\nEngineering Teams",
          description:
            "Continuous alignment via Confluence knowledge bases, maintaining a strict quality gate of at least 85% unit test coverage across all deliverables.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "BIHAR TOURISM",
          tabSub: "CMS & Mobile App Development",
          projectTitle: "State-Scale CMS & Mobile App Development",
          description:
            "Engineering a high-performance CMS web platform and integrated mobile application to modernize Bihar's digital tourism ecosystem.",
          bullets: [
            "Scalable Laravel CMS web platform deployed on Google Cloud",
            "Cross-platform Flutter mobile app with offline-first utility",
            "Integrated in-app booking system for accommodations and tours",
          ],
          stats: [
            { value: "50%", label: "Increase in web traffic" },
            { value: "10K+", label: "App downloads in 90 days" },
            { value: "30%", label: "Boost in bookings" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "BIHAR TOURISM",
          tabSub: "Enterprise SaaS Scaling",
          projectTitle: "Scalable SaaS Foundations",
          description:
            "Engineering robust, multi-tenant software that allows startups to launch at lightning speed without accumulating crippling technical debt.",
          bullets: [
            "Rapid MVP launches optimized for fast market entry",
            "Modular, multi-tenant architecture ready for scale",
            "Enterprise-grade security and data isolation from day one",
          ],
          stats: [
            { value: "50%", label: "Faster market launch" },
            { value: "10x", label: "User scaling capacity" },
            { value: "0", label: "Critical technical debt" },
          ],
          ctaLabel: "View Case Study",
        },
        // {
        //   tabLabel: "OMNI COGNITIVE",
        //   tabSub: "Intelligent AI Workflows",
        //   projectTitle: "Production-Ready AI Integration",
        //   description:
        //     "Embedding advanced LLMs and automated workflows seamlessly into your production environment without breaking existing infrastructure.",
        //   bullets: [
        //     "Secure vector databases for intelligent context retrieval",
        //     "Robust API middleware bridging AI with legacy systems",
        //     "Optimized, low-latency LLM data pipelines",
        //   ],
        //   stats: [
        //     { value: "65%", label: "Higher workflow efficiency" },
        //     { value: "<200ms", label: "Vector query latency" },
        //     { value: "100%", label: "Data privacy security" },
        //   ],
        //   ctaLabel: "View Case Study",
        // },
      ],
    },
    cta: {
      title: "Ready to Build Scalable Digital Products?",
      content:
        "Partner with Beno Support to modernize applications, develop scalable software platforms, and accelerate digital innovation with engineering-led solutions.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },
    faq: [
      {
        question: "Do you develop custom SaaS platforms?",
        answer:
          "Yes. We build scalable SaaS applications with subscription systems, multi-tenant architecture, and cloud-native deployment.",
      },
      {
        question: "Which technologies does Beno Support use?",
        answer:
          "We work with React, Angular, Node.js, Python, .NET, Flutter, Kubernetes, AWS, Azure, and modern cloud-native technologies.",
      },
      {
        question: "Can you modernize legacy applications?",
        answer:
          "Absolutely. We help businesses transform outdated systems into scalable and secure cloud-native applications.",
      },
      {
        question: "Do you provide dedicated development teams?",
        answer:
          "Yes. We offer flexible engagement models including dedicated teams, project-based delivery, and long-term engineering support.",
      },
      {
        question: "Can Beno Support support startup product development?",
        answer:
          "Yes. We help startups build MVPs, scalable SaaS platforms, and digital products designed for rapid growth and market expansion.",
      },
    ],
  },

  "cyber-resilience-threat-intelligence": {
    meta: {
      title: "Cybersecurity Services & Threat Intelligence Solutions",
      description:
        "Protect digital infrastructure with cybersecurity consulting, SOC services, threat intelligence, compliance frameworks, and AI security solutions.",
      canonicalUrl: "/services/cyber-resilience-threat-intelligence",
    },
    hero: {
      image: "/assets/services/cyber_reseliance.svg",
      imageAlt: "Cybersecurity Services",
      tagline: "Strengthen Digital Security with ",
      tagline2: "Proactive Cyber Resilience. ",
      description:
        "Beno Support helps startups, SMBs, and enterprises secure applications, cloud infrastructure, AI systems, and enterprise environments through proactive cybersecurity and threat intelligence services.",
     ctaButtons: ["Request a Proposal", "Talk To Our Experts"],
    },
    intro: {
      sectionLabel: "Intro",
      title: "CYBERSECURITY & THREAT MANAGEMENT SERVICES",
      paragraphs: [
        "Modern digital ecosystems face evolving cyber threats, compliance challenges, and increasing infrastructure risks.",
        "Beno Support provides enterprise-grade cybersecurity services designed to strengthen security posture, improve operational resilience, and protect critical systems through proactive monitoring, threat intelligence, and security governance frameworks.",
        "Our security teams combine cloud security expertise, AI governance capabilities, and enterprise risk management practices to deliver scalable cybersecurity solutions.",
      ],
    },
    capabilities: {
      sectionLabel: "Security Services",
      title: "CORE CYBERSECURITY SERVICES",
      subtitle:
        "Enterprise-grade cybersecurity services covering AI security, penetration testing, SOC operations, compliance, and vulnerability management.",
      cards: [
        {
          iconName: "Shield",
          title: "AI-Specific Security\n& Guardrails",
          description:
            "Protect enterprise AI systems, LLM workflows, and automation platforms against misuse, vulnerabilities, and data leakage.",
          features: [
            "AI governance frameworks",
            "Prompt injection protection",
            "AI risk assessment",
            "LLM security controls",
            "Secure AI deployment",
            "Data privacy protection",
          ],
          highlighted: true,
        },
        {
          iconName: "Bug",
          title: "Penetration\nTesting",
          description:
            "Identify security vulnerabilities across applications, APIs, cloud infrastructure, and enterprise systems.",
          features: [
            "Web application testing",
            "API security testing",
            "Cloud security assessment",
            "Infrastructure penetration testing",
            "Security validation",
            "Threat simulation exercises",
          ],
          highlighted: false,
        },
        {
          iconName: "Eye",
          title: "Security Operations\n(SOC)",
          description:
            "Monitor, detect, and respond to cyber threats with proactive security operations and incident response support.",
          features: [
            "24/7 threat monitoring",
            "Incident response management",
            "Threat intelligence analysis",
            "Security event monitoring",
            "SIEM integration",
            "Threat detection workflows",
          ],
          highlighted: false,
        },
        {
          iconName: "FileCheck",
          title: "Compliance\nFrameworks",
          description:
            "Support enterprise governance and regulatory compliance through security-focused implementation strategies.",
          features: [
            "Security compliance consulting",
            "Governance framework support",
            "Risk assessment planning",
            "Security audit preparation",
            "Compliance monitoring",
            "Policy implementation support",
          ],
          highlighted: false,
        },
        {
          iconName: "Search",
          title: "Vulnerability\nAssessment",
          description:
            "Detect and mitigate infrastructure, application, and cloud security risks through proactive vulnerability analysis.",
          features: [
            "Infrastructure vulnerability scans",
            "Cloud security analysis",
            "Risk prioritization",
            "Security remediation planning",
            "Endpoint security assessment",
            "Continuous vulnerability monitoring",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "Continuous Security & Validation",
      title: "CONTINUOUS SECURITY & VALIDATION",
      subtitle:
        "Hardened blueprints, secure cloud transitions, and deep technical audits designed to future-proof your ecosystem against evolving risks.",
      cards: [
        {
          iconName: "Network",
          title: "Edge Defense &\nCluster Shielding",
          description:
            "Deploys automated ingress filtering and micro-segmentation to insulate critical data from coordinated attacks.",
          highlighted: false,
        },
        {
          iconName: "Lock",
          title: "Hardened IaC &\nContainer Security",
          description:
            "Standardizes infrastructure provisioning using pre-audited templates and continuous registry scanning to block root vulnerabilities.",
          highlighted: false,
        },
        {
          iconName: "GitBranch",
          title: "Shift-Left &\nPipeline Integrity",
          description:
            "Injects automated policy-as-code checks and mandatory peer reviews directly into daily developer workflows.",
          highlighted: true,
        },
        {
          iconName: "UserCheck",
          title: "Identity & Runtime\nGovernance",
          description:
            "Monitors privileged accounts in real time with automated quarantine scripts to instantly lock down compromised secrets.",
          highlighted: false,
        },
        {
          iconName: "Activity",
          title: "Capacity Analytics\n& Telemetry",
          description:
            "Combines proactive tracking telemetry with rigorous stress testing to eliminate performance lag under heavy loads.",
          highlighted: false,
        },
        {
          iconName: "Shield",
          title: "Centralized Engineering\nGuardrails",
          description:
            "Synchronizes technical teams through unified reference frameworks to enforce strict, non-negotiable security gates.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "FINVANTAGE LABS",
          tabSub: "Cloud & API Security Hardening",
          projectTitle:
            "Penetration Testing & Core Infrastructure Vulnerability Remediation",
          description:
            "Auditing and fixing critical access points inside a high-volume payment processing pipeline to stop unauthorized API exploits.",
          bullets: [
            "Deployment of automated penetration testing scripts to uncover hidden security flaws before malicious deployment",
            "Patching cloud configurations to strictly isolate transaction data sets from external network calls",
            "Integration of active encryption tokens to secure data routing channels across external banking integrations",
          ],
          stats: [
            { value: "0", label: "Critical data breaches or bypass leaks" },
            {
              value: "100%",
              label: "Compliance score across regulatory audits",
            },
            {
              value: "4x",
              label: "Faster identification of live system exploits",
            },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "NEURALHEALTH AI",
          tabSub: "Enterprise AI Guardrail Deployment",
          projectTitle:
            "Large Language Model Security Validation & Data Isolation",
          description:
            "Embedding continuous filtering layers around an enterprise healthcare LLM to prevent data leaking and adversarial attacks.",
          bullets: [
            "Configuration of input validation walls to intercept malicious prompt injection attempts targeting the core model",
            "Implementation of secure database permissions to stop accidental exposure of sensitive employee and clinical records",
            "Setup of real-time query logging pipelines to trace and audit every outbound automated response instantly",
          ],
          stats: [
            { value: "<50ms", label: "Guardrail check processing latency" },
            { value: "0", label: "Sensitive data exposure incidents" },
            {
              value: "99.9%",
              label: "Mitigation of adversarial prompt injection variants",
            },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "RETAILMAX GLOBAL",
          tabSub: "Managed SOC & Incident Response",
          projectTitle:
            "24/7 Threat Intelligence & Active Ransomware Containment",
          description:
            "Deploying an enterprise security monitoring hub to neutralize incoming digital threats across distributed commerce servers.",
          bullets: [
            "Installation of continuous behavioral detection agents to catch suspicious software executions at edge nodes",
            "Engineering automated script playbooks to instantly lock down compromised server assets during a hypothetical intrusion",
            "Consolidating system events into a single live portal for rapid visibility across all infrastructure zones",
          ],
          stats: [
            {
              value: "12 min",
              label: "Average containment time for active threats",
            },
            {
              value: "0",
              label: "Point-of-sale system operational downtime minutes",
            },
            {
              value: "10M+",
              label: "Daily security logs tracked and scrubbed live",
            },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
    cta: {
      title: "Ready to Strengthen Cyber Resilience?",
      content:
        "Partner with Beno Support to secure digital infrastructure, protect enterprise systems, and improve cybersecurity readiness with proactive threat intelligence solutions.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },
    faq: [
      {
        question: "Do you provide enterprise cybersecurity services?",
        answer:
          "Yes. We provide cybersecurity consulting, SOC services, penetration testing, compliance support, and threat intelligence solutions.",
      },
      {
        question: "Can you secure AI systems and LLM workflows?",
        answer:
          "Absolutely. We implement AI security guardrails, governance frameworks, and secure AI deployment practices.",
      },
      {
        question: "Do you provide cloud security services?",
        answer:
          "Yes. We secure cloud infrastructure, cloud-native applications, APIs, and hybrid environments.",
      },
      {
        question: "What industries do you support with cybersecurity services?",
        answer:
          "We support healthcare, BFSI, SaaS, manufacturing, retail, logistics, education, and enterprise organizations.",
      },
      {
        question: "Can startups use your cybersecurity services?",
        answer:
          "Yes. We provide scalable cybersecurity solutions for startups, SMBs, and enterprises based on operational requirements.",
      },
    ],
  },

  "agentic-ai-intelligent-automation": {
    meta: {
      title: "Agentic AI Consulting & Intelligent Automation Services",
      description:
        "Deploy enterprise AI agents, LLM integrations, process automation, and AI-powered workflows with Beno Support's AI consulting services.",
      canonicalUrl: "/services/agentic-ai-intelligent-automation",
    },
    hero: {
      image: "/assets/services/agentic_ai.svg",
      imageAlt: "Agentic AI Consulting",
      tagline: "Deploy AI-Powered Automation for ",
      tagline2: "Smarter Business Operations ",
      description:
        "Beno Support helps startups, SMBs, and enterprises implement AI agents, intelligent workflows, and automation systems that improve operational efficiency, customer experience, and decision-making",
      ctaButtons: ["Request a Proposal", "Talk To Our Experts"],
    },
    intro: {
      sectionLabel: "Intro",
      title: "AI DEVELOPMENT & INTELLIGENT AUTOMATION SERVICES",
      paragraphs: [
        "AI is transforming how modern businesses operate. Beno Support helps organizations deploy intelligent automation systems, enterprise AI agents, and LLM-powered workflows that improve productivity and accelerate digital transformation.",
        "Our AI teams combine automation engineering, machine learning expertise, cloud infrastructure, and enterprise integration capabilities to build scalable and secure AI ecosystems.",
      ],
    },
    capabilities: {
      sectionLabel: "Core AI Services",
      title: "CORE AI SERVICES",
      subtitle:
        "Enterprise-grade AI services covering agent deployment, LLM integration, and intelligent automation to transform your business operations at scale.",
      cards: [
        {
          iconName: "Bot",
          title: "AI Agent\nDeployment",
          description:
            "We build enterprise AI agents that automate workflows, customer interactions, operational tasks, and business processes.",
          features: [
            "Conversational AI agents",
            "Enterprise AI copilots",
            "Workflow automation systems",
            "Multi-agent orchestration",
            "AI-powered support systems",
            "Process optimization",
          ],
          highlighted: true,
        },
        {
          iconName: "Brain",
          title: "LLM Integration\n& Fine-Tuning",
          description:
            "We integrate and optimize large language models for enterprise use cases and intelligent business operations.",
          features: [
            "OpenAI & LLM integrations",
            "Custom AI fine-tuning",
            "RAG implementation",
            "Enterprise knowledge systems",
            "Secure AI deployment",
            "AI governance frameworks",
          ],
          highlighted: false,
        },
        {
          iconName: "Zap",
          title: "Intelligent Process\nAutomation",
          description:
            "Automate repetitive workflows using AI-powered automation and orchestration systems.",
          features: [
            "Workflow automation",
            "AI-driven analytics",
            "Intelligent document processing",
            "Robotic process automation",
            "Operational intelligence",
            "Business process optimization",
          ],
          highlighted: false,
        },
        {
          iconName: "Eye",
          title: "Computer Vision &\nDocument Processing",
          description:
            "Extract insights from images, videos, and enterprise documents using AI-powered computer vision systems.",
          features: [
            "AI-powered document intelligence",
            "OCR & intelligent data extraction",
            "Invoice & financial document automation",
            "Healthcare records processing",
            "Visual AI & inspection systems",
            "Facial recognition solutions",
          ],
          highlighted: false,
        },
        {
          iconName: "Lightbulb",
          title: "AI Strategy\nConsulting",
          description:
            "We help businesses build AI adoption roadmaps and scalable transformation strategies.",
          features: [
            "AI readiness assessment",
            "AI governance consulting",
            "Enterprise AI roadmap",
            "AI transformation strategy",
            "Risk & compliance planning",
            "AI adoption consulting",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "How We Guarantee Scale",
      title: "ACCELERATING AUTOMATION WITH AGENTIC AI",
      subtitle:
        "Dependable frameworks, strict data security, and constant testing to keep your intelligent systems running smoothly.",
      cards: [
        {
          iconName: "Network",
          title: "Multi-Agent Orchestration\n& Scale",
          description:
            "We set up advanced AI tools that work together smoothly on AWS and GCP. This keeps your automated tasks fast and reliable, even during busy business hours.",
          highlighted: false,
        },
        {
          iconName: "Cloud",
          title: "Cloud-Native AI Infrastructure\n& GitOps",
          description:
            "Pre-made cloud blueprints accelerate system deployment, enabling rapid, secure updates with absolutely zero business downtime.",
          highlighted: false,
        },
        {
          iconName: "RefreshCw",
          title: "Continuous MLOps\n& LLM Fine-Tuning",
          description:
            "Constant tracking and automated testing maintain high model accuracy, preventing drift and eliminating incorrect or off-track AI responses.",
          highlighted: false,
        },
        {
          iconName: "Shield",
          title: "Enterprise AI Governance\n& Security",
          description:
            "Automated privacy and security filters guard sensitive business data, while digital vaults securely lock down all passwords and access keys.",
          highlighted: true,
        },
        {
          iconName: "CheckCircle",
          title: "Quality-Assured\nEvaluation Frameworks",
          description:
            "AI responses are rigorously evaluated against strict quality scores before going live, catching mistakes early to guarantee reliable software performance.",
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "Dedicated AI Lifecycle\nEngineering Teams",
          description:
            "Our tech teams follow daily coding guidelines to maintain consistency and accelerate deployment across the AI lifecycle.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "HOLOZONE NCR",
          tabSub: "Smart Booking System",
          projectTitle: "AI-Powered Booking & Operational Automation",
          description:
            "Deploying intelligent reservation agents and automated operations for a modern, high-traffic virtual reality and holographic gaming center.",
          bullets: [
            "Smart AI agents for 24/7 automated customer booking and ticketing",
            "Automated scheduling systems that sync gaming arenas in real-time",
            "Centralized dashboard to track daily customer traffic and venue analytics",
          ],
          stats: [
            { value: "45%", label: "Reduction in manual booking effort" },
            { value: "24/7", label: "Instant customer response time" },
            { value: "35%", label: "Increase in arena slot utilization" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "AAROHAN DIGITAL",
          tabSub: "Automated SEO Pipeline",
          projectTitle: "Automated Search Indexing & Web Performance",
          description:
            "Implementing automated SEO monitoring and indexing workflows to maximize web visibility for multi-domain digital assets.",
          bullets: [
            "Automated Google Search Console integration for real-time keyword tracking",
            "Instant technical audit scripts to fix website crawl errors automatically",
            "Smart content indexing pipelines built to handle large domain networks",
          ],
          stats: [
            { value: "3x", label: "Faster search engine indexing" },
            { value: "0", label: "Manual keyword tracking hours" },
            { value: "80%", label: "Fewer technical website errors" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "FINVEX SOLUTIONS",
          tabSub: "Financial Settlement Engine",
          projectTitle: "Intelligent Financial Workflow Automation",
          description:
            "Streamlining merchant payouts, international transactions, and payment settlements using smart automation.",
          bullets: [
            "Automated merchant integration for hassle-free payment settlements",
            "Smart verification pipelines to check international transactions for errors",
            "Automated ledger matching that updates account balances instantly",
          ],
          stats: [
            { value: "70%", label: "Faster payment settlement tracking" },
            { value: "99.9%", label: "Transaction workflow accuracy" },
            { value: "0", label: "Manual payout processing delays" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
    cta: {
      title: "Ready to Scale with Intelligent Automation?",
      content:
        "Partner with Beno Support to deploy AI agents, automate workflows, and build enterprise-ready AI ecosystems that accelerate operational efficiency.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },
    faq: [
      {
        question: "What AI models does Beno Support support?",
        answer:
          "We support OpenAI, Gemini, Claude, open-source LLMs, and enterprise AI deployments tailored to business requirements.",
      },
      {
        question: "Do you develop custom AI agents?",
        answer:
          "Yes. We build AI agents for workflow automation, customer support, analytics, and enterprise operations.",
      },
      {
        question: "Can you integrate AI into existing business systems?",
        answer:
          "Absolutely. We integrate AI into CRMs, ERPs, SaaS platforms, and enterprise applications.",
      },
      {
        question: "Do you provide AI governance consulting?",
        answer:
          "Yes. We help organizations implement AI governance frameworks, compliance policies, and secure AI deployment practices.",
      },
      {
        question: "Can startups use your AI automation services?",
        answer:
          "Yes. We help startups automate operations, build AI-powered products, and accelerate growth using scalable AI systems.",
      },
    ],
  },

  "digital-products-experience-engineering": {
    meta: {
      title: "UI UX Design & Digital Product Engineering Services",
      description:
        "Create scalable digital products with UX strategy, UI design, conversion optimization, and product engineering services from Beno Support.",
      canonicalUrl: "/services/digital-products-experience-engineering",
    },
    hero: {
      image: "/assets/services/digital_product.svg",
      imageAlt: "UI UX Design Services",
      tagline: "Create Digital Experiences ",
      tagline2: "That Drive Engagement & Growth ",
      description:
        "Beno Support helps startups, SMBs, and enterprises design user-focused digital products, optimize customer journeys, and build scalable digital experiences that improve engagement and conversions",
    },
    intro: {
      sectionLabel: "Intro",
      title: "Digital Product Engineering Services",
      paragraphs: [
        "Modern digital products require more than attractive interfaces — they require seamless user experiences, scalable product design, and performance-focused engineering.",
        "Beno Support helps organizations create intuitive digital experiences through UX strategy, interface engineering, product design systems, and conversion-focused optimization that support business growth and customer engagement.",
        "Our product engineering teams combine UX research, UI design, frontend engineering, and digital optimization expertise to deliver scalable and user-centric digital products.",
      ],
    },
    capabilities: {
      sectionLabel: "Product Capabilities",
      title: "CORE PRODUCT & EXPERIENCE CAPABILITIES",
      subtitle:
        "From research and strategy through to pixel-perfect engineering, our full-spectrum digital product capability builds experiences that convert, retain, and grow.",
      cards: [
        {
          iconName: "Palette",
          title: "UX Research & Design Strategy",
          description:
            "Understand customer behaviour and build data-driven user experiences through research-focused design strategies.",
          features: [
            "User journey mapping",
            "UX research & testing",
            "Product experience strategy",
            "Customer behavior analysis",
            "Information architecture",
            "Design system planning",
          ],
          highlighted: false,
        },
        {
          iconName: "Layers",
          title: "UI Design & Prototyping",
          description:
            "Create modern and responsive interfaces optimized for usability and digital engagement.",
          features: [
            "Responsive UI design",
            "Interactive prototyping",
            "Design systems",
            "Product interface optimization",
            "Mobile-first design",
            "Brand-focused UI experiences",
          ],
          highlighted: false,
        },
        {
          iconName: "Monitor",
          title: " Conversion Rate Optimisation",
          description:
            "Improve digital performance and maximize customer engagement through conversion-focused optimization strategies.",
          features: [
            "Conversion funnel optimization",
            "Landing page improvements",
            "User behavior analytics",
            "Performance optimization",
            "A/B testing support",
            "Customer engagement strategies",
          ],
          highlighted: true,
        },

        {
          iconName: "Target",
          title: "Website Transformation & Localisation",
          description:
            "Modernize websites for global accessibility, localization, and scalable digital experiences.",
          features: [
            "Website modernization",
            "Localization support",
            "Multilingual experiences",
            "Accessibility optimization",
            "SEO-focused structure",
            "Performance enhancement",
          ],
          highlighted: false,
        },
        {
          iconName: "BarChart2",
          title: "Virtual Experience Design",
          description:
            "Build immersive and interactive digital experiences for customer engagement and enterprise communication.",
          features: [
            "Interactive digital experiences",
            "Virtual engagement systems",
            "Experience-driven design",
            "Digital presentation platforms",
            "Enterprise interaction design",
            "Customer engagement optimization",
          ],
          highlighted: false,
        },
        {
          iconName: "Eye",
          title: "Martech & Analytics Engineering",
          description:
            "Integrated marketing and analytics systems powering customer insights and performance tracking.",
          features: [
            "Martech stack integration",
            "CRM & CDP implementation",
            "Analytics engineering",
            "Customer data architecture",
            "Attribution modelling",
            "Revenue analytics dashboards",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "How We Guarantee Scale",
      title: "Architectural Rigor & Experience Assurance",
      subtitle:
        "Beno Support combines user-centric design frameworks, rigorous optimization, and scalable frontend engineering to deliver high-performing digital products.",
      cards: [
        {
          iconName: "Zap",
          title: "Atomic Design Systems",
          description:
            "Uses central Figma libraries and atomic design to transition concepts smoothly to live frontend code.",
          highlighted: false,
        },
        {
          iconName: "Layers",
          title: "Empirical UX Research",
          description:
            "Runs multi-variant usability tests and behavior mapping via Miro and Hotjar before engineering layouts.",
          highlighted: true,
        },
        {
          iconName: "TrendingUp",
          title: "Continuous Optimization Loops",
          description:
            "Uses continuous behavioral testing and analytics loops to eliminate user friction and boost conversions.",
          highlighted: false,
        },
        {
          iconName: "Search",
          title: "Localized Global Architecture",
          description:
            "Applies automated translation pipelines and WCAG checklists to ensure global deployment and seamless payments.",
          highlighted: false,
        },
        {
          iconName: "Award",
          title: "High-Fidelity Prototyping",
          description:
            "Mandates fast experience prototyping to remove interface bugs and keep systems stable during high surges.",
          highlighted: false,
        },
        {
          iconName: "Globe",
          title: "Unified Analytics Telemetry",
          description:
            "Deploys real-time tracking rules and clean data-layer checks across analytics pipelines for exact attribution.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "SHOPNEST",
          tabSub: "E-Commerce Platform Redesign",
          projectTitle: "Full E-Commerce Platform Redesign & CRO",
          description:
            "Complete redesign of a mid-market e-commerce platform driving significant improvements in conversion, average order value, and customer retention.",
          bullets: [
            "Full design system built from scratch with 200+ reusable components",
            "Checkout flow redesign reducing cart abandonment by 34%",
            "Core Web Vitals achieved green scores across all key pages",
          ],
          stats: [
            { value: "34%", label: "Reduction in cart abandonment" },
            { value: "28%", label: "Increase in conversion rate" },
            { value: "2.1s", label: "Average page load time" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "FINDASH",
          tabSub: "Financial Analytics Dashboard",
          projectTitle: "Real-Time Financial Analytics Dashboard",
          description:
            "Designed and engineered a complex financial analytics dashboard processing 50M+ data points daily with sub-second rendering and WCAG AA compliance.",
          bullets: [
            "Custom data visualisation library with 30+ chart types built on D3.js",
            "Real-time WebSocket data feeds with optimistic UI updates",
            "Full WCAG 2.1 AA accessibility audit and implementation",
          ],
          stats: [
            { value: "50M+", label: "Daily data points rendered" },
            { value: "<500ms", label: "Dashboard load time" },
            { value: "30%", label: "WCAG compliance achieved" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "EDULEARN",
          tabSub: "Learning Platform UX",
          projectTitle: "Adaptive Learning Platform Experience",
          description:
            "Redesigned an enterprise learning management system improving course completion rates and learner engagement through data-driven UX improvements.",
          bullets: [
            "User research with 500+ learners informing complete IA restructure",
            "Adaptive learning path algorithm with personalised content recommendations",
            "Mobile-first responsive redesign with offline learning support",
          ],
          stats: [
            { value: "67%", label: "Increase in course completion" },
            { value: "4.8/5", label: "Learner satisfaction score" },
            { value: "3x", label: "Mobile engagement increase" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
    cta: {
      title: "Ready to Build Better Digital Experiences?",
      content:
        "Partner with Beno Support to create scalable digital products, optimize customer journeys, and improve user engagement through modern product engineering solutions.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },
    faq: [
      {
        question: "Do you provide UI/UX design services?",
        answer:
          "Yes. We provide UX research, UI design, prototyping, design systems, and product experience optimization services.",
      },
      {
        question: "Can you redesign existing websites and applications?",
        answer:
          "Absolutely. We modernize websites and applications with improved UX, scalable design systems, and performance optimization.",
      },
      {
        question: "Do you provide product engineering services for startups?",
        answer:
          "Yes. We help startups build MVPs, scalable digital products, and customer-focused applications.",
      },
      {
        question: "Can you improve website conversion rates?",
        answer:
          "Yes. Our conversion optimization services help improve engagement, lead generation, and digital performance.",
      },
      {
        question:
          "Do you support multilingual and localized website experiences?",
        answer:
          "Yes. We provide localization and accessibility solutions for global digital experiences.",
      },
    ],
  },

  "enterprise-startup-tech-strategy": {
    meta: {
      title: "Digital Transformation & Enterprise Technology Consulting",
      description:
        "Modernize infrastructure, optimize technology ecosystems, and accelerate digital transformation with Beno Support's consulting services.",
      canonicalUrl: "/services/enterprise-startup-tech-strategy",
    },
    hero: {
      image: "/assets/services/enterprise_strategy.svg",
      imageAlt: "Digital Transformation",
      tagline: "Turn Business Vision into a Scalable Digital Enterprise",
      description:
        " Helping enterprises accelerate innovation, improve operational efficiency, and maximize technology investments with a strategy-first approach.",
      ctaButtons: ["Request a Proposal", "Talk To Our Experts"],
    },
    intro: {
      sectionLabel: "Intro",
      title: "ENTERPRISE TECHNOLOGY CONSULTING SERVICES",
      paragraphs: [
        "Modern businesses need technology strategies that support scalability, operational efficiency, and long-term innovation.",
        "Beno Support provides enterprise consulting and architecture advisory services that help organizations modernize systems, optimize infrastructure, and align technology investments with business growth.",
      ],
    },
    capabilities: {
      sectionLabel: "Consulting Services",
      title: "CORE CONSULTING SERVICES",
      subtitle:
        "Enterprise technology consulting covering stack audits, legacy modernization, digital transformation, CTO advisory, and modern workplace architecture.",
      cards: [
        {
          iconName: "Search",
          title: "Technology\nStack Audit",
          description:
            "Assess and optimize existing infrastructure, software systems, and technology ecosystems.",
          features: [
            "Infrastructure assessment",
            "Technology gap analysis",
            "Security posture review",
            "Scalability evaluation",
            "Platform optimization",
            "Architecture recommendations",
          ],
          highlighted: false,
        },
        {
          iconName: "RefreshCw",
          title: "Legacy\nModernisation",
          description:
            "Transform outdated systems into scalable cloud-native environments.",
          features: [
            "Legacy system assessment",
            "Cloud-native modernization",
            "Infrastructure transformation",
            "Application modernization",
            "Platform migration",
            "Performance optimization",
          ],
          highlighted: true,
        },
        {
          iconName: "Map",
          title: "Digital Transformation\nRoadmap",
          description:
            "Develop strategic modernization plans aligned with business goals.",
          features: [
            "Transformation strategy",
            "Cloud adoption planning",
            "AI adoption roadmap",
            "Operational modernization",
            "Digital innovation planning",
            "Enterprise scalability strategy",
          ],
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "CTO Advisory\nServices",
          description:
            "Access executive-level technology leadership and architecture consulting.",
          features: [
            "Technology leadership advisory",
            "Product architecture planning",
            "Scaling strategy consulting",
            "Innovation planning",
            "IT governance advisory",
            "Executive technology guidance",
          ],
          highlighted: false,
        },
        {
          iconName: "Monitor",
          title: "Modern Workplace\nArchitecture",
          description:
            "Secure digital workplace environments built for collaboration, productivity, and hybrid operations.",
          features: [
            "Microsoft 365 & Google Workspace deployment",
            "Collaboration platform integration",
            "MDM & endpoint management",
            "Zero-trust access setup",
            "Hybrid work infrastructure",
            "Secure remote workforce enablement",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "Accelerating Modernization",
      title: "ACCELERATING MODERNIZATION",
      subtitle:
        "Dependable blueprints, secure cloud transitions, and rigorous technical evaluations to confidently future-proof your business operations.",
      cards: [
        {
          iconName: "FileSearch",
          title: "Tech Stack Audit\n& Cost Control",
          description:
            "Automated diagnostic scripts scan software to identify architectural bloat, immediately cutting redundant license costs and cloud waste.",
          highlighted: false,
        },
        {
          iconName: "Cloud",
          title: "Cloud Migration\n& Zero-Downtime",
          description:
            "Container blueprints and IaC templates migrate legacy applications to AWS or Azure with zero operational business disruption.",
          highlighted: false,
        },
        {
          iconName: "GitBranch",
          title: "Microservices\n& Modularity",
          description:
            "Brittle monolithic systems are broken into scalable microservices, allowing individual modules to update instantly without taking the application offline.",
          highlighted: true,
        },
        {
          iconName: "Shield",
          title: "Security &\nThreat Compliance",
          description:
            "Integrated digital vaults, automated access controls, and strict encryption protocols keep business records and sensitive client data secure.",
          highlighted: false,
        },
        {
          iconName: "Lightbulb",
          title: "CTO Advisory\n& Growth Mapping",
          description:
            "Clear, executive-level technical roadmaps outline precise development phases, resource budgeting, and technology selection for the next 3 to 5 years.",
          highlighted: false,
        },
        {
          iconName: "Award",
          title: "Architecture &\nEngineering Teams",
          description:
            "Senior technology consultants follow precise engineering guidelines to provide complete oversight across system design, testing, and deployment.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "VANGUARD LOGISTICS",
          tabSub: "Legacy Core Migration",
          projectTitle:
            "Legacy Modernization & Cloud Transition for Supply Chains",
          description:
            "Modernizing a 15-year-old on-premise ERP into a scalable, cloud-native routing architecture.",
          bullets: [
            "Migration of siloed legacy databases into a high-availability cloud data warehouse",
            "Re-engineered APIs to sync third-party warehouse management systems seamlessly",
            "Containerized microservices to process telemetry and routes with zero delays",
          ],
          stats: [
            { value: "85%", label: "Lower legacy server maintenance costs" },
            { value: "0", label: "Mid-transit data sync faults" },
            { value: "5x", label: "Faster route optimization processing" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "NEXUS HEALTH",
          tabSub: "Interoperable Enterprise Architecture",
          projectTitle: "Healthcare IT Infrastructure Overhaul & Blueprinting",
          description:
            "Restructuring data workflows across a multi-facility network to meet modern medical standards.",
          bullets: [
            "Decoupled data environments separating clinical platforms from public patient portals",
            "Standardized database setups to instantly comply with global medical data rules",
            "Failover cloud frameworks ensuring patient charts remain accessible during outages",
          ],
          stats: [
            { value: "100%", label: "Compliance with healthcare data audits" },
            { value: "0", label: "Single points of failure across systems" },
            { value: "70%", label: "Faster data retrieval for medical staff" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "ELEVATE INSURETECH",
          tabSub: "CTO Advisory & Platform Scaling",
          projectTitle:
            "Digital Transformation & Microservices for High-Volume Claims",
          description:
            "Upgrading a sluggish monolithic insurance platform into a rapid, multi-tenant digital hub.",
          bullets: [
            "Strategic auditing to map out a risk-free software decomposition roadmap",
            "Elastic auto-scaling infrastructure deployed to absorb major user traffic spikes",
            "Distributed tracing and logging pipelines to monitor core database transactions",
          ],
          stats: [
            { value: "12x", label: "Higher concurrent traffic capacity" },
            { value: "0", label: "Application downtime minutes" },
            { value: "45%", label: "Faster claim approval pipeline speed" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
    cta: {
      title: "Ready to Modernize Your Technology Ecosystem?",
      content:
        "Partner with Beno Support to build scalable technology strategies, modernize infrastructure, and accelerate digital transformation initiatives.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },
    faq: [
      {
        question: "Do you provide digital transformation consulting?",
        answer:
          "Yes. We help businesses modernize operations, infrastructure, and enterprise technology ecosystems.",
      },
      {
        question: "Can you support startup technology planning?",
        answer:
          "Absolutely. We support startups with architecture strategy, product planning, and scaling roadmaps.",
      },
      {
        question: "What industries do you support?",
        answer:
          "We work across BFSI, healthcare, retail, SaaS, logistics, manufacturing, education, and public sector industries.",
      },
      {
        question: "Do you provide CTO advisory services?",
        answer:
          "Yes. Our consultants provide executive-level technology guidance for scaling and modernization initiatives.",
      },
      {
        question: "Can you help with legacy modernization?",
        answer:
          "Yes. We modernize outdated infrastructure and applications using cloud-native engineering practices.",
      },
    ],
  },

  "strategic-it-governance-managed-services": {
    meta: {
      title: "Managed IT Services & IT Governance Consulting",
      description:
        "Optimize business operations with managed IT services, infrastructure management, governance consulting, and disaster recovery solutions from Beno Support.",
      canonicalUrl: "/services/strategic-it-governance-managed-services",
    },
    hero: {
      image: "/assets/services/it_governance.svg",
      imageAlt: "Managed IT Services",
      tagline:
        "Strengthen IT Operations with Governance-Driven Managed Services",
      description:
        "Beno Support helps startups, SMBs, and enterprises improve operational continuity, optimize IT infrastructure, and reduce technology risks through proactive managed services and governance consulting.",
    },
    intro: {
      sectionLabel: "Intro",
      title: "Managed IT Services & IT Governance Solutions",
      paragraphs: [
        "Modern businesses require secure, scalable, and reliable IT operations to support growth and digital transformation",
        "Beno Support provides governance-focused managed IT services that help organizations optimize infrastructure performance, improve operational visibility, strengthen security, and maintain business continuity through proactive monitoring and strategic technology support.",
        "Our teams combine infrastructure expertise, IT governance frameworks, cloud operations, and enterprise support capabilities to deliver reliable and scalable managed services.",
      ],
    },
    capabilities: {
      sectionLabel: "Managed Services Capabilities",
      title: "CORE MANAGED SERVICES CAPABILITIES",
      subtitle:
        "End-to-end IT operations management across infrastructure, service desk, governance, and compliance — all under one contractual SLA commitment.",
      cards: [
        {
          iconName: "Settings",
          title: "vCIO Advisory",
          description:
            "Access strategic technology leadership and executive-level IT guidance without the need for a full-time CIO.",
          features: [
            "IT strategy planning",
            "Technology roadmap development",
            "Digital transformation advisory",
            "IT governance consulting",
            "Vendor management support",
            "Budget & infrastructure planning",
          ],
          highlighted: false,
        },
        {
          iconName: "Headphones",
          title: "Managed IT Support (24/7 NOC)",
          description:
            "Ensure operational continuity with proactive infrastructure monitoring and round-the-clock technical support services.",
          features: [
            "24/7 monitoring & support",
            "Incident response management",
            "Network operations support",
            "Performance monitoring",
            "System uptime optimization",
            "Remote infrastructure support",
          ],
          highlighted: true,
        },
        {
          iconName: "Server",
          title: "Infrastructure Management",
          description:
            "Manage cloud, hybrid, and enterprise IT infrastructure environments with scalable operational support.",
          features: [
            "Server & infrastructure management",
            "Cloud infrastructure support",
            "Hybrid environment management",
            "Infrastructure optimization",
            "Security patch management",
            "Performance management",
          ],
          highlighted: false,
        },
        {
          iconName: "Headphones",
          title: "IT Helpdesk & Support",
          description:
            "Provide reliable IT assistance and technical issue resolution for employees, teams, and enterprise users.",
          features: [
            "End-user technical support",
            "Ticket management systems",
            "Device & software support",
            "User access management",
            "Remote troubleshooting",
            "IT service desk operations",
          ],
          highlighted: false,
        },
        {
          iconName: "RefreshCw",
          title: "Disaster Recovery Planning",
          description:
            "Protect critical business operations with proactive disaster recovery and business continuity strategies.",
          features: [
            "Backup & recovery planning",
            "Business continuity strategy",
            "Disaster recovery testing",
            "Infrastructure redundancy",
            "Risk mitigation planning",
            "Recovery automation solutions",
          ],
          highlighted: false,
        },
        {
          iconName: "FileText",
          title: "Network Infrastructure & Security Management",
          description:
            "Enterprise network infrastructure secured with continuous monitoring and access control.",
          features: [
            "Enterprise network architecture",
            "Firewall & intrusion management",
            "SD-WAN & VPN implementation",
            "Zero-trust network access",
            "Network monitoring & auditing",
            "Recovery automation solutions",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "How We Guarantee Scale",
      title: "Governing for Scale & Stability",
      subtitle:
        "Dependable blueprints, secure cloud transitions, and rigorous technical evaluations to confidently future-proof your business operations.",
      cards: [
        {
          iconName: "Award",
          title: "Core Infrastructure Strategy",
          description:
            "Enforces high-availability design patterns and automated load balancing across cloud clusters to handle system stress.",
          highlighted: false,
        },
        {
          iconName: "Activity",
          title: "Repeatable Environments & IaC",
          description:
            "Uses pre-validated Terraform blueprints and container checklists to ensure rapid, error-free system replication.",
          highlighted: true,
        },
        {
          iconName: "Database",
          title: "DevOps Workflows & Delivery",
          description:
            "Utilizes automated deployment pipelines and mandatory technical peer reviews before pushing architecture changes live.",
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "Threat Isolation & Governance",
          description:
            "Integrates a native DevSecOps pipeline with automated safety scans to lock down administrative access.",
          highlighted: false,
        },
        {
          iconName: "DollarSign",
          title: "System Debt & SLA Tracking",
          description:
            "Deploys precise telemetry monitoring rules and database validation runs to eliminate performance overhead.",
          highlighted: false,
        },
        {
          iconName: "FileCheck",
          title: "Specialized Engineering Support",
          description:
            "Synchronizes team operations through internal knowledge vaults to enforce strict quality gates across deliverables.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "GLOBAL MFG CO",
          tabSub: "IT Consolidation Program",
          projectTitle: "Global IT Consolidation & Centralised Operations",
          description:
            "Consolidated fragmented IT operations across 8 business units into a single managed service model, achieving consistent SLAs and significant cost reduction.",
          bullets: [
            "Unified NOC monitoring 2,400+ devices across 12 global sites",
            "ITSM implementation with single CMDB serving all business units",
            "IT spend reduction of 32% through contract consolidation and optimisation",
          ],
          stats: [
            { value: "32%", label: "IT cost reduction" },
            { value: "2,400+", label: "Devices under management" },
            { value: "99.96%", label: "Uptime achieved" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "HEALTHNET",
          tabSub: "ITSM Implementation",
          projectTitle: "ITIL-Aligned ITSM Platform Implementation",
          description:
            "Implemented a comprehensive ITIL-aligned ITSM platform for a healthcare network, transforming reactive IT support into proactive service management.",
          bullets: [
            "ServiceNow deployment with 45 custom workflows and automation rules",
            "First call resolution improved from 43% to 78% within 90 days",
            "Change management process reducing change-related incidents by 65%",
          ],
          stats: [
            { value: "78%", label: "First call resolution rate" },
            { value: "65%", label: "Fewer change incidents" },
            { value: "45", label: "Custom workflows deployed" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "BANKFIRST",
          tabSub: "Managed Infrastructure & SOC",
          projectTitle: "Managed Infrastructure & Security Operations",
          description:
            "Took full operational ownership of a regional bank's IT infrastructure and security operations, delivering guaranteed SLAs and regulatory compliance.",
          bullets: [
            "24/7 NOC and SOC co-managed model with dedicated bank liaison",
            "Automated regulatory reporting for FCA, PRA, and internal audit requirements",
            "Disaster recovery testing program achieving RTO of under 4 hours",
          ],
          stats: [
            { value: "4 hrs", label: "Recovery time objective" },
            { value: "100%", label: "Regulatory reports on time" },
            { value: "0", label: "Major incidents in 18 months" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
  },

  "cloud-platform-engineering": {
    meta: {
      title: "Cloud Infrastructure & Platform Engineering Services",
      description:
        "Accelerate cloud transformation with Kubernetes, DevOps, cloud infrastructure, and platform engineering services.",
      canonicalUrl: "/services/cloud-platform-engineering",
    },
    hero: {
      image: "/assets/services/cloud_and_platform.svg",
      imageAlt: "Cloud and platform engineering services",
      tagline: "Modernize Infrastructure with Cloud-Native Engineering",
      description:
        "Beno Support helps businesses build scalable cloud ecosystems, automate infrastructure, and accelerate deployment through modern cloud engineering services.",
    },
    intro: {
      sectionLabel: "Intro",
      title: "Cloud Infrastructure & DevOps Engineering Services",
      paragraphs: [
        "Cloud transformation is essential for scalability, agility, and operational efficiency. Beno Support helps startups, SMBs, and enterprises modernize infrastructure, optimize cloud operations, and accelerate deployment using Kubernetes, DevOps, and cloud-native engineering solutions.",
      ],
    },
    capabilities: {
      sectionLabel: "Cloud Capabilities",
      title: "CORE CLOUD & PLATFORM CAPABILITIES",
      subtitle:
        "Full-spectrum cloud engineering from migration strategy and Kubernetes orchestration to FinOps governance and developer platform delivery.",
      cards: [
        {
          iconName: "Cloud",
          title: "Multi-Cloud Architecture (AWS / Azure / GCP)",
          description:
            "Lift-and-shift, re-platform, and re-architect migration strategies with zero-downtime cutover planning across AWS, Azure, and GCP.",
          features: [
            "Cloud migration strategy",
            "Hybrid cloud deployment",
            "Infrastructure optimization",
            "Cloud security architecture",
            "High-availability systems",
            "Multi-cloud management",
          ],
          highlighted: false,
        },
        {
          iconName: "Server",
          title: "Kubernetes & Container Orchestration",
          description:
            "Deploy scalable containerized applications with Kubernetes and modern orchestration frameworks.",
          features: [
            "Kubernetes deployment",
            "Docker containerization",
            "Service orchestration",
            "Infrastructure automation",
            "Cloud-native scalability",
            "Container security",
          ],
          highlighted: true,
        },
        {
          iconName: "Zap",
          title: "DevOps & CI/CD Pipelines",
          description:
            "Accelerate software delivery through automated deployment workflows and DevOps practices.",
          features: [
            "Automated deployments",
            "CI/CD implementation",
            "Infrastructure as Code",
            "DevSecOps integration",
            "Monitoring & observability",
            "Release automation",
          ],
          highlighted: false,
        },
        {
          iconName: "Globe",
          title: "FinOps & Cloud Cost Optimisation",
          description:
            "Improve cloud efficiency and reduce infrastructure costs through strategic optimization practices.",
          features: [
            "Cloud cost monitoring",
            "Resource optimization",
            "Cloud governance",
            "Usage analytics",
            "Budget optimization",
            "FinOps automation",
          ],
          highlighted: false,
        },
        {
          iconName: "GitMerge",
          title: "DataOps & Data Pipelines",
          description:
            "Build scalable enterprise data workflows for analytics and AI systems.",
          features: [
            "ETL/ELT pipelines",
            "Real-time data pipelines",
            "Data orchestration",
            "Cloud data engineering",
            "Data governance",
            "Analytics infrastructure",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "How We Guarantee Scale",
      title: "Our Cloud & Platform Engineering Guardrails",
      subtitle:
        "Beno Support combines cloud-native expertise, strict SOPs, and advanced automation to build resilient, self-healing infrastructure.",
      cards: [
        {
          iconName: "TrendingUp",
          title: "Production-Ready Kubernetes Orchestration",
          description:
            "Enforces strict network policies and pod autoscaling via AWS EKS or Azure AKS for zero-downtime availability",
          highlighted: false,
        },
        {
          iconName: "Lock",
          title: "Immutable Infrastructure as Code (IaC)",
          description:
            "Deploys deterministic, multi-environment infrastructure using peer-reviewed Terraform and OpenTofu templates.",
          highlighted: true,
        },
        {
          iconName: "TrendingDown",
          title: "Automated CI/CD & GitOps Workflows",
          description:
            "Drives reliable delivery through GitLab CI, GitHub Actions, or ArgoCD with mandatory build validation.",
          highlighted: false,
        },
        {
          iconName: "Database",
          title: "DevSecOps & Shift-Left Security SOPs",
          description:
            "Injects automated pipeline scanning via Trivy or Snyk and manages secrets securely through HashiCorp Vault",
          highlighted: false,
        },
        {
          iconName: "Network",
          title: "Continuous FinOps & Resource Optimization",
          description:
            "Cuts cloud waste using weekly Kubecost and CloudWatch audits to automate resource right-sizing.",
          highlighted: false,
        },
        {
          iconName: "Layers",
          title: "Proactive Observability & Incident Response",
          description:
            "Monitors stack health using Prometheus, Grafana, and Datadog with automated anomaly alerting.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "ECOMMERCE GIANT",
          tabSub: "AWS Migration & Platform",
          projectTitle: "AWS Cloud Migration & Platform Modernisation",
          description:
            "Migrated a peak-traffic e-commerce platform from on-premise to AWS, handling 500K concurrent users during flash sale events with zero downtime.",
          bullets: [
            "Zero-downtime migration of 240+ microservices to AWS EKS",
            "Auto-scaling achieving 500K concurrent users during peak events",
            "FinOps program delivering 38% reduction in monthly cloud spend",
          ],
          stats: [
            { value: "500K", label: "Concurrent users handled" },
            { value: "38%", label: "Cloud cost reduction" },
            { value: "0", label: "Downtime during migration" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "FINTECH STARTUP",
          tabSub: "Kubernetes Platform Engineering",
          projectTitle: "Production Kubernetes Platform for FinTech",
          description:
            "Designed and deployed a production-grade Kubernetes platform enabling a FinTech startup to achieve PCI-DSS compliance and 99.99% availability.",
          bullets: [
            "Multi-cluster Kubernetes with Istio service mesh and mTLS everywhere",
            "GitOps deployment pipeline with ArgoCD enabling 40+ daily deployments",
            "PCI-DSS compliant infrastructure achieving SOC 2 Type II certification",
          ],
          stats: [
            { value: "99.99%", label: "Platform availability" },
            { value: "40+", label: "Daily deployments" },
            { value: "SOC 2", label: "Type II certified" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "MEDIA CO",
          tabSub: "Serverless Video Processing",
          projectTitle: "Serverless Video Processing at Scale",
          description:
            "Rebuilt a video processing pipeline on serverless architecture, reducing infrastructure costs by 72% while handling 10x more content volume.",
          bullets: [
            "Event-driven serverless pipeline processing 100K+ videos monthly",
            "Auto-scaling from 0 to 10,000 concurrent jobs with no pre-provisioning",
            "CDN and edge optimisation achieving 40% faster global video delivery",
          ],
          stats: [
            { value: "72%", label: "Infrastructure cost reduction" },
            { value: "100K+", label: "Videos processed monthly" },
            { value: "10x", label: "Volume increase handled" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
    cta: {
      title: "Ready to Modernize Your Cloud Infrastructure?",
      content:
        "Partner with Beno Support to optimize cloud operations, automate infrastructure, and accelerate cloud-native transformation.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },
    faq: [
      {
        question: "Which cloud platforms do you support?",
        answer:
          "We support AWS, Microsoft Azure, Google Cloud Platform, and hybrid cloud environments.",
      },
      {
        question: "Do you provide cloud migration services?",
        answer:
          "Yes. We help businesses migrate applications and infrastructure to cloud-native environments.",
      },
      {
        question: "Can you optimize cloud costs?",
        answer:
          "Absolutely. Our FinOps services improve cloud efficiency and reduce unnecessary operational spending.",
      },
      {
        question: "Do you provide Kubernetes consulting?",
        answer:
          "Yes. We provide Kubernetes deployment, orchestration, automation, and container management services.",
      },
      {
        question: "Can startups use your cloud engineering services?",
        answer:
          "Yes. We help startups build scalable cloud infrastructure designed for rapid growth and operational flexibility.",
      },
    ],
  },

  "workforce-technology-human-capital-advisory": {
    meta: {
      title: "HR Technology Consulting & Workforce Automation Services",
      description:
        "Modernize workforce operations with HR technology integration, AI workforce transformation, talent consulting, and HR automation services.",
      canonicalUrl: "/services/workforce-technology-human-capital-advisory",
    },
    hero: {
      image: "/assets/services/workforce_tech.svg",
      imageAlt: "Workforce Automation Services",
      tagline: "Modernize Workforce Operations with Intelligent HR Technology ",

      description:
        "Beno Support helps startups, SMBs, and enterprises streamline workforce operations, modernize HR systems, and improve employee experiences through AI-powered workforce technology solutions.",
    },
    intro: {
      sectionLabel: "Intro",
      title: "HR Technology & Workforce Transformation Solutions",
      paragraphs: [
        "Modern workforce management requires scalable HR technology, intelligent automation, and data-driven employee experiences.",
        "Beno Support helps organizations modernize workforce operations through enterprise HR platform integration, AI workforce transformation, talent technology consulting, and HR process automation solutions designed for operational efficiency and business growth.",
        "Our teams combine HR technology expertise, automation capabilities, enterprise integration experience, and workforce transformation strategies to help businesses build future-ready workforce ecosystems.",
      ],
    },
    capabilities: {
      sectionLabel: "Workforce Capabilities",
      title: "CORE WORKFORCE TECHNOLOGY CAPABILITIES",
      subtitle:
        "From HRMS implementation through workforce analytics and digital learning, our human capital technology capability covers the full employee lifecycle.",
      cards: [
        {
          iconName: "Users",
          title: "Enterprise HR Tech Integration",
          description:
            "Implement and optimize enterprise HR platforms that improve workforce operations, employee engagement, and digital HR transformation.",
          features: [
            "HR platform implementation",
            "Workforce system integration",
            "Employee lifecycle automation",
            "HR analytics & reporting",
            "Payroll & attendance integration",
            "Enterprise HR modernization",
          ],
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "Workday",
          description:
            "Streamline HR, finance, and workforce operations using Workday's cloud-based enterprise platform designed for modern digital organizations.",
          features: [
            "Workday implementation",
            "Human capital management",
            "Payroll & workforce",
            "Employee experience",
            "HR analytics",
            "Cloud-based HR",
          ],
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "SAP Success Factors",
          description:
            "Modernize workforce operations and talent management with SAP SuccessFactors solutions that improve employee engagement, performance, and organizational agility.",
          features: [
            "SAP implementation",
            "Talent management",
            "Performance management",
            "Employee experience",
            "Learning & development integration",
            "Workforce analytics",
          ],
          highlighted: false,
        },
        {
          iconName: "Users",
          title: "Darwinbox",
          description:
            "Empower organizations with an agile HR platform that simplifies workforce management, employee engagement, and operational efficiency.",
          features: [
            "Darwinbox implementation",
            "Employee lifecycle management",
            "Payroll & HRMS integration",
            "Workforce engagement solutions",
            "HR workflow automation",
            "Mobile-first employee experience",
          ],
          highlighted: false,
        },
        {
          iconName: "Brain",
          title: "AI Workforce Upskilling Programs",
          description:
            "Prepare teams for AI-driven transformation through workforce enablement and digital upskilling initiatives.",
          features: [
            "AI readiness training",
            "Workforce AI adoption programs",
            "Digital transformation workshops",
            "AI productivity enablement",
            "Leadership upskilling sessions",
            "Enterprise learning strategies",
          ],
          highlighted: false,
        },
        {
          iconName: "Briefcase",
          title: "Talent Technology Consulting",
          description:
            "Optimize recruitment, workforce planning, and talent management systems through technology-driven consulting.",
          features: [
            "Talent acquisition optimization",
            "Recruitment technology consulting",
            "Workforce planning systems",
            "Employee engagement tools",
            "HR workflow optimization",
            "Talent analytics solutions",
          ],
          highlighted: false,
        },
        {
          iconName: "Workflow",
          title: "HR Process Automation",
          description:
            "Automate repetitive HR operations and workforce management tasks using intelligent automation solutions.",
          features: [
            "Employee onboarding automation",
            "Leave & attendance workflows",
            "HR approval automation",
            "AI-driven HR operations",
            "Document workflow automation",
            "Workforce productivity optimization",
          ],
          highlighted: false,
        },
      ],
    },
    scale: {
      sectionLabel: "How We Guarantee Scale",
      title: "Workforce Engineering & Platform Assurance",
      subtitle:
        "Building reliable, compliant, and highly automated workforce platforms with enterprise precision.",
      cards: [
        {
          iconName: "Database",
          title: "Core HR\nArchitecture Alignment",
          description:
            "Migrate complex legacy data smoothly to Workday, SuccessFactors, or Darwinbox without operational risk or data loss.",
          highlighted: false,
        },
        {
          iconName: "Search",
          title: "Empirical\nProcess Mining",
          description:
            "Run detailed workplace discovery workshops to isolate and fix operational bottlenecks before engineering automations.",
          highlighted: true,
        },
        {
          iconName: "MessageSquare",
          title: "Continuous\nFeedback Loops",
          description:
            "Embed pulse data capturing directly into daily communication tools to mitigate early attrition risks.",
          highlighted: false,
        },
        {
          iconName: "ShieldCheck",
          title: "Compliant Global\nArchitecture",
          description:
            "Apply automated regulatory checklists and international compliance standards to safeguard remote operations.",
          highlighted: false,
        },
        {
          iconName: "GraduationCap",
          title: "High-Fidelity\nTraining Modules",
          description:
            "Deliver interactive learning modules and post-training benchmarks to ensure fast platform adoption.",
          highlighted: false,
        },
        {
          iconName: "BarChart3",
          title: "Unified Workforce\nAnalytics",
          description:
            "Clean data schemas to monitor headcount metrics, software utilization, and output on one single glass pane.",
          highlighted: false,
        },
      ],
    },
    useCases: {
      sectionLabel: "Case Studies",
      title: "STRATEGIC USE CASES",
      cases: [
        {
          tabLabel: "GLOBAL CORP",
          tabSub: "HRMS Transformation",
          projectTitle: "Global HRMS Transformation & Consolidation",
          description:
            "Consolidated 6 disparate HR systems into a single Workday platform for a 15,000-employee global enterprise with operations in 22 countries.",
          bullets: [
            "Workday HCM deployment with multi-country payroll across 22 jurisdictions",
            "Legacy data migration of 15 years of employee records with 99.8% accuracy",
            "Employee self-service adoption reaching 92% within 60 days of go-live",
          ],
          stats: [
            { value: "92%", label: "Self-service adoption rate" },
            { value: "22", label: "Countries on single platform" },
            { value: "40%", label: "HR admin cost reduction" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "TECHSTART",
          tabSub: "Workforce Analytics Platform",
          projectTitle: "People Analytics Platform for High-Growth Startup",
          description:
            "Built a custom workforce analytics platform for a 1,200-person tech company providing real-time insights on attrition, skills gaps, and team performance.",
          bullets: [
            "Predictive attrition model with 87% accuracy identifying at-risk employees",
            "Skills inventory platform mapping 400+ competencies across 60 job families",
            "Manager effectiveness dashboard improving engagement scores by 22%",
          ],
          stats: [
            { value: "87%", label: "Attrition prediction accuracy" },
            { value: "34%", label: "Reduction in unwanted attrition" },
            { value: "22%", label: "Increase in engagement scores" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
        {
          tabLabel: "RETAILCO",
          tabSub: "LMS & Digital Learning",
          projectTitle: "Enterprise LMS & Digital Learning Transformation",
          description:
            "Deployed and customised a learning management system for a 20,000-employee retailer, shifting from in-person training to digital-first learning at scale.",
          bullets: [
            "Cornerstone OnDemand implementation with custom retail-specific content library",
            "AI-powered learning path recommendations reducing time-to-competency by 45%",
            "Mobile-first learning app achieving 78% active monthly users across stores",
          ],
          stats: [
            { value: "78%", label: "Monthly active learners" },
            { value: "45%", label: "Faster time-to-competency" },
            { value: "Â£800K", label: "Training cost savings annually" },
          ],
          ctaLabel: "View Case Study",
          visualimg: "/assets/services/servicemain.svg",
        },
      ],
    },
    cta: {
      title: "Ready to Transform Workforce Operations?",
      content:
        "Partner with Beno Support to modernize HR systems, automate workforce processes, and build intelligent workforce technology ecosystems that improve operational efficiency.",
      buttons: [
  "Request a Proposal",
  "Talk To Our Experts",
],
    },

    faq: [
      {
        question: "Which HR platforms does Beno Support support?",
        answer:
          "We support Workday, SAP SuccessFactors, Darwinbox, and enterprise HR technology ecosystems.",
      },
      {
        question: "Do you provide AI workforce transformation consulting?",
        answer:
          "Yes. We help businesses implement AI-driven workforce modernization and employee productivity solutions.",
      },
      {
        question: "Can you automate HR workflows?",
        answer:
          "Absolutely. We automate onboarding, approvals, attendance, employee operations, and HR process management workflows.",
      },
      {
        question: "Do you provide workforce upskilling programs?",
        answer:
          "Yes. We offer AI readiness programs, digital transformation workshops, and workforce enablement training initiatives.",
      },
      {
        question:
          "Can startups and SMBs use your workforce technology services?",
        answer:
          "Yes. We provide scalable HR technology and workforce automation solutions tailored for startups, SMBs, and enterprises.",
      },
    ],
  },
};