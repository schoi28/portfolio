// @ts-check
//
// 사이트 전체 설정입니다. 탭 구성, 주소, 두 언어 설정이 여기에 있습니다.
// 본인 정보로 바꿀 곳은 바로 아래 세 줄입니다.

import { execSync } from 'node:child_process';

const GITHUB_USERNAME = 'schoi28';
const REPO_NAME = 'portfolio';
const SITE_TITLE = 'Soyoon Choi · Technical Writer';

// 저장소 이름이 '<사용자명>.github.io'이면 주소가 루트(/),
// 아니면 '/저장소이름/' 아래가 됩니다.
const BASE_URL =
  REPO_NAME === `${GITHUB_USERNAME}.github.io` ? '/' : `/${REPO_NAME}/`;

// 문서의 최종 수정일을 git 이력에서 읽습니다.
// git 저장소가 아니면 꺼서 빌드가 멈추지 않게 합니다.
const isGitRepo = (() => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: SITE_TITLE,
  tagline: '읽히는 문서를 쓰고, 계속 읽히도록 구조를 만듭니다',

  url: `https://${GITHUB_USERNAME}.github.io`,
  baseUrl: BASE_URL,

  organizationName: GITHUB_USERNAME,
  projectName: REPO_NAME,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // 링크 검사는 scripts/check-docs.mjs 가 합니다.
  // Docusaurus 쪽 검사는 번역본에서 멀쩡한 링크를 오류로 보고해 경고만 남깁니다.
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },

  // 한국어 본문용 글꼴. 못 불러와도 custom.css 의 대체 글꼴로 표시됩니다.
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
      type: 'text/css',
    },
  ],

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    localeConfigs: {
      ko: { label: '한국어', htmlLang: 'ko-KR' },
      en: { label: 'English', htmlLang: 'en-US' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // Sample Docs 탭. 원본은 sample_docs/, 주소는 /samples 입니다.
        docs: {
          sidebarPath: './sidebars.js',
          path: 'sample_docs',
          routeBasePath: 'samples',
          showLastUpdateTime: isGitRepo,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  plugins: [
    // Portfolio 탭. 프로젝트마다 페이지를 나누려고 문서 플러그인을 하나 더 씁니다.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'projects',
        path: 'projects',
        routeBasePath: 'projects',
        sidebarPath: './sidebarsProjects.js',
        showLastUpdateTime: isGitRepo,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      // 탭 순서: 읽을 것을 먼저 보여 주고 연락은 맨 뒤에 둡니다.
      navbar: {
        title: '소윤',
        items: [
          { to: '/', label: 'About Me', position: 'left', activeBasePath: 'never' },
          { to: '/resume', label: 'Resume', position: 'left' },
          {
            type: 'docSidebar',
            docsPluginId: 'projects',
            sidebarId: 'projectsSidebar',
            position: 'left',
            label: 'Portfolio',
          },
          {
            type: 'docSidebar',
            sidebarId: 'samplesSidebar',
            position: 'left',
            label: 'Sample Docs',
          },
          { to: '/contact', label: 'Contact', position: 'left' },
          { type: 'localeDropdown', position: 'right' },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            items: [
              { label: 'soyoon9428@gmail.com', href: 'mailto:soyoon9428@gmail.com' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/soyoon-choi' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Soyoon Choi`,
      },
      prism: {
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
    }),
};

export default config;
