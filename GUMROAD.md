# Gumroad 상품 — PR Kit Pro

판매 페이지: https://yungster52.gumroad.com/l/pr-kit-pro

## 상품명
PR Kit Pro — 한국어 PR/커밋 규칙 팩 (VS Code · Cursor)

## 한 줄
팀 PR·커밋 템플릿 + Cursor 에이전트 프롬프트를 라이선스 키 하나로 잠금 해제.

## 가격
- $9 — 개인 (1인, 평생 키)

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
1. Cursor/VS Code에 PR Kit 설치 (Marketplace: geonoo.pr-kit-ko)
2. Gumroad 영수증에 있는 라이선스 키를 복사
3. 설정 → prKit.licenseKey 에 붙여넣기
4. 명령 팔레트에서 「PR Kit:」 검색

키는 결제 직후 영수증·다운로드 페이지에 자동 표시됩니다.

데모(구매 전 체험): PRKIT-PRO-DEMO-2026
```

## 전달물
- Gumroad Unique License Key (구매 시 자동 발급)
- Marketplace: https://marketplace.visualstudio.com/items?itemName=geonoo.pr-kit-ko

## 검증
확장 `0.1.1+`가 `POST https://api.gumroad.com/v2/licenses/verify` 로 확인합니다.
- product_id: `YZ5322DbQXQWDRpwthyt6g==`
- increment_uses_count=false
- 데모/수동 발급 키(`PRKIT-…`)는 오프라인 체크섬으로 유지

Content 탭 → Insert → License key 블록이 있어야 판매마다 키가 나갑니다.
