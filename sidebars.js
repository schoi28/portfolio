// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// 각 세트의 머리말(intro)은 카테고리 제목을 누르면 열립니다.
// 본문 장은 제품 개요를 1장으로 두고 번호를 매깁니다.
const sidebars = {
  samplesSidebar: [
    'index',
    {
      type: 'category',
      label: 'VELA Drive 앱',
      link: { type: 'doc', id: 'app/intro' },
      items: [
        'app/overview',
        'app/getting-started',
        'app/vehicle-status',
        'app/remote-control',
        'app/digital-key',
        'app/software-update',
        'app/maintenance',
        'app/troubleshooting',
        'app/faq',
        'app/privacy',
      ],
    },
    {
      type: 'category',
      label: 'VELA Vehicle API',
      link: { type: 'doc', id: 'api/intro' },
      items: [
        'api/overview',
        'api/authentication',
        'api/quickstart',
        'api/vehicle-data',
        'api/remote-commands',
        'api/sensors',
        'api/ota',
        'api/webhooks',
        'api/reference',
        'api/glossary',
      ],
    },
    {
      type: 'category',
      label: 'VELA Deploy',
      link: { type: 'doc', id: 'deploy/intro' },
      items: [
        'deploy/overview',
        'deploy/first-campaign',
        'deploy/prepare',
        'deploy/rollout',
        'deploy/incident-response',
        'deploy/audit',
        'deploy/reference',
        'deploy/glossary',
      ],
    },
    {
      type: 'category',
      label: 'VELA Sense',
      link: { type: 'doc', id: 'sensor/intro' },
      items: [
        'sensor/overview',
        'sensor/planning',
        'sensor/lidar-mount',
        'sensor/camera-mount',
        'sensor/wiring',
        'sensor/power-check',
        'sensor/calibration',
        'sensor/maintenance',
        'sensor/troubleshooting',
        'sensor/specifications',
        'sensor/glossary',
      ],
    },
  ],
};

export default sidebars;
