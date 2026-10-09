# 사이트 코드

Docusaurus 기본 테마에 필요한 것만 얹었습니다.

```
components/   본문 마크다운에서 쓰는 요소
theme/        Docusaurus 기본 동작을 바꾼 것
css/          사이트 전체 스타일
pages/        About · Resume · Contact
```

## components

`theme/MDXComponents.js` 에 등록되어 있어 모든 `.md` 에서 import 없이 바로 씁니다.

| | |
| --- | --- |
| `Cta` · `CtaRow` | 버튼형 링크와 그 묶음 |
| `Skills` | 프로젝트마다 붙는 보유 기술 줄 |
| `ProjectList` · `ProjectRow` | Portfolio 개요의 접히는 목록 |
| `Figure` | 본문의 모든 그림. 누르면 확대됩니다 |

## theme

| | |
| --- | --- |
| `DocItem/Content` | 문서 제목 위에 정보 유형 라벨을 붙입니다 |
| `DocBreadcrumbs` | 경로 표시의 묶음 이름을 눌러도 이동하게 합니다 |
