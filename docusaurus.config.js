// @ts-check

import { execSync } from 'node:child_process';

// ─────────────────────────────────────────────────────────────
// 여기 세 줄만 본인 정보에 맞추면 됩니다.
const GITHUB_USERNAME = 'schoi28';
const REPO_NAME = 'portfolio';
// 브라우저 탭 제목에 쓰입니다. Docusaurus는 이 값을 로케일별로 번역하지
// 않으므로, 두 언어에서 모두 읽히는 로마자 표기를 씁니다.
// 화면 왼쪽 위 상호는 themeConfig.navbar.title 이고 그쪽은 번역됩니다.
const SITE_TITLE = 'Soyoon Choi · Technical Writer';
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

  // 링크와 앵커 검사는 scripts/check-docs.mjs 가 담당합니다.
  // Docusaurus의 검사는 번역본 로케일에서 오탐을 냅니다. 생성된 HTML이 정상인데도
  // .md 링크를 풀지 못했다고 보고하므로, 여기서는 경고만 남기고 판정은 검수기가 합니다.
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // 한국어 본문 가독성을 위해 Pretendard를 불러옵니다.
  // 로드에 실패해도 custom.css의 폴백 글꼴로 정상 표시됩니다.
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
        docs: {
          sidebarPath: './sidebars.js',
          // 원본 파일이 있는 폴더입니다. 기본값은 docs/ 인데, 포트폴리오
          // 본문(projects/)과 구분되도록 sample_docs/ 로 둡니다.
          // 번역본 경로는 폴더 이름이 아니라 플러그인 id 를 따르므로
          // i18n/en/docusaurus-plugin-content-docs/current 그대로입니다.
          path: 'sample_docs',
          // 가상 제품군 문서 세트입니다. 예시임이 드러나도록 주소를 samples로 둡니다.
          routeBasePath: 'samples',
          // editUrl은 의도적으로 설정하지 않습니다. 각 문서에 저장소 편집 링크가
          // 붙지 않도록 하기 위해서입니다.
          showLastUpdateTime: isGitRepo,
        },
        // 블로그는 사용하지 않습니다. 글을 쓰기 시작하면 blog/ 폴더를 만들고
        // 아래를 설정 객체로 되돌리십시오.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    // Portfolio는 한 페이지에 다 두면 읽히지 않습니다. 프로젝트마다 페이지를
    // 나누고 사이드바를 붙이기 위해 문서 플러그인을 하나 더 씁니다.
    // 번역본은 i18n/en/docusaurus-plugin-content-docs-projects/current/ 입니다.
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
          // Contact는 맨 뒤에 둡니다. 읽을 것을 먼저 보여주고 연락은 마지막입니다.
          { to: '/contact', label: 'Contact', position: 'left' },
          { type: 'localeDropdown', position: 'right' },
        ],
      },
      // 푸터에는 연락처만 둡니다.
      footer: {
        style: 'light',
        links: [
          {
            items: [
              { label: 'soyoon9428@gmail.com', href: 'mailto:soyoon9428@gmail.com' },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/soyoon-choi',
              },
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
