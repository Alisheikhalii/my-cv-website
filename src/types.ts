export enum Language {
  EN = 'en',
  FA = 'fa'
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  link?: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface Publication {
  title: string;
  authors: string;
  source: string;
  year: string;
}

export interface Patent {
  title: string;
  status: string;
  year: string;
  location: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  about: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    orcid: string;
  };
  education: Education[];
  experience: Experience[];
  researchProjects: Project[];
  publications: Publication[];
  patents: Patent[];
  skills: SkillGroup[];
  awards: Award[];
  researchInterests: string[];
  courses: string[];
  languages: string[];
}

export interface Content {
  [Language.EN]: ResumeData;
  [Language.FA]: ResumeData;
}
