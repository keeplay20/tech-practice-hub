export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
  description?: string;
}

export interface Contact {
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
  twitter?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  yearsOfExperience: number;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin: string;
  github: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  category: "Mobile App" | "Web App" | "Full Stack" | "Other";
  technologies: string[];
  features: string[];
  highlights: string[];
  status: "Completed" | "In Progress" | "Planned";
  demoVideo?: string;
  liveDemo?: string;
  githubRepo: string;
  downloadLinks?: {
    android?: string;
    ios?: string;
    apk?: string;
  };
  images?: string[];
  duration: string;
  teamSize?: number;
}

export interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
}
