// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// 각 세트의 첫 항목은 '설계 노트'입니다. 포트폴리오를 보는 분을 위한
// 기록이고, 실제 매뉴얼은 1장부터 시작합니다.
//
// 설계 노트를 카테고리의 link 로만 두면 사이드바에 라벨이 뜨지 않아
// 카테고리 제목을 눌러 보기 전에는 존재를 알 수 없습니다. 그래서
// link 를 빼고 items 의 첫 줄로 올렸습니다.
const sidebars = {
  samplesSidebar: [
    'index',
    {
      type: 'category',
      label: 'VELA Drive 앱',
      items: [
        'app/intro',
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
      items: [
        'api/intro',
        'api/overview',
        'api/authentication',
        'api/quickstart',
        'api/sdk',
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
      items: [
        'deploy/intro',
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
      items: [
        'sensor/intro',
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
