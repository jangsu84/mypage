# GitHub Pages Guide

이 저장소는 프로젝트 페이지 형태로 배포됩니다.

## 배포 주소

- 예상 주소: `https://jangsu84.github.io/mypage/`

## 콘텐츠 위치

| 종류 | 위치 |
| --- | --- |
| React 코드 | `src/` |
| Markdown 원본 | `public/content/` |
| 문서 목록 메타데이터 | `public/content/index.json` |

## 메모

- Vite 설정에 `base: "/mypage/"` 가 필요합니다.
- React 컴포넌트는 `import.meta.env.BASE_URL` 기준으로 문서를 읽어야 합니다.
- GitHub Pages에서는 라우터 없이 시작하는 것이 가장 단순합니다.