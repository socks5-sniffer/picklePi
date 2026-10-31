import { PageContent, ProjectContent } from "../types";

/** A project without pages still has a complete, usable lesson. */
export function getLessonPage(
  content: ProjectContent,
  index: number,
): PageContent {
  return content.pages?.[index]?.content ?? content;
}

export function clampPageIndex(index: number, pageCount: number): number {
  return Math.max(0, Math.min(index, Math.max(0, pageCount - 1)));
}

export function availableSections(content: PageContent) {
  return {
    hardware:
      content.hardwareSetup.steps.length > 0 ||
      content.hardwareSetup.warnings.length > 0 ||
      Boolean(content.hardwareSetup.explanation),
    code: Boolean(content.code),
    walkthrough: content.codeWalkthrough.length > 0,
    deepDive: Object.values(content.conceptDeepDive).some(Boolean),
    experiments: Object.values(content.experimentMode).some(Boolean),
    troubleshooting: content.troubleshooting.length > 0,
  };
}

export function stepProgress(completed: number, total: number) {
  const safeTotal = Math.max(0, total);
  const doneCount = Math.max(0, Math.min(completed, safeTotal));
  const fraction = safeTotal ? doneCount / safeTotal : 0;
  const widths = [
    "w-0",
    "w-1/12",
    "w-2/12",
    "w-3/12",
    "w-4/12",
    "w-5/12",
    "w-6/12",
    "w-7/12",
    "w-8/12",
    "w-9/12",
    "w-10/12",
    "w-11/12",
    "w-full",
  ];
  return {
    doneCount,
    total: safeTotal,
    allDone: safeTotal > 0 && doneCount === safeTotal,
    widthClass: widths[Math.round(fraction * 12)],
  };
}
