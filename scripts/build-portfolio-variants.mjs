#!/usr/bin/env node
/**
 * Portfolio 탭의 배치 변형본을 만듭니다.
 *
 * portfolio.md 하나를 원본으로 두고, 각 프로젝트(h2) 안의 h3 섹션만
 * 패널로 감싼 파일을 생성합니다.
 *
 *   portfolio.md    원본. 내용은 여기서만 고칩니다
 *   portfolio-2.md  h3 하나씩 좌우로 넘기는 배치
 *   portfolio-3.md  h3를 2×2로 늘어놓는 배치
 *
 * 변형본을 손으로 만들면 세 파일의 내용이 곧 어긋납니다. 어느 한 곳만
 * 고치는 일이 반드시 생기기 때문입니다. 그래서 변형본은 생성물로 두고
 * 빌드 앞단에서 다시 만듭니다.
 *
 * 내용은 바꾸지 않습니다. h3 제목은 패널의 label로 옮기고 본문은 그대로
 * 둡니다. 그리드에서 칸이 넘치는 문제는 본문을 줄이는 대신 CSS에서
 * 높이를 제한하고 펼치기로 처리합니다.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * 로케일마다 원본 위치가 다릅니다. 번역본에만 변형본이 없으면 그 로케일에서는
 * Docusaurus 가 원문 파일로 되돌아가 한국어 페이지가 영문 사이트에 섞입니다.
 * 그래서 두 로케일을 같이 만듭니다.
 */
const LOCALES = [
  {
    name: 'ko',
    dir: join(root, 'src', 'pages'),
    label: '배치 변형',
    notes: {
      Carousel:
        '프로젝트별 상세를 한 섹션씩 넘겨 보는 배치입니다. 같은 내용을 [기본 배치](/projects)와 [2×2 배치](/projects-3)로도 보실 수 있습니다.',
      Grid: '프로젝트별 상세를 2×2로 늘어놓은 배치입니다. 각 칸은 접힌 상태로 시작하며 펼쳐서 전문을 읽을 수 있습니다. 같은 내용을 [기본 배치](/projects)와 [한 섹션씩 넘기는 배치](/projects-2)로도 보실 수 있습니다.',
    },
  },
  {
    name: 'en',
    dir: join(root, 'i18n', 'en', 'docusaurus-plugin-content-pages'),
    label: 'Layout variant',
    notes: {
      Carousel:
        'This layout shows one section of each project at a time. The same content is also available as the [default layout](/projects) and as a [2×2 layout](/projects-3).',
      Grid: 'This layout lays each project out as a 2×2 grid. Each cell starts collapsed and expands to the full text. The same content is also available as the [default layout](/projects) and as a [one section at a time layout](/projects-2).',
    },
  },
];

const VARIANTS = [
  {
    file: 'portfolio-2.md',
    wrapper: 'Carousel',
    title: 'Portfolio 2',
    slug: '/projects-2',
  },
  {
    file: 'portfolio-3.md',
    wrapper: 'Grid',
    title: 'Portfolio 3',
    slug: '/projects-3',
  },
];

// ─────────────────────────────────────────── 원본 쪼개기

/**
 * 코드 블록 안의 '## ' 나 '### ' 는 제목이 아닙니다.
 * 줄 단위로 훑으면서 펜스 안인지 추적합니다.
 */
function headingLines(text) {
  const lines = text.split('\n');
  const marks = [];
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) return;
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    if (h2) marks.push({ i, level: 2, text: h2[1] });
    if (h3) marks.push({ i, level: 3, text: h3[1] });
  });
  return { lines, marks };
}

/**
 * 마지막 패널 본문에는 프로젝트 뒤의 맺음말까지 섞여 들어옵니다.
 * 본문 맨 끝의 '---' 구분선을 기준으로 떼어냅니다.
 */
function splitTail(text) {
  const idx = text.lastIndexOf('\n---\n');
  if (idx === -1) return [text, ''];
  return [text.slice(0, idx), text.slice(idx + 1)];
}

