# Gumroad 상품 — PR Kit Pro

판매 페이지: https://yungster52.gumroad.com/l/pr-kit-pro

## 상품명
PR Kit Pro — 한국어 PR/커밋 규칙 팩 (VS Code · Cursor)

## 한 줄
팀 PR·커밋 템플릿 + Cursor 에이전트 프롬프트를 라이선스 키 하나로 잠금 해제.

## 가격 제안
- $9 — 개인 (1인, 평생 키)
- $29 — 팀 (최대 10인, 동일 키 공유 가능 / 추후 시트 제한 도입 가능)

## 상품 설명 (붙여넣기)

```text
VS Code / Cursor용 「PR Kit」 Pro 라이선스입니다.

무료 확장으로 기본 PR·커밋·체크리스트 3종을 쓰고,
Pro 키를 넣으면 아래가 열립니다.

• 기능/버그 PR 템플릿
• 팀 커밋 규칙
• 릴리즈 체크리스트
• Cursor/에이전트용 PR 작성 프롬프트
• 워크스페이스 .pr-kit 커스텀 템플릿

구매 후
1. Cursor/VS Code에 PR Kit 설치
2. 설정 → prKit.licenseKey 에 발급 키 입력
3. 명령 팔레트에서 「PR Kit:」 검색

키 형식 예: PRKIT-XXXX-XXXX-XXXX
(구매 확인 후 메시지/파일로 키를 보내 드립니다)

데모(구매 전 체험): PRKIT-PRO-DEMO-2026
```

## 전달물
- 텍스트: 라이선스 키 1개 (수동 발급 → 나중에 Gumroad 라이선스 연동)
- 링크: GitHub Releases의 최신 `.vsix` (또는 Marketplace URL)

## 발급 방법 (당분간 수동)
```bash
node -e 'console.log(require("./proLicense").issueKey("BUYERNAME"))'
```
