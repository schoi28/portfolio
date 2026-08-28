// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  workSidebar: [
    'index',
    {
      type: 'category',
      label: 'VELA Drive 앱',
      link: { type: 'doc', id: 'app/intro' },
      items: ['app/getting-started', 'app/remote-control'],
    },
    {
      type: 'category',
      label: 'VELA Vehicle API',
      link: { type: 'doc', id: 'api/intro' },
      items: [],
    },
    {
      type: 'category',
      label: 'VELA Deploy',
      link: { type: 'doc', id: 'deploy/intro' },
      items: [],
    },
    {
      type: 'category',
      label: 'VELA Sense',
      link: { type: 'doc', id: 'sensor/intro' },
      items: [],
    },
  ],
};

export default sidebars;
