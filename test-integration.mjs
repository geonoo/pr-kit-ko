/**
 * VS Code API 없이 확장 핵심 흐름을 검증한다.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { isProLicense } = require("./proLicense.js");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatesDir = path.join(__dirname, "templates");
const catalog = JSON.parse(
  fs.readFileSync(path.join(templatesDir, "catalog.json"), "utf8")
);

function entriesForKind(kind, pro, customDir) {
  const free = catalog.free.filter((e) => e.kind === kind);
  if (!pro) {
    return {
      items: free,
      locked: catalog.pro.filter((e) => e.kind === kind),
    };
  }
  const custom = [];
  if (customDir && fs.existsSync(customDir)) {
    for (const name of fs.readdirSync(customDir).filter((n) => n.endsWith(".md"))) {
      if (name.includes(kind) || name.startsWith(kind)) {
        custom.push({
          id: `custom:${name}`,
          kind,
          title: name,
          absolute: path.join(customDir, name),
        });
      }
    }
  }
  return {
    items: [...free, ...catalog.pro.filter((e) => e.kind === kind), ...custom],
    locked: [],
  };
}

function applyWorkspace(root, pro) {
  const githubDir = path.join(root, ".github");
  fs.mkdirSync(githubDir, { recursive: true });
  const writes = [
    {
      path: path.join(githubDir, "pull_request_template.md"),
      file: "pr-default-ko.md",
    },
    { path: path.join(root, "COMMIT_CONVENTION.md"), file: "commit-conventional-ko.md" },
    { path: path.join(root, "REVIEW_CHECKLIST.md"), file: "checklist-review-ko.md" },
  ];
  if (pro) {
    writes.push({
      path: path.join(root, "AGENT_PR_PROMPT.md"),
      file: "agent-pr-ko.md",
    });
  }
  const created = [];
  for (const w of writes) {
    if (fs.existsSync(w.path)) continue;
    fs.writeFileSync(
      w.path,
      fs.readFileSync(path.join(templatesDir, w.file), "utf8")
    );
    created.push(path.basename(w.path));
  }
  return created;
}

test("free mode: PR 1개, agent는 잠금만", () => {
  const pr = entriesForKind("pr", false);
  assert.equal(pr.items.length, 1);
  assert.ok(pr.locked.length >= 1);
  const agent = entriesForKind("agent", false);
  assert.equal(agent.items.length, 0);
  assert.equal(agent.locked.length, 1);
});

test("pro mode: agent 해제 + 커스텀 로드", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "prkit-"));
  const custom = path.join(tmp, ".pr-kit");
  fs.mkdirSync(custom);
  fs.writeFileSync(path.join(custom, "pr-acme.md"), "## ACME PR\n");
  const pr = entriesForKind("pr", true, custom);
  assert.ok(pr.items.some((e) => e.id === "custom:pr-acme.md"));
  assert.equal(pr.locked.length, 0);
  const agent = entriesForKind("agent", true, custom);
  assert.equal(agent.items.length, 1);
  assert.equal(agent.locked.length, 0);
  fs.rmSync(tmp, { recursive: true, force: true });
});

test("워크스페이스 파일 생성: free vs pro", () => {
  const freeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "prkit-ws-"));
  const createdFree = applyWorkspace(freeRoot, false);
  assert.ok(createdFree.includes("pull_request_template.md"));
  assert.ok(!fs.existsSync(path.join(freeRoot, "AGENT_PR_PROMPT.md")));
  const again = applyWorkspace(freeRoot, false);
  assert.equal(again.length, 0, "기존 파일은 덮어쓰지 않음");

  const proRoot = fs.mkdtempSync(path.join(os.tmpdir(), "prkit-ws-"));
  applyWorkspace(proRoot, true);
  assert.ok(fs.existsSync(path.join(proRoot, "AGENT_PR_PROMPT.md")));
  const body = fs.readFileSync(
    path.join(proRoot, ".github", "pull_request_template.md"),
    "utf8"
  );
  assert.match(body, /## 요약/);

  fs.rmSync(freeRoot, { recursive: true, force: true });
  fs.rmSync(proRoot, { recursive: true, force: true });
});

test("데모 키로 Pro 판정", () => {
  assert.equal(isProLicense("PRKIT-PRO-DEMO-2026"), true);
});
