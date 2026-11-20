# 배포 체크리스트

## 1. GitHub (완료)
- 공개 레포: https://github.com/geonoo/pr-kit-ko
- 릴리즈 VSIX: https://github.com/geonoo/pr-kit-ko/releases/tag/v0.1.1

## 2. VS Marketplace (완료)
- Publisher: `geonoo`
- Extension: https://marketplace.visualstudio.com/items?itemName=geonoo.pr-kit-ko
- Manage: https://marketplace.visualstudio.com/manage/publishers/geonoo
- 업로드 UI로 VSIX 게시. Gumroad 키 검증은 `0.1.1+`. 이후 버전은 동일 방식으로 올리거나:
  ```bash
  npx @vscode/vsce publish -p <PAT>
  ```

## 3. Gumroad (완료)
- 상품: https://yungster52.gumroad.com/l/pr-kit-pro ($9)
- 편집: https://gumroad.com/products/knihh/edit
- Content → Insert → License key (product_id `YZ5322DbQXQWDRpwthyt6g==`)
- 구매 시 키가 영수증·다운로드 페이지에 자동 표시. 확장은 Gumroad verify API로 확인.
- 수동 키(지원/데모) 필요 시:
  ```bash
  node -e 'console.log(require("./proLicense").issueKey("BUYERNAME"))'
  ```

## 4. 블로그
- 티스토리: https://geonoo.tistory.com/220 — Marketplace + Gumroad 링크
