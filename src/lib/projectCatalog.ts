import type { Project } from "../types";

export const projectStages = [
  "All projects",
  "First sparks",
  "Sense & respond",
  "Build a system",
] as const;
export type ProjectStage = (typeof projectStages)[number];

export function getProjectStage(level: number): ProjectStage {
  return level <= 4
    ? "First sparks"
    : level <= 9
      ? "Sense & respond"
      : "Build a system";
}

export function filterProjects(
  projects: Project[],
  stage: ProjectStage,
  search: string,
): Project[] {
  const query = search.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (stage === "All projects" || getProjectStage(project.level) === stage) &&
      [project.title, project.levelName, ...project.skillsLearned]
        .join(" ")
        .toLowerCase()
        .includes(query),
  );
}

export function getNextProject(
  projects: Project[],
  statuses: Record<string, string>,
): Project | undefined {
  return (
    projects.find((project) => statuses[project.id] === "In Progress") ??
    projects.find((project) => statuses[project.id] !== "Completed")
  );
}
