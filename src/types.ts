export type ProjectStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface ProjectContent {
  overview: {
    description: string;
    concepts: string[];
    difficulty: number;
    estimatedTime: string;
  };
  hardwareSetup: {
    warnings: string[];
    steps: string[];
    explanation: string;
  };
  code: string;
  codeWalkthrough: { section: string; explanation: string }[];
  conceptDeepDive: { hardware: string; software: string; connection: string };
  experimentMode: { tweak: string; logic: string; creative: string };
  troubleshooting: { issue: string; solution: string }[];
}

export interface Project {
  id: string;
  level: number;
  levelName: string;
  title: string;
  skillsLearned: string[];
  badgeEarned: string;
  content: ProjectContent | null;
}

export interface LabEntry {
  id: string;
  projectId: string;
  whatWorked: string;
  whatDidnt: string;
  whatChanged: string;
  oneThingLearned: string;
  date: string;
}

export interface UserProgress {
  projectStatuses: Record<string, ProjectStatus>;
  badges: string[];
  labNotebook: LabEntry[];
}
