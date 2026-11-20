# 배포 체크리스트

## 1. GitHub (완료)
- 공개 레포: https://github.com/geonoo/pr-kit-ko
- 릴리즈 VSIX: https://github.com/geonoo/pr-kit-ko/releases/tag/v0.1.0

## 2. Gumroad
1. https://gumroad.com/login 로그인
2. New product
3. 이름/가격/설명은 `GUMROAD.md` 참고 ($9)
4. 파일 첨부: `pr-kit-ko-0.1.0.vsix`
5. Content에 라이선스 안내 + 구매자별 키는 수동 발급:
   ```bash
   node -e 'console.log(require("./proLicense").issueKey("BUYERNAME"))'
   ```
6. Publish 후 URL을 README·티스토리 글에 넣기

## 3. VS Marketplace
1. https://marketplace.visualstudio.com/manage 로그인 (Microsoft/GitHub)
2. Create publisher `geonoo` (또는 사용 가능한 ID)
3. Azure DevOps PAT 발급 (Marketplace 권한)
4. 로컬:
   ```bash
   npx @vscode/vsce login geonoo
   npm run package
   npx @vscode/vsce publish -p <PAT>
   ```
5. 확장 페이지 URL을 README·티스토리·Gumroad에 반영

## 4. 블로그
- 티스토리: https://geonoo.tistory.com/220
- Gumroad/Marketplace URL 생기면 글 하단에 링크 추가
