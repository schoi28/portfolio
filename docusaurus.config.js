// @ts-check

import { execSync } from 'node:child_process';

// ─────────────────────────────────────────────────────────────
// 여기 세 줄만 본인 정보에 맞추면 됩니다.
const GITHUB_USERNAME = 'schoi28';
const REPO_NAME = 'portfolio';
const SITE_TITLE = '소윤 · Technical Writer';
// ─────────────────────────────────────────────────────────────

// 저장소 이름이 '<사용자명>.github.io'면 주소가 루트(/)이고,
// 그 외 이름이면 '/저장소이름/' 하위 경로가 됩니다.
const isUserSite = REPO_NAME === `${GITHUB_USERNAME}.github.io`;
const BASE_URL = isUserSite ? '/' : `/${REPO_NAME}/`;

// 문서의 최종 수정일은 git 이력에서 읽습니다.
// 아직 git init을 하지 않은 폴더에서도 빌드가 되도록, git 저장소일 때만 켭니다.
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
  // 파비콘을 만들면 static/img/favicon.ico 에 넣고 아래 줄의 주석을 해제하세요.
  // favicon: 'img/favicon.ico',

  url: `https://${GITHUB_USERNAME}.github.io`,
  baseUrl: BASE_URL,

  organizationName: GITHUB_USERNAME,
  projectName: REPO_NAME,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // 링크가 깨지면 빌드를 실패시킵니다. 링크 검사관의 역할을 빌드가 대신합니다.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'work',
          editUrl: `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/tree/main/`,
          showLastUpdateTime: isGitRepo,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: '지식 시스템을 만들어 가는 기록',
          postsPerPage: 5,
          blogSidebarTitle: '최근 글',
          blogSidebarCount: 10,
          onUntruncatedBlogPosts: 'ignore',
          editUrl: `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/tree/main/`,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 소셜 공유 이미지를 만들면 static/img/social-card.png 에 넣고 주석을 해제하세요.
      // image: 'img/social-card.png',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '소윤',
        hideOnScroll: false,
        items: [
          { type: 'docSidebar', sidebarId: 'workSidebar', position: 'left', label: 'Work' },
          { to: '/how-i-work', label: 'How I work', position: 'left' },
          { to: '/docs-health', label: 'Docs health', position: 'left' },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/about', label: 'About', position: 'left' },
          { type: 'localeDropdown', position: 'right' },
          {
            href: `https://github.com/${GITHUB_USERNAME}`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Work',
            items: [
              { label: '하드웨어 매뉴얼', to: '/work/hardware/intro' },
              { label: '소프트웨어 매뉴얼', to: '/work/software/intro' },
              { label: 'API · SDK 문서', to: '/work/api/intro' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'How I work', to: '/how-i-work' },
              { label: 'Docs health', to: '/docs-health' },
              { label: 'Blog', to: '/blog' },
            ],
          },
          {
            title: 'Contact',
            items: [
              { label: 'GitHub', href: `https://github.com/${GITHUB_USERNAME}` },
              { label: 'Email', href: 'mailto:soyoon9428@gmail.com' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} 소윤. Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
    }),
};

export default config;
