const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const { isLocalProLicense, verifyGumroadLicense } = require("./proLicense");

const KIND_LABEL = {
  pr: "PR 템플릿",
  commit: "커밋 규칙",
  checklist: "체크리스트",
  agent: "에이전트 프롬프트",
};

function templatesDir() {
  return path.join(__dirname, "templates");
}

function loadCatalog() {
  const raw = fs.readFileSync(path.join(templatesDir(), "catalog.json"), "utf8");
  return JSON.parse(raw);
}

function getLicenseKey() {
  return (
    vscode.workspace.getConfiguration("prKit").get("licenseKey", "") || ""
  ).trim();
}

const licenseCache = { key: "", ok: false };

async function hasPro() {
  const key = getLicenseKey();
  if (!key) {
    licenseCache.key = "";
    licenseCache.ok = false;
    return false;
  }
  if (isLocalProLicense(key)) {
    licenseCache.key = key;
    licenseCache.ok = true;
    return true;
  }
  if (licenseCache.key === key) {
    return licenseCache.ok;
  }
  try {
    const ok = await verifyGumroadLicense(key);
    licenseCache.key = key;
    licenseCache.ok = ok;
    return ok;
  } catch (_err) {
    return false;
  }
}

function entriesForKind(kind) {
  const catalog = loadCatalog();
  const free = catalog.free.filter((e) => e.kind === kind);
  if (!licenseCache.ok) {
    return { items: free, locked: catalog.pro.filter((e) => e.kind === kind) };
  }
  const custom = loadCustomEntries(kind);
  return {
    items: [...free, ...catalog.pro.filter((e) => e.kind === kind), ...custom],
    locked: [],
  };
}

function loadCustomEntries(kind) {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    return [];
  }
  const rel =
    vscode.workspace.getConfiguration("prKit").get("customTemplatesPath", ".pr-kit") ||
    ".pr-kit";
  const dir = path.join(folders[0].uri.fsPath, rel);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const base = name.replace(/\.md$/i, "");
      const inferred =
        kind === "pr" && base.startsWith("pr")
          ? "pr"
          : kind === "commit" && base.startsWith("commit")
            ? "commit"
            : kind === "checklist" && base.startsWith("checklist")
              ? "checklist"
              : kind === "agent" && base.startsWith("agent")
                ? "agent"
                : null;
      if (inferred !== kind && !base.includes(kind)) {
        return null;
      }
      return {
        id: `custom:${base}`,
        kind,
        title: `${base} (커스텀)`,
        file: name,
        absolute: path.join(dir, name),
      };
    })
    .filter(Boolean);
}

function readTemplate(entry) {
  const filePath = entry.absolute || path.join(templatesDir(), entry.file);
  return fs.readFileSync(filePath, "utf8");
}

async function pickAndInsert(kind) {
  await hasPro();
  const { items, locked } = entriesForKind(kind);
  if (items.length === 0 && locked.length === 0) {
    vscode.window.showWarningMessage(`사용 가능한 ${KIND_LABEL[kind]}이(가) 없습니다.`);
    return;
  }

  const picks = [
    ...items.map((e) => ({
      label: e.title,
      description: e.id.startsWith("custom:") ? "커스텀" : "포함",
      entry: e,
    })),
    ...locked.map((e) => ({
      label: `$(lock) ${e.title}`,
      description: "Pro",
      entry: null,
      locked: true,
    })),
  ];

  const chosen = await vscode.window.showQuickPick(picks, {
    placeHolder: `${KIND_LABEL[kind]} 선택`,
  });
  if (!chosen) {
    return;
  }
  if (chosen.locked) {
    const action = await vscode.window.showInformationMessage(
      "이 템플릿은 Pro입니다. Gumroad 구매 키를 설정하거나 무료 템플릿을 사용하세요.",
      "라이선스 안내",
      "닫기"
    );
    if (action === "라이선스 안내") {
      await showLicense();
    }
    return;
  }

  const text = readTemplate(chosen.entry);
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    await editor.edit((edit) => {
      edit.insert(editor.selection.active, text);
    });
    return;
  }

  const doc = await vscode.workspace.openTextDocument({
    content: text,
    language: "markdown",
  });
  await vscode.window.showTextDocument(doc);
}

