# mypage

React와 Markdown 뷰어로 구성한 GitHub Pages 프로젝트 페이지입니다.

배포 주소:

- `https://jangsu84.github.io/mypage/`

## Stack

- Vite
- React
- react-markdown
- remark-gfm
- GitHub Pages with GitHub Actions

## Folder Structure

```text
mypage/
├── .github/workflows/deploy.yml
├── public/content/
├── src/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Add Markdown Documents

1. `public/content/` 아래에 `.md` 파일을 추가합니다.
2. `public/content/index.json` 에 문서 항목을 등록합니다.
3. 앱에서 목록을 클릭하면 같은 페이지에서 문서 본문이 렌더링됩니다.

예시:

```json
[
	{
		"id": "welcome",
		"title": "Welcome",
		"description": "시작 문서",
		"file": "welcome.md"
	}
]
```

## GitHub Pages

이 저장소는 프로젝트 페이지로 배포됩니다.

- Vite base 설정: `/mypage/`
- 워크플로 파일: `.github/workflows/deploy.yml`

GitHub 저장소 설정에서 Pages source를 `GitHub Actions` 로 맞추면 `main` 브랜치 푸시 시 자동 배포됩니다.