import { test } from "node:test";
import assert from "node:assert/strict";
import {
  availableSections,
  clampPageIndex,
  getLessonPage,
  stepProgress,
} from "../src/lib/learning";
import type { ProjectContent } from "../src/types";

const content: ProjectContent = {
  overview: {
    description: "Start",
    concepts: [],
    difficulty: 1,
    estimatedTime: "10 minutes",
  },
  hardwareSetup: { warnings: [], steps: [], explanation: "" },
  code: "",
  codeWalkthrough: [],
  conceptDeepDive: { hardware: "", software: "", connection: "" },
  experimentMode: { tweak: "", logic: "", creative: "" },
  troubleshooting: [],
};

test("uses project content for a lesson without pages or an invalid page", () => {
  assert.equal(getLessonPage(content, 0), content);
  const page = { ...content, code: "print(1)" };
  const paged = {
    ...content,
    pages: [{ id: "one", title: "One", content: page }],
  };
  assert.equal(getLessonPage(paged, 0), page);
  assert.equal(getLessonPage(paged, 3), paged);
});

test("keeps navigation within available pages, including a reset to the first page", () => {
  assert.equal(clampPageIndex(-1, 3), 0);
  assert.equal(clampPageIndex(2, 3), 2);
  assert.equal(clampPageIndex(3, 3), 2);
  assert.equal(clampPageIndex(0, 0), 0);
});

test("reports only sections with lesson content", () => {
  assert.deepEqual(availableSections(content), {
    hardware: false,
    code: false,
    walkthrough: false,
    deepDive: false,
    experiments: false,
    troubleshooting: false,
  });
  assert.deepEqual(
    availableSections({
      ...content,
      code: "hello",
      conceptDeepDive: { ...content.conceptDeepDive, connection: "why" },
    }),
    {
      hardware: false,
      code: true,
      walkthrough: false,
      deepDive: true,
      experiments: false,
      troubleshooting: false,
    },
  );
});

test("bounds step progress and does not mark an empty list complete", () => {
  assert.deepEqual(stepProgress(0, 0), {
    doneCount: 0,
    total: 0,
    allDone: false,
    widthClass: "w-0",
  });
  assert.deepEqual(stepProgress(3, 2), {
    doneCount: 2,
    total: 2,
    allDone: true,
    widthClass: "w-full",
  });
  assert.equal(stepProgress(1, 2).widthClass, "w-6/12");
});