async function applyWorkspaceFiles() {
  await hasPro();
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    vscode.window.showErrorMessage("열린 워크스페이스가 없습니다.");
    return;
  }
  const root = folders[0].uri.fsPath;
  const githubDir = path.join(root, ".github");
  if (!fs.existsSync(githubDir)) {
    fs.mkdirSync(githubDir, { recursive: true });
  }

  const prPath = path.join(githubDir, "pull_request_template.md");
  const commitPath = path.join(root, "COMMIT_CONVENTION.md");
  const checklistPath = path.join(root, "REVIEW_CHECKLIST.md");

  const writes = [
    { path: prPath, file: "pr-default-ko.md", label: ".github/pull_request_template.md" },
    { path: commitPath, file: "commit-conventional-ko.md", label: "COMMIT_CONVENTION.md" },
    { path: checklistPath, file: "checklist-review-ko.md", label: "REVIEW_CHECKLIST.md" },
  ];

  if (licenseCache.ok) {
    writes.push({
      path: path.join(root, "AGENT_PR_PROMPT.md"),
      file: "agent-pr-ko.md",
      label: "AGENT_PR_PROMPT.md",
    });
  }

  const created = [];
  const skipped = [];
  for (const item of writes) {
    if (fs.existsSync(item.path)) {
      skipped.push(item.label);
      continue;
    }
    fs.writeFileSync(item.path, fs.readFileSync(path.join(templatesDir(), item.file), "utf8"));
    created.push(item.label);
  }

  const parts = [];
  if (created.length) {
    parts.push(`생성: ${created.join(", ")}`);
  }
  if (skipped.length) {
    parts.push(`이미 있음(건너뜀): ${skipped.join(", ")}`);
  }
  if (!licenseCache.ok) {
    parts.push("에이전트 프롬프트 파일은 Pro에서 추가됩니다.");
  }
  vscode.window.showInformationMessage(parts.join(" · ") || "변경 없음");
}

async function showLicense() {
  const pro = await hasPro();
  const key = getLicenseKey();
  const msg = pro
    ? "Pro 활성화됨. 팀 템플릿·에이전트 프롬프트·커스텀 .pr-kit 폴더를 사용할 수 있습니다."
    : key
      ? "라이선스 키가 올바르지 않습니다. Gumroad 영수증의 키를 `prKit.licenseKey`에 넣으세요."
      : "무료 모드: 기본 템플릿 3개. Pro는 Gumroad 구매 후 영수증 키를 설정에 넣으세요.";

  const action = await vscode.window.showInformationMessage(
    msg,
    "설정 열기",
    "데모 키 안내"
  );
  if (action === "설정 열기") {
    await vscode.commands.executeCommand(
      "workbench.action.openSettings",
      "prKit.licenseKey"
    );
  } else if (action === "데모 키 안내") {
    vscode.window.showInformationMessage(
      "개발/미리보기용: PRKIT-PRO-DEMO-2026 (정식 판매 키와 별도)"
    );
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("prKit.insertPrTemplate", () =>
      pickAndInsert("pr")
    ),
    vscode.commands.registerCommand("prKit.insertCommitTemplate", () =>
      pickAndInsert("commit")
    ),
    vscode.commands.registerCommand("prKit.insertChecklist", () =>
      pickAndInsert("checklist")
    ),
    vscode.commands.registerCommand("prKit.insertAgentPrompt", () =>
      pickAndInsert("agent")
    ),
    vscode.commands.registerCommand("prKit.applyWorkspaceFiles", () =>
      applyWorkspaceFiles()
    ),
    vscode.commands.registerCommand("prKit.showLicense", () => showLicense())
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
