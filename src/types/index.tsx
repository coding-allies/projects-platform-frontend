export interface User {
  name: string;
  is_authenticated: boolean
}

type ExperienceLevels =
  | "Learner (0+ years of experience)"
  | "Beginner (1+ years of experience)"
  | "Experienced (3+ years of experience)";

export const ExperienceLevelsTypes =
  ["Learner (0+ years of experience)",
    "Beginner (1+ years of experience)",
    "Experienced (3+ years of experience)"];

interface ProjectLead {
  name: string;
  experience: ExperienceLevels;
  position: string;
}

export interface Project {
  name: string;
  id: number;
  lead: ProjectLead;
  looking_for: string;
  description: string;
  contributors: Array<string>;
  tags: Array<string>;
  githubUrl: string;
  email: string;
}

export interface AppContextState {
  user: User;
  projects: Array<Project>;
}