const trimEnd = (text) => text.replace(/\s+$/, '');

// 프로젝트 사이를 가르는 '---' 는 원본에서 h2 끝을 뜻합니다. 그 구분선이
// 마지막 패널 본문에 남으면 패널 안에 선이 하나 그려지므로 떼어냅니다.
const stripDivider = (text) => trimEnd(text).replace(/\n-{3,}$/, '');

/** 원본 한 편을 머리말 · 프로젝트 · 맺음말로 쪼갭니다. */
function parse(raw, where) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) throw new Error(`${where}: 프런트매터를 찾지 못했습니다.`);

  const { lines, marks } = headingLines(raw.slice(fm[0].length));
  const h2Marks = marks.filter((m) => m.level === 2);
  if (h2Marks.length === 0) {
    throw new Error(`${where}: 프로젝트 제목(h2)을 찾지 못했습니다.`);
  }

  // 머리말은 h2 가 처음 나오기 전까지입니다. 프로젝트 목록 표의 h3 는
  // 프로젝트 안의 섹션이 아니므로 여기 포함되어 그대로 남습니다.
  const preamble = lines.slice(0, h2Marks[0].i).join('\n');

  const projects = h2Marks.map((h2, n) => {
    const end = n + 1 < h2Marks.length ? h2Marks[n + 1].i : lines.length;
    const inner = marks.filter((m) => m.level === 3 && m.i > h2.i && m.i < end);
    return {
      heading: lines[h2.i],
      intro: lines.slice(h2.i + 1, inner.length ? inner[0].i : end).join('\n'),
      panels: inner.map((h3, k) => ({
        label: h3.text,
        bodyText: lines
          .slice(h3.i + 1, k + 1 < inner.length ? inner[k + 1].i : end)
          .join('\n'),
      })),
    };
  });

  let tail = '';
  const lastPanel = projects.at(-1).panels.at(-1);
  if (lastPanel) {
    const [panelBody, rest] = splitTail(lastPanel.bodyText);
    lastPanel.bodyText = panelBody;
    tail = rest;
  }

  return { frontMatter: fm[1], preamble, projects, tail };
}

// ─────────────────────────────────────────── 변형본 쓰기

for (const locale of LOCALES) {
  const source = join(locale.dir, 'portfolio.md');
  const parsed = parse(readFileSync(source, 'utf8'), source);

  for (const variant of VARIANTS) {
    const head = parsed.frontMatter
      .replace(/^title: .*$/m, `title: ${variant.title}`)
      .replace(/^slug: .*$/m, `slug: ${variant.slug}`);

    const out = [
      '---',
      head,
      '---',
      '',
      '{/* 이 파일은 scripts/build-portfolio-variants.mjs 가 portfolio.md 에서',
      '    생성합니다. 내용을 고치려면 portfolio.md 를 고치십시오. */}',
      '',
      trimEnd(parsed.preamble),
      '',
      `:::note[${locale.label}]`,
      locale.notes[variant.wrapper],
      ':::',
      '',
      ...parsed.projects.flatMap((project) => {
        const block = [project.heading, trimEnd(project.intro), ''];
        if (project.panels.length === 0) return block;
        block.push(`<${variant.wrapper}>`, '');
        for (const panel of project.panels) {
          block.push(
            `<Panel label="${panel.label}">`,
            '',
            stripDivider(panel.bodyText),
            '',
            '</Panel>',
            ''
          );
        }
        block.push(`</${variant.wrapper}>`, '');
        return block;
      }),
      trimEnd(parsed.tail),
      '',
    ].join('\n');

    writeFileSync(join(locale.dir, variant.file), out, 'utf8');
    console.log(
      `[${locale.name}] ${variant.file} · 프로젝트 ${
        parsed.projects.length
      }개 · 패널 ${parsed.projects.map((p) => p.panels.length).join('/')}`
    );
  }
}
