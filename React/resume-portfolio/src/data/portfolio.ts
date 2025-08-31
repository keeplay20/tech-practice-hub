import { Experience, SkillCategory, Contact, PersonalInfo } from "../types";

export const personalInfo: PersonalInfo = {
  name: "Mandar Vyas",
  title: "Software Development Engineer",
  summary:
    "Passionate developer with 10+ years of experience building scalable web and mobile applications. Currently driving innovation at Dream11 with React Native and modern web technologies.",
  yearsOfExperience: 8,
  location: "India",
  email: "mandar.vyas20@gmail.com",
  linkedin: "https://www.linkedin.com/in/mandar-vyas/",
  github: "https://github.com/keeplay20",
  website: "https://keeplay20.github.io/tech-practice-hub/",
};

export const experiences: Experience[] = [
  {
    id: "dream11",
    company: "Dream11",
    position: "Software Development Engineer - 2",
    duration: "2021 - Present",
    location: "Mumbai, India",
    description: [
      "Built and shipped features in the Dream11 React Native app including My Balance, My Transactions, and Verification flows",
      "Developed multiple bottom sheets for seamless in-app interactions",
      "Designed and developed internal React-based admin panels to streamline Customer Support operations",
      "Architected Detox-based E2E testing framework integrated with CI/CD pipelines",
      "Created mock payment system for development and QA environments",
      "Built label-based automation framework to reduce test flakiness and improve maintainability",
    ],
    technologies: [
      "React Native",
      "React",
      "JavaScript",
      "TypeScript",
      "Jenkins",
      "Detox",
      "Node.js",
    ],
  },
  {
    id: "gupshup",
    company: "Gupshup",
    position: "Software Engineer",
    duration: "2019 - 2021",
    location: "Mumbai, India",
    description: [
      "Automated backend components (HTTPSender, SMSSender) to improve reliability and speed of messaging flows",
      "Developed shell scripts for automated test data generation, reducing manual dependency",
      "Conducted API performance testing using JMeter and Postman, identifying bottlenecks in message delivery",
      "Reviewed code/test coverage and guided teammates to improve system stability",
      "Collaborated with cross-functional teams to deliver high-quality messaging solutions",
    ],
    technologies: [
      "Java",
      "Postman",
      "JMeter",
      "Shell Scripting",
      "JIRA",
      "MySQL",
      "REST APIs",
    ],
  },
  {
    id: "vxl",
    company: "VXL Instruments",
    position: "Software Engineer",
    duration: "2016 - 2019",
    location: "Pune, India",
    description: [
      "Contributed to testing and development of Linux-based OS (LetOS, Gio6) and web-based management tools",
      "Developed automation scripts with Selenium + TestNG for Lenovo Terminal Manager, reducing manual QA cycles",
      "Collaborated with dev teams to design and execute test strategies for new releases",
      "Built comprehensive test suites for hardware-software integration testing",
    ],
    technologies: [
      "Selenium",
      "TestNG",
      "Linux OS",
      "JavaScript",
      "Python",
      "Bash",
      "Jenkins",
    ],
  },
  {
    id: "freelancer",
    company: "Freelancer",
    position: "Full Stack Developer",
    duration: "2015 - 2016",
    location: "Remote",
    description: [
      "Delivered custom automation and development projects for multiple startups",
      "Built web applications using modern JavaScript frameworks",
      "Developed testing frameworks and automation solutions",
      "Provided consulting services for small to medium businesses",
    ],
    technologies: [
      "JavaScript",
      "HTML/CSS",
      "Node.js",
      "MongoDB",
      "Express.js",
      "React",
    ],
  },
  {
    id: "wipro",
    company: "Wipro",
    position: "Technical Consultant",
    duration: "2014 - 2015",
    location: "Bangalore, India",
    description: [
      "Developed custom SharePoint pages for business process automation",
      "Installed, configured, and supported Microsoft SharePoint 2013 & SharePoint Online for EMEA & APAC clients",
      "Automated workflows to reduce manual processes in enterprise setups",
      "Provided technical support and training to end users",
    ],
    technologies: [
      "SharePoint 2013/Online",
      "JavaScript",
      "PowerShell",
      "C#",
      ".NET",
      "SQL Server",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming Languages",
    icon: "💻",
    description: "Core programming languages and markup technologies",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Shell Scripting"],
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "⚛️",
    description: "Modern frontend frameworks and libraries",
    skills: [
      "React.js",
      "React Native",
      "Redux",
      "Context API",
      "Styled Components",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "🔧",
    description: "Server-side technologies and databases",
    skills: ["REST APIs", "GraphQL", "MySQL"],
  },
  {
    id: "devops",
    name: "DevOps & Tools",
    icon: "🚀",
    description: "Development tools and deployment technologies",
    skills: ["Git & GitHub", "Jenkins", "GitHub Actions", "AWS", "Linux"],
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: "📱",
    description: "Cross-platform and native mobile development",
    skills: [
      "React Native",
      "Expo",
      "Android SDK",
      "iOS Development",
      "App Store Deployment",
      "Play Store Deployment",
    ],
  },
  {
    id: "testing",
    name: "Testing & QA",
    icon: "🧪",
    description: "Testing frameworks and quality assurance tools",
    skills: [
      "Jest",
      "React Testing Library",
      "Selenium",
      "Detox",
      "JMeter",
      "Postman",
      "TestNG",
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Analytics",
    icon: "📊",
    description: "Performance monitoring and analytics tools",
    skills: ["Crashlytics", "Firebase Analytics", "Datadog"],
  },
  {
    id: "collaboration",
    name: "Collaboration & Project Management",
    icon: "🤝",
    description: "Tools for team collaboration and project management",
    skills: ["Jira", "Confluence", "Slack", "Notion", "Miro", "Figma"],
  },
];

export const certifications = [
  {
    name: "ISTQB - Test Automation Engineer (CT-TAE)",
    issuer: "ISTQB",
    year: "2020",
    credentialId: "TAE-2020-001",
  },
  {
    name: "ISTQB - Foundation Level (CTFL)",
    issuer: "ISTQB",
    year: "2019",
    credentialId: "CTFL-2019-001",
  },
];

export const contact: Contact = {
  email: "mandar.vyas20@gmail.com",
  location: "Mumbai, India",
  linkedin: "https://www.linkedin.com/in/mandar-vyas/",
  github: "https://github.com/keeplay20",
};

export const aboutText = [
  "I'm a Senior Full Stack Developer currently working at Dream11, where I build and ship features for millions of users. With over 10 years of experience in software development, I specialize in React Native, React.js, and modern web technologies.",
  "My journey started as a Technical Consultant at Wipro, and I've since worked across various domains including messaging platforms at Gupshup, Linux-based systems at VXL Instruments, and now fantasy sports at Dream11. I'm passionate about automation, testing, and building scalable applications.",
  "I love creating efficient, maintainable code and have a strong background in both frontend and backend development. I'm also experienced in setting up CI/CD pipelines, automated testing frameworks, and performance monitoring systems.",
];

export const heroStats = [
  { label: "Years of Experience", value: "10+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Companies Worked", value: "5+" },
  { label: "Technologies Mastered", value: "25+" },
];
