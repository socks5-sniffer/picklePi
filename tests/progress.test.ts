import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidProgress, mergeProgress } from "../src/lib/progress";
import { fetchProgress, saveProgress, createLabEntry } from "../src/lib/api";

const empty = { projectStatuses: {}, badges: [], labNotebook: [] };
test("accepts saved progress and rejects shapes that crash rendering", () => {
  assert.equal(isValidProgress(empty), true);
  for (const value of [
    null,
    [],
    { ...empty, badges: null },
    { ...empty, badges: [1] },
    { ...empty, projectStatuses: null },
    { ...empty, projectStatuses: { p1: "invalid" } },
    { ...empty, labNotebook: [null] },
    { ...empty, labNotebook: [{}] },
  ]) {
    assert.equal(isValidProgress(value), false);
  }
});
test("standalone browsing and saving never contact an unconfigured backend", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("No backend");
  };
  try {
    assert.equal(await fetchProgress(), null);
    await saveProgress(empty);
    assert.equal(
      await createLabEntry({
        projectId: "p1",
        whatWorked: "LED",
        whatDidnt: "",
        whatChanged: "",
        oneThingLearned: "GPIO",
      }),
      null,
    );
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = original;
  }
});

test("merges local and remote work without downgrading completion or duplicating reflections", () => {
  const entry = {
    id: "local",
    projectId: "p1",
    whatWorked: "LED",
    whatDidnt: "",
    whatChanged: "",
    oneThingLearned: "GPIO",
    date: "2026-10-30T12:00:00Z",
  };
  const remoteEntry = { ...entry, id: "remote", date: "2026-10-29T12:00:00Z" };
  const local = {
    projectStatuses: { p1: "In Progress", p2: "Completed" },
    badges: ["local-badge"],
    labNotebook: [entry],
  } as const;
  const remote = {
    projectStatuses: { p1: "Completed", p2: "Not Started", p3: "In Progress" },
    badges: ["remote-badge", "local-badge"],
    labNotebook: [remoteEntry, entry],
  } as const;
  const result = mergeProgress(
    {
      ...local,
      badges: [...local.badges],
      labNotebook: [...local.labNotebook],
    },
    {
      ...remote,
      badges: [...remote.badges],
      labNotebook: [...remote.labNotebook],
    },
  );
  assert.deepEqual(result.projectStatuses, {
    p1: "Completed",
    p2: "Completed",
    p3: "In Progress",
  });
  assert.deepEqual(result.badges, ["local-badge", "remote-badge"]);
  assert.deepEqual(
    result.labNotebook.map((item) => item.id),
    ["remote", "local"],
  );
  assert.equal(local.projectStatuses.p1, "In Progress");
  assert.equal(remote.projectStatuses.p2, "Not Started");
});
