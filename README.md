# PR Kit — 한국어 PR/커밋 규칙

VS Code / Cursor에서 **한국어 PR 템플릿 · 커밋 규칙 · 체크리스트**를 바로 넣고, 워크스페이스에 규칙 파일로 생성합니다.

## 설치

1. **VS Code:** [Marketplace `geonoo.pr-kit-ko`](https://marketplace.visualstudio.com/items?itemName=geonoo.pr-kit-ko)에서 설치  
   Cursor는 Open VSX를 씁니다. namespace 승인 후 같은 ID로 검색됩니다.
2. (대안) [GitHub Releases](https://github.com/geonoo/pr-kit-ko/releases) `.vsix` → Install from VSIX…
3. 명령 팔레트(`Cmd+Shift+P`)에서 `PR Kit:` 검색

소개 글: https://geonoo.tistory.com/220  
Pro: [Gumroad $9](https://yungster52.gumroad.com/l/pr-kit-pro) · 미리보기 키 `PRKIT-PRO-DEMO-2026`

## 무료

| 명령 | 내용 |
|------|------|
| `PR Kit: PR 템플릿 넣기` | 기본 한국어 PR 본문 |
| `PR Kit: 커밋 메시지 템플릿 넣기` | Conventional Commits + 한국어 가이드 |
| `PR Kit: 체크리스트 넣기` | 리뷰 전 체크리스트 |
| `PR Kit: 워크스페이스에 규칙 파일 생성` | `.github/pull_request_template.md` 등 |

에디터가 열려 있으면 커서 위치에 삽입하고, 없으면 새 마크다운 문서를 엽니다.

## Pro

[Gumroad](https://yungster52.gumroad.com/l/pr-kit-pro) 결제 후 영수증의 키를 설정 `prKit.licenseKey`에 넣으면:

- 기능/버그 PR 템플릿, 팀 커밋 규칙, 릴리즈 체크리스트
- `PR Kit: 에이전트 프롬프트 넣기` (Cursor/에이전트용 PR 작성 프롬프트)
- 워크스페이스 `.pr-kit/*.md` 커스텀 템플릿
- `AGENT_PR_PROMPT.md` 워크스페이스 생성

미리보기 데모 키: `PRKIT-PRO-DEMO-2026`  
정식 키: [Gumroad](https://yungster52.gumroad.com/l/pr-kit-pro)

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
npm run package   # pr-kit-ko-0.1.1.vsix
```

F5로 Extension Development Host에서 디버깅할 수 있습니다.

## 라이선스

MIT (확장 코드). Pro 템플릿 잠금은 라이선스 키로 해제합니다.
