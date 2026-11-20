# 배포 체크리스트

## 1. GitHub (완료)
- 공개 레포: https://github.com/geonoo/pr-kit-ko
- 릴리즈 VSIX: https://github.com/geonoo/pr-kit-ko/releases/tag/v0.1.0

## 2. VS Marketplace (완료)
- Publisher: `geonoo`
- Extension: https://marketplace.visualstudio.com/items?itemName=geonoo.pr-kit-ko
- Manage: https://marketplace.visualstudio.com/manage/publishers/geonoo
- 업로드 UI로 `pr-kit-ko-0.1.0.vsix` 게시 (0.1.0). 이후 버전은 동일 방식으로 올리거나:
  ```bash
  npx @vscode/vsce publish -p <PAT>
  ```

## 3. Gumroad (완료)
- 상품: https://yungster52.gumroad.com/l/pr-kit-pro ($9)
- 편집: https://gumroad.com/products/knihh/edit
- 구매 후 키는 수동 발급:
  ```bash
  node -e 'console.log(require("./proLicense").issueKey("BUYERNAME"))'
  ```

## 4. 블로그
- 티스토리: https://geonoo.tistory.com/220 — Marketplace + Gumroad 링크
