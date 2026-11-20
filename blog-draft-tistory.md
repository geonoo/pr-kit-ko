# Cursor/VS Code용 한국어 PR·커밋 규칙 확장 만들었습니다 (PR Kit)

PR 올릴 때마다 본문 형식이 들쭉날쭉하고, 커밋 메시지도 `수정`, `ㅇㅇ`로 끝나는 경우가 많았습니다.  
팀마다 위키에 규칙은 있는데, 정작 작성할 때는 다시 찾아보지 않더라고요.

그래서 **에디터 안에서 바로 넣는** 작은 확장을 만들었습니다.

## PR Kit이 하는 일

명령 팔레트에서 `PR Kit:` 을 치면:

- 한국어 **PR 템플릿** 삽입
- **커밋 메시지** Conventional Commits + 한국어 가이드
- **리뷰 전 체크리스트**
- 원하면 워크스페이스에  
  `.github/pull_request_template.md`, `COMMIT_CONVENTION.md` 파일 생성

Cursor와 VS Code 둘 다 됩니다. (같은 VSIX)

## 무료 / Pro

무료로 기본 템플릿 3종을 쓸 수 있습니다.  
Pro는 팀용 템플릿, 릴리즈 체크리스트, **에이전트용 PR 작성 프롬프트**, 워크스페이스 `.pr-kit` 커스텀 템플릿을 엽니다.

데모 키로 Pro를 미리 볼 수 있습니다: `PRKIT-PRO-DEMO-2026`  
설정 키: `prKit.licenseKey`  
Gumroad 구매 시 라이선스 키가 영수증에 자동 발급됩니다.

## 설치

1. **VS Marketplace:** https://marketplace.visualstudio.com/items?itemName=geonoo.pr-kit-ko  
   Cursor/VS Code에서 `PR Kit` 또는 `geonoo.pr-kit-ko` 검색 후 설치
2. (대안) [GitHub Releases](https://github.com/geonoo/pr-kit-ko/releases/tag/v0.1.1) `.vsix` → Install from VSIX…
3. `Cmd+Shift+P` → `PR Kit: PR 템플릿 넣기`

Pro 미리보기: 설정 `prKit.licenseKey` = `PRKIT-PRO-DEMO-2026`  
Pro: https://yungster52.gumroad.com/l/pr-kit-pro

## 왜 만들었나

Chrome 확장으로 표 정리·일정 도구를 만들면서,  
**개발자가 매일 쓰는 도구**에도 같은 패턴(로컬에서 바로 쓰고, 팀은 Pro)이 먹힌다고 느꼈습니다.

PR/커밋 규칙은 검색도 잘 되고, Cursor 에이전트 프롬프트까지 묶으면  
“템플릿 파일 찾아다니는 시간”을 줄일 수 있습니다.

피드백이나 팀에서 쓰는 템플릿 패턴이 있으면 댓글로 남겨 주세요.
