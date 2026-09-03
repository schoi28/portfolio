// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  workSidebar: [
    'index',
    {
      type: 'category',
      label: 'VELA Drive 앱',
      link: { type: 'doc', id: 'app/intro' },
      items: [
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
        'api/authentication',
        'api/quickstart',
        'api/vehicle-data',
        'api/remote-commands',
        'api/sensors',
        'api/ota',
        'api/webhooks',
        'api/reference',
      ],
    },
    {
      type: 'category',
      label: 'VELA Deploy',
      link: { type: 'doc', id: 'deploy/intro' },
      items: [
        'deploy/first-campaign',
        'deploy/prepare',
        'deploy/rollout',
        'deploy/incident-response',
        'deploy/audit',
        'deploy/reference',
      ],
    },
    {
      type: 'category',
      label: 'VELA Sense',
      link: { type: 'doc', id: 'sensor/intro' },
      items: [
        'sensor/planning',
        'sensor/lidar-mount',
        'sensor/camera-mount',
        'sensor/wiring',
        'sensor/power-check',
        'sensor/calibration',
        'sensor/maintenance',
        'sensor/troubleshooting',
        'sensor/specifications',
      ],
    },
  ],
};

export default sidebars;
