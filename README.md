# mypage

A React + Markdown viewer project configured for GitHub Pages.

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

1. Add a `.md` file under `public/content/`.
2. Register the document in `public/content/index.json`.
3. Click an item in the app to render the markdown content.

Example:

```json
[
  {
    "id": "welcome",
    "title": "Welcome",
    "description": "Getting started document",
    "file": "welcome.md"
  }
]
```

## GitHub Pages

This repository is deployed as a project page.

- Vite base setting: `/mypage/`
- Workflow file: `.github/workflows/deploy.yml`

Set the Pages source to `GitHub Actions` in repository settings to enable automatic deployment from pushes to `main`.