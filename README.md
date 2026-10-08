# 포트폴리오 사이트

Docusaurus 3 · GitHub Pages · 한국어 기본 / 영어 지원

## 처음 한 번만 하는 셋업

### 1. GitHub 저장소

`schoi28/portfolio` 저장소를 사용합니다. Public이어야 무료로 배포됩니다.

배포 주소는 **`https://schoi28.github.io/portfolio/`** 입니다.

### 2. 저장소 정보 확인

`docusaurus.config.js` 맨 위에 이미 설정되어 있습니다. 바꿀 필요 없습니다.

```js
const GITHUB_USERNAME = 'schoi28';
const REPO_NAME = 'portfolio';
const SITE_TITLE = '소윤 · Technical Writer';
```

저장소 이름을 나중에 `schoi28.github.io`로 바꾸면, `REPO_NAME`만 그에 맞게 고치면 됩니다. 주소가 루트(`/`)로 바뀌는 처리는 config가 알아서 합니다.

### 3. git 저장소로 만들기

빌드보다 먼저 하는 편이 좋습니다. 문서의 최종 수정일을 git 이력에서 읽기 때문입니다.

```bash
git init
git add -A
git commit -m "포트폴리오 사이트 초기 구성"
git branch -M main
```

git 저장소가 아니어도 빌드는 되지만, 문서 하단의 "최종 수정" 날짜가 표시되지 않습니다.

### 4. 로컬에서 실행해 보기

Node.js 18 이상이 필요합니다.

```bash
npm install
npm start          # 한국어 사이트가 http://localhost:3000 에 뜹니다
npm run start:en   # 영어 사이트 확인
npm run build      # 배포와 동일한 빌드 (링크가 깨지면 실패합니다)
```

`npm install` 뒤에 나오는 deprecated 경고와 audit 경고는 Docusaurus 의존성에서 나오는 것으로, 무시해도 됩니다. `npm audit fix`를 실행하면 오히려 버전이 어긋날 수 있으니 하지 마세요.

### 5. 올리고 배포 켜기

```bash
git remote add origin https://github.com/schoi28/portfolio.git
git push -u origin main
```

푸시할 때 `Permission ... denied to <다른계정>` 403 오류가 나면, macOS 키체인에 다른 GitHub 계정이 저장되어 있는 것입니다. 아래로 지운 뒤 다시 푸시하면 계정을 새로 물어봅니다.

```bash
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase
```

푸시한 뒤 GitHub 저장소에서 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다. 이 설정을 해야 워크플로가 배포할 수 있습니다.

이후 `main`에 푸시할 때마다 자동으로 빌드·배포됩니다. 진행 상황은 저장소의 **Actions** 탭에서 볼 수 있습니다.

## 폴더 구조

```
├── docs/                    Sample Docs — 가상 제품군 문서 (라우트: /samples)
│   ├── index.md             Work 개요
│   ├── hardware/            하드웨어 매뉴얼
│   ├── software/            소프트웨어 매뉴얼
│   └── api/                 API·SDK 문서
├── blog/                    Blog
├── src/
│   ├── pages/
│   │   ├── index.js         Home
│   │   ├── docs-health.js   Docs health
│   │   ├── how-i-work.md    How I work
│   │   └── about.md         About
│   ├── data/
│   │   └── docs-health.json Docs health 페이지의 데이터 (지금은 수동)
│   └── css/custom.css       전역 스타일
├── static/img/              이미지, 파비콘
└── .github/workflows/
    ├── deploy.yml           빌드 후 GitHub Pages 배포
    └── docs-review.yml      PR 문서 검수 (스크립트 연결 대기)
```

## 자주 하는 작업

### 문서 추가하기

`docs/` 아래에 마크다운 파일을 만들고 `sidebars.js`에 경로를 추가합니다.

### Docs health 숫자 갱신하기

`src/data/docs-health.json`을 수정합니다. 지금은 손으로 채우지만, 챗봇을 붙인 뒤에는 질문 로그에서 이 파일을 자동 생성할 예정입니다. 페이지는 데이터가 비어 있으면 "아직 수집된 질문이 없습니다"로 표시되므로, 빈 상태로 공개해도 어색하지 않습니다.

### 영어 번역 추가하기

```bash
npm run write-translations -- --locale en
```

`i18n/en/` 폴더가 생깁니다. 문서 본문은 `i18n/en/docusaurus-plugin-content-docs/current/`에 같은 경로로 파일을 두면 됩니다. 번역이 없는 문서는 한국어 원문으로 표시됩니다.

## 남은 연결 작업

| 항목 | 시점 | 내용 |
| --- | --- | --- |
| 문서 검수 자동화 | 9월 | `doc-review-crew/scripts/`를 이 저장소에 복사하고 `docs-review.yml`의 주석 해제 |
| 질의응답 챗봇 | 10월 | Cloudflare Workers에 API 배포 후 사이트에 위젯 연결 |
| Docs health 자동화 | 11월 | 챗봇 질문 로그에서 `docs-health.json` 생성 |
| 다국어 확장 | 12월 | 영어 전체 번역, 제3언어 샘플 |

## 설계 메모

- `onBrokenLinks: 'throw'` — 깨진 내부 링크가 있으면 빌드가 실패합니다. 링크 검사를 배포 파이프라인이 대신합니다.
- `showLastUpdateTime` — git 이력에서 최종 수정일을 읽습니다. git 저장소가 아닌 폴더에서 빌드가 실패하지 않도록, config가 git 여부를 감지해 자동으로 켜고 끕니다. 배포 워크플로의 checkout이 `fetch-depth: 0`인 것도 같은 이유입니다. 이 값을 1로 바꾸면 날짜가 표시되지 않습니다.
- 각 문서 하단의 "설계 노트"는 의도적인 장치입니다. 문서 자체보다 그 문서를 왜 그렇게 설계했는지가 정보 설계 역량을 보여줍니다.
