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

## 3. Gumroad (남음)
1. https://gumroad.com/login 로그인
2. New product — 이름/가격/설명은 `GUMROAD.md` ($9)
3. Content에 Marketplace 설치 링크 + 라이선스 키 안내
4. 키 발급:
   ```bash
   node -e 'console.log(require("./proLicense").issueKey("BUYERNAME"))'
   ```
5. Publish 후 URL을 README·티스토리 글에 넣기

## 4. 블로그
- 티스토리: https://geonoo.tistory.com/220 — Marketplace 링크 반영
