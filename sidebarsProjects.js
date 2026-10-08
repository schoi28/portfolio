// @ts-check

/**
 * Portfolio 사이드바입니다.
 *
 * 프로젝트 번호를 사이드바 라벨에 넣지 않습니다. 번호는 읽는 순서를
 * 지시하는데, 보시는 분은 관심 있는 프로젝트부터 엽니다. 대신 개요
 * 페이지의 표에서 번호와 기간을 보여 줍니다.
 *
 * 1~3번은 같은 회사에서 이어진 흐름이라 한 묶음으로 두고, 그 묶음의
 * 제목을 눌러도 개요로 가지 않도록 링크 없는 카테고리로 뒀습니다.
 */
const sidebars = {
  projectsSidebar: [
    'intro',
    {
      type: 'category',
      label: '자율주행 솔루션 회사',
      collapsed: false,
      items: ['solution-docs', 'build-tooling', 'docs-as-code'],
    },
    {
      type: 'category',
      label: '그 밖의 경력',
      collapsed: false,
      items: ['dbms-manuals', 'vela'],
    },
  ],
};

export default sidebars;
