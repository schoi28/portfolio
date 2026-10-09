# 소윤 · Technical Writer 포트폴리오

**→ [schoi28.github.io/portfolio](https://schoi28.github.io/portfolio/)**

테크니컬 라이터 포트폴리오 사이트입니다. 작성한 문서를 보여 주는 데서 그치지 않고,
**문서 품질 기준을 설정 파일로 분리하고 그것을 검사기가 빌드마다 확인하는 구조**까지
저장소 안에 두었습니다.

사이트는 한국어와 영어 두 벌로 운영합니다. 번역본 54편은 전부 직접 작성했습니다.

---

## 먼저 보실 만한 것

이 저장소에서 문서 작성 능력 외에 보여 드리고자 한 것은 셋입니다.

| | 어디 | 무엇 |
| --- | --- | --- |
| **품질 기준을 코드에서 분리** | [`_config/`](_config/) | 용어집 79항목, 문체·독자·경고 등급 기준을 설정 파일로 둡니다. 제품이 바뀌면 검사기가 아니라 설정을 고칩니다 |
| **그 기준으로 자동 검사** | [`scripts/check-docs.mjs`](scripts/check-docs.mjs) | 17종을 검사합니다. 오류가 하나라도 있으면 빌드와 배포가 멈춥니다 |
| **그림도 같은 방식으로** | [`_config/diagram-guidelines.md`](_config/diagram-guidelines.md) | 캔버스·타이포·색·화살표·픽토그램 규칙. 다이어그램 18종을 국문·영문 쌍으로 제작 |

사이트에서는 **Portfolio** 탭이 실무 경력, **Sample Docs** 탭이 문서 샘플입니다.

---

## 폴더

```
sample_docs/   Sample Docs 탭. 가상 제품군 VELA의 문서 45편
projects/      Portfolio 탭. 프로젝트별 경력 기록 6편
i18n/en/       위 두 탭과 페이지의 영문판 54편
_config/       문서 품질 기준. 검사기가 읽는 설정
scripts/       문서 검수기
src/           사이트 컴포넌트와 스타일
static/img/    다이어그램 SVG. 국문·영문 쌍
```

각 폴더에 짧은 README를 두었습니다.

---

## 가상 제품군 VELA

Sample Docs는 **가상의 차량 소프트웨어 회사 VELA**를 설계해 만든 문서입니다.

현재 직장의 문서와 코드는 대외비라 공개할 수 없습니다. 그렇다고 문서 몇 편만 올리면
독자를 어떻게 정의했고 왜 그렇게 구성했는지는 보이지 않습니다. 그래서 실무와 비슷한
복잡도의 제품군을 직접 만들고, **설계 과정까지 공개할 수 있는 형태**로 썼습니다.

제품 넷에 독자가 넷입니다. 같은 기능이라도 독자가 다르면 다른 문서 유형과 깊이로 씁니다.

| 문서 세트 | 독자 | 성격 |
| --- | --- | --- |
| VELA Drive 앱 | 차량 소유자 | 사용 설명서 · FAQ |
| VELA Vehicle API | 개발자 | 개발자 가이드 · 레퍼런스 |
| VELA Deploy | 릴리스 운영자 | 운영 가이드 · 판단 기준 |
| VELA Sense | 현장 엔지니어 | 설치 가이드 · 문제 해결 |

각 세트의 첫 페이지 **설계 노트**에 그 문서를 왜 그렇게 설계했는지 적었습니다.

---

## 실행

Node.js 18 이상이 필요합니다.

```bash
npm install
npm start          # 한국어 사이트 (http://localhost:3000)
npm run start:en   # 영어 사이트
npm run check      # 문서 검수만 실행
npm run build      # 검수 후 빌드. 오류가 있으면 여기서 멈춥니다
```

`npm install` 뒤에 나오는 deprecated·audit 경고는 Docusaurus 의존성에서 나오는 것이라
무시해도 됩니다. `npm audit fix`는 버전이 어긋날 수 있어 실행하지 마십시오.

### 배포

`main` 브랜치에 푸시하면 GitHub Actions가 검수 → 빌드 → GitHub Pages 배포를 수행합니다.
검수에서 오류가 나오면 배포하지 않고 사이트는 이전 상태를 유지합니다.

---

Docusaurus 3 · GitHub Pages
