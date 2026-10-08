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

**문서가 한 줄도 없던 제품 5종에 영문 사용자 문서 171편을 만들고, 그 문서가 제 손을 떠나도 유지되도록 검수를 빌드에 넣었습니다.**

1~3번은 같은 회사에서 이어진 하나의 흐름입니다. 줄을 누르면 요점이 열립니다.

<ProjectList>

<ProjectRow
  n="1"
  icon="structure"
  to="/projects/solution-docs"
  title="통합 솔루션 문서 세트 신규 구축"
  proves="정보 구조 설계와 완주"
  meta="자율주행 솔루션 회사 · 2025.01 ~ 현재">

- 제품 5종의 영문 사용자 문서를 설계하고 **171편 · 187,000단어**를 완성했습니다. 이 중 128편은 처음부터 썼습니다.
- 솔루션 매뉴얼과 제품별 매뉴얼의 2층 구조를 설계해, 고객사 구성이 달라도 문서를 손으로 재조립하지 않습니다.
- 독자를 책상에서 정하지 않고 고객사 프로젝트에 참여해 조사한 뒤, 이해·운영·기술 세 계층으로 정의했습니다.

</ProjectRow>

<ProjectRow
  n="2"
  icon="tool"
  to="/projects/build-tooling"
  title="문서 빌드·검수 도구 자체 개발"
  proves="반복 실패를 구조로 제거"
  meta="자율주행 솔루션 회사 · 2025.01 ~ 현재">

- 고객사 정보 혼입, 웹·PDF 불일치, API 문서 노후화, 링크 파손을 **빌드가 검사하는 문제로** 바꿨습니다.
- 엣지 케이스를 먼저 목록으로 만들어 AI에 생성 조건으로 준 방식으로 작업했습니다. 설계는 제가, 구현은 AI가 했습니다.
- 가장 큰 범위의 납품본이 설정 변경 후 빌드 한 번으로 2분 내외에 완성됩니다.

</ProjectRow>

<ProjectRow
  n="3"
  icon="flow"
  to="/projects/docs-as-code"
  title="문서 운영 체계 수립과 docs-as-code 전환"
  proves="남이 이어받을 수 있는 상태"
  meta="자율주행 솔루션 회사 · 2025.01 ~ 현재">

- 몇 주씩 멈춰 있던 리뷰를 GitHub Pull Request로 옮겨 **1~2일 안에** 끝나게 만들었습니다.
- 지켜질 만큼 적은 수인 세 가지 원칙만 정하고, 기준을 기억이 아니라 가이드로 남겼습니다.
- 전체 매뉴얼 구조를 IEC/IEEE 82079-1을 참조해 재정비했습니다.

</ProjectRow>

<ProjectRow
  n="4"
  icon="translate"
  to="/projects/dbms-manuals"
  title="DBMS 제품 매뉴얼 운영과 영문화"
  proves="기존 체계 안에서의 실행력"
  meta="DBMS 소프트웨어 회사 · 2023.11 ~ 2024.12">

- SQL 레퍼런스부터 릴리스 노트까지 문서 유형 전 범위를 국문·영문으로 담당했습니다.
- 원문 수정과 번역 수정을 **분리할 수 없는 한 단위**로 묶어 번역본이 원문과 벌어지지 않게 했습니다.
- 번역이 갈리는 문장은 번역본이 아니라 원문을 고쳤습니다. Pull Request 113건 제출, 101건 머지.

</ProjectRow>

<ProjectRow
  n="5"
  icon="sample"
  to="/projects/vela"
  title="가상 제품군 VELA 문서 세트"
  proves="공개 가능한 증거"
  meta="개인 프로젝트 · 2025">

- 제품을 직접 설계하고 **네 독자**에게 같은 기능을 각각 다른 깊이로 설명한 문서 44편을 완성했습니다.
- 용어집 79개 항목과 스타일 룰을 설정 파일로 분리하고, 그 설정을 읽어 문서를 검사하는 스크립트를 빌드 앞단에 붙였습니다.
- 번역본이 원문과 구조적으로 어긋나는지도 같은 도구가 검사합니다.

</ProjectRow>

</ProjectList>

:::note
현재 직장의 문서와 코드는 대외비여서 공개하지 않습니다. 같은 구조와 복잡도의 문서 세트를 가상 제품으로 재현해 [Sample Docs](/samples)에 전문을 공개했습니다. 다른 분야나 문서 유형의 예시가 필요하시면 공유 가능한 범위를 확인해 회신드립니다.
:::

<CtaRow>
  <Cta to="/contact">발췌본·예시 요청하기</Cta>
  <Cta to="/samples" variant="ghost">문서 샘플 읽기</Cta>
</CtaRow>
