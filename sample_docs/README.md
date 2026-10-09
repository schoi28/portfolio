# Sample Docs

사이트의 **Sample Docs** 탭 원본입니다. 가상 제품군 VELA의 문서 45편입니다.

제품 넷에 독자가 넷이고, 같은 기능이라도 독자가 다르면 다른 문서 유형과 깊이로 썼습니다.

```
index.md     탭 개요. VELA가 어떤 회사인지
app/         VELA Drive 앱    · 차량 소유자
api/         VELA Vehicle API · 개발자
deploy/      VELA Deploy      · 릴리스 운영자
sensor/      VELA Sense       · 현장 엔지니어
```

각 폴더의 **`intro.md` 는 설계 노트**입니다. 제품 문서가 아니라
그 문서를 왜 그렇게 설계했는지 적은 페이지이고, 실제 매뉴얼은 1장부터입니다.

문서 맨 위 프런트매터의 `doc_type` 은 정보 유형입니다.
개념 · 절차 · 레퍼런스 · 튜토리얼 · 문제 해결 중 하나를 적습니다.

영문판은 `i18n/en/docusaurus-plugin-content-docs/current/` 에 있습니다.
