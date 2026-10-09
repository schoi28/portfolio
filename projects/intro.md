---
title: Portfolio
sidebar_label: 개요
description: 문서가 없던 제품에 문서를 만들고, 그 문서가 유지되는 체계까지 만들었습니다.
# slug는 routeBasePath(projects) 아래에서 해석됩니다.
# '/projects'로 적으면 /projects/projects 가 됩니다.
slug: /
hide_table_of_contents: true
---

# Portfolio

문서가 없거나 흩어져 있던 제품 5종에 영문 문서 171편을 만들었습니다. 이어서 문서가 고객사별로 정확하게 조립되고, 제품이 바뀌어도 검수와 갱신이 가능하며, 동료가 이어서 작업할 수 있도록 문서 생성·검수·운영 체계까지 설계했습니다.

아래 프로젝트는 그 과정에서 마주한 문제와 해결 방법, 그리고 이를 통해 보여 주는 역량을 정리한 사례입니다.

**1~3번은 한 회사에서 이어진 프로젝트입니다.** 문서 체계를 구축하고, 제작과 검수를 자동화하고, 다른 구성원이 지속해서 운영할 수 있는 환경을 만드는 과정으로 이어집니다.

<ProjectList>

<ProjectRow
  n="1"
  icon="structure"
  to="/projects/solution-docs"
  title="통합 솔루션 문서 세트 신규 구축"
  proves="정보 구조 설계 · 독자 분석 · 영문 테크니컬 라이팅"
  meta="제각각이던 제품 문서를, 독자와 제품 구성을 반영한 하나의 체계로 재설계했습니다.">

- 제품 5종의 영문 사용자 문서 171편을 완성했습니다. 이 중 128편은 처음부터 작성했습니다.
- 솔루션·제품 2층 구조를 설계하고, 실제 고객사 프로젝트를 조사해 독자를 세 계층으로 정의했습니다.

</ProjectRow>

<ProjectRow
  n="2"
  icon="tool"
  to="/projects/build-tooling"
  title="문서 빌드·검수 도구 자체 개발"
  proves="요구사항 명세 · 문서 자동화 설계 · 기술적 판단"
  meta="사람이 기억하고 조심해야 했던 오류를, 빌드가 검사하도록 바꿨습니다.">

- Google Docs 기반 리뷰를 GitHub Pull Request로 전환해, 수 주씩 걸리던 리뷰를 대부분 1~2일 안에 완료하도록 개선했습니다.
- 작성 원칙 세 가지와 설정·작성 가이드를 마련하고, 국제 표준을 참고해 매뉴얼 구조를 정비했습니다.

</ProjectRow>

<ProjectRow
  n="3"
  icon="flow"
  to="/projects/docs-as-code"
  title="문서 운영 체계 수립과 docs-as-code 전환"
  proves="문서 거버넌스 · 작성 표준 수립 · 협업 프로세스 개선"
  meta="문서 품질과 리뷰를 담당자의 기억에 맡기지 않고, 팀이 지속해서 따를 수 있는 체계로 만들었습니다.">

- 몇 주씩 멈춰 있던 리뷰를 GitHub Pull Request로 옮겨 **1~2일 안에** 끝나게 만들었습니다.
- 지켜질 만큼 적은 수인 세 가지 원칙만 정하고, 기준을 기억이 아니라 가이드로 남겼습니다.
- 전체 매뉴얼 구조를 IEC/IEEE 82079-1을 참조해 재정비했습니다.

</ProjectRow>

<ProjectRow
  n="4"
  icon="translate"
  to="/projects/dbms-manuals"
  title="DBMS 제품 매뉴얼 운영과 영문화"
  proves="기술 문서 작성 · 한영 기술 번역 · Git 기반 협업"
  meta="번역 과정에서 발견한 모호함을 원문의 문제로 보고, 문장 자체를 개선했습니다.">

- SQL 레퍼런스부터 API 매뉴얼, 설치 가이드, 릴리스 노트까지 다양한 문서 유형을 국문·영문으로 작성하고 운영했습니다.
- 작업을 이슈와 Pull Request 단위로 추적했으며, 총 113건의 PR을 제출해 101건을 병합했습니다.

</ProjectRow>

<ProjectRow
  n="5"
  icon="sample"
  to="/projects/vela"
  title="가상 제품군 VELA 문서 세트"
  proves="독자별 콘텐츠 설계 · 문서 품질 관리 · 검수 자동화"
  meta="비공개인 실무 산출물을 대신해, 문서 설계부터 품질 검증까지 확인할 수 있는 공개 사례를 만들었습니다.">

- 가상의 제품군과 네 종류의 독자를 설계하고, 44편의 문서를 작성했습니다. 같은 기능도 독자에 따라 다른 문서 유형과 깊이로 설명했습니다.
- 용어집 79개 항목과 스타일 규칙을 설정 파일로 분리하고, 문서 구조와 번역 정합성을 검사하는 스크립트를 빌드에 연결했습니다.

</ProjectRow>

</ProjectList>

---

현재 직장의 문서와 코드는 대외비이므로 공개하지 않습니다. 대신 실무와 유사한 복잡도의 가상 제품군 VELA를 직접 설계하고, 문서 세트 전체를 공개했습니다.

<CtaRow>
  <Cta to="/samples" variant="ghost">문서 샘플 읽기</Cta>
</CtaRow>
