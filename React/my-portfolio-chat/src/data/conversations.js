export const conversations = [
  {
    id: "welcome",
    title: "Welcome",
    emoji: "👋",
    description: "Start here to explore my portfolio",
    messages: [
      {
        from: "me",
        text: "👋 Hi there! I'm Mandar Vyas, a Full Stack Developer with a passion for creating engaging web experiences.",
      },
      {
        from: "me",
        text: "Feel free to explore my portfolio through different perspectives - whether you're a recruiter, tech lead, or just curious about my projects!",
      },
      {
        from: "me",
        text: "You can also use the Quick Actions panel on the right to learn about my experience, skills, and certifications. Or if you need a break, try out some fun games by clicking the 'Bored?' button!",
      },
    ],
  },
  {
    id: "recruiter",
    title: "Recruiter View",
    emoji: "👔",
    description: "Overview of my professional experience and achievements",
    messages: [
      {
        from: "me",
        text: "Hello! Let me give you a recruiter-focused overview of my background.",
      },
      {
        from: "me",
        text: "I'm a Full Stack Developer with 5+ years of experience, specializing in React, Node.js, and cloud technologies.",
      },
      {
        from: "me",
        text: "I've led multiple successful projects, including a high-traffic e-commerce platform that improved conversion rates by 25% and a real-time analytics dashboard that reduced data processing time by 40%.",
      },
      {
        from: "me",
        text: "I'm particularly proud of my work on optimizing application performance and implementing scalable architecture solutions.",
      },
    ],
  },
  {
    id: "tech-lead",
    title: "Technical Deep-Dive",
    emoji: "💻",
    description:
      "Detailed look at my technical expertise and architecture decisions",
    messages: [
      {
        from: "me",
        text: "Welcome to the technical deep-dive of my work!",
      },
      {
        from: "me",
        text: "My tech stack includes React/Next.js for frontend, Node.js/Express for backend, and AWS/GCP for cloud infrastructure.",
      },
      {
        from: "me",
        text: "I've implemented microservices architectures, event-driven systems, and real-time data processing pipelines.",
      },
      {
        from: "me",
        text: "I'm particularly interested in system design, performance optimization, and maintaining high-quality codebases through proper testing and CI/CD practices.",
      },
    ],
  },
  {
    id: "projects",
    title: "Project Showcase",
    emoji: "🚀",
    description: "Explore my key projects and their impact",
    messages: [
      {
        from: "me",
        text: "Let me walk you through some of my key projects!",
      },
      {
        from: "me",
        text: "1. E-commerce Platform Revamp:\n- React/Next.js frontend with Node.js microservices\n- Improved load times by 60%\n- Implemented real-time inventory tracking",
      },
      {
        from: "me",
        text: "2. Analytics Dashboard:\n- Built with React, D3.js, and WebSocket\n- Real-time data visualization\n- Handles millions of data points efficiently",
      },
      {
        from: "me",
        text: "3. Cloud Migration Project:\n- Led migration to AWS\n- Implemented auto-scaling and disaster recovery\n- Reduced infrastructure costs by 35%",
      },
    ],
  },
];

export const getConversationById = (id) => {
  return conversations.find((conv) => conv.id === id);
};
