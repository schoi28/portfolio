// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  workSidebar: [
    'index',
    {
      type: 'category',
      label: '하드웨어 매뉴얼',
      link: { type: 'doc', id: 'hardware/intro' },
      items: ['hardware/setup'],
    },
    {
      type: 'category',
      label: '소프트웨어 매뉴얼',
      link: { type: 'doc', id: 'software/intro' },
      items: ['software/getting-started'],
    },
    {
      type: 'category',
      label: 'API · SDK 문서',
      link: { type: 'doc', id: 'api/intro' },
      items: ['api/authentication'],
    },
  ],
};

export default sidebars;
