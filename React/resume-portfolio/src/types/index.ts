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
