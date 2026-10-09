// @ts-check
//
// Portfolio 탭의 사이드바입니다.
// 묶음 이름만 두고 번호는 붙이지 않습니다. 보시는 분은 관심 있는 프로젝트부터 엽니다.

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
