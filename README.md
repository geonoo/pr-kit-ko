# PR Kit — 한국어 PR/커밋 규칙

VS Code / Cursor에서 **한국어 PR 템플릿 · 커밋 규칙 · 체크리스트**를 바로 넣고, 워크스페이스에 규칙 파일로 생성합니다.

## 설치

1. `.vsix`를 받거나 Marketplace에서 설치
2. 명령 팔레트(`Cmd+Shift+P`)에서 `PR Kit:` 검색

Cursor에서도 동일하게 Extensions → Install from VSIX로 설치할 수 있습니다.

## 무료

| 명령 | 내용 |
|------|------|
| `PR Kit: PR 템플릿 넣기` | 기본 한국어 PR 본문 |
| `PR Kit: 커밋 메시지 템플릿 넣기` | Conventional Commits + 한국어 가이드 |
| `PR Kit: 체크리스트 넣기` | 리뷰 전 체크리스트 |
| `PR Kit: 워크스페이스에 규칙 파일 생성` | `.github/pull_request_template.md` 등 |

에디터가 열려 있으면 커서 위치에 삽입하고, 없으면 새 마크다운 문서를 엽니다.

## Pro

설정 `prKit.licenseKey`에 키를 넣으면:

- 기능/버그 PR 템플릿, 팀 커밋 규칙, 릴리즈 체크리스트
- `PR Kit: 에이전트 프롬프트 넣기` (Cursor/에이전트용 PR 작성 프롬프트)
- 워크스페이스 `.pr-kit/*.md` 커스텀 템플릿
- `AGENT_PR_PROMPT.md` 워크스페이스 생성

미리보기 데모 키: `PRKIT-PRO-DEMO-2026`  
(정식 키는 Gumroad 등에서 발급 — 판매 페이지는 추후 연결)

## 커스텀 템플릿 (Pro)

워크스페이스 루트에:

```text
.pr-kit/
  pr-my-team.md
  commit-my-team.md
  checklist-deploy.md
  agent-review.md
```

파일 이름에 `pr` / `commit` / `checklist` / `agent`가 들어가면 해당 명령 목록에 나타납니다.

## 개발

```bash
npm test
npm run package   # pr-kit-ko-0.1.0.vsix
```

F5로 Extension Development Host에서 디버깅할 수 있습니다.

## 라이선스

MIT (확장 코드). Pro 템플릿 잠금은 라이선스 키로 해제합니다.
