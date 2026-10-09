#!/usr/bin/env node
/**
 * 문서 검수기
 *
 * _config/ 의 설정 파일을 읽어 sample_docs/ 전체를 검사합니다.
 * 설정만 바꾸면 같은 검사가 다른 기준으로 동작합니다. 규칙은 코드에 없습니다.
 *
 *   node scripts/check-docs.mjs            검사만 수행
 *   node scripts/check-docs.mjs            자동 수정은 하지 않습니다
 *
 * 자동 수정을 넣지 않은 이유:
 * 문서를 임의로 바꾸는 도구는 한 번 잘못 고치면 다시 신뢰받지 못합니다.
 * 판단이 필요한 항목은 사람이 고치도록 위치와 근거만 제시합니다.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, relative, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = join(ROOT, '_config');
const IMG = join(ROOT, 'static', 'img');

// ─────────────────────────────────────────── 설정 읽기

const loadYaml = (f) => yaml.load(readFileSync(join(CONFIG, f), 'utf8'));

function loadGlossary() {
  const text = readFileSync(join(CONFIG, 'glossary.csv'), 'utf8').trim();
  const rows = [];
  // 따옴표 안의 쉼표를 보존하는 최소 CSV 파서
  for (const line of text.split('\n').slice(1)) {
    const cells = [];
    let cur = '';
    let quoted = false;
    for (const ch of line) {
      if (ch === '"') quoted = !quoted;
      else if (ch === ',' && !quoted) { cells.push(cur); cur = ''; }
      else cur += ch;
    }
    cells.push(cur);
    const [term_ko, term_en, banned, scope, note, banned_en] = cells;
    if (!term_ko) continue;
    const list = (v) => (v || '').split(';').map((s) => s.trim()).filter(Boolean);
    rows.push({
      term: term_ko.trim(),
      en: (term_en || '').trim(),
      banned: list(banned),
      bannedEn: list(banned_en),
      scope: (scope || '공통').trim(),
      note: (note || '').trim(),
    });
  }
  return rows;
}

const style = loadYaml('style-rules.yaml');
const admon = loadYaml('admonitions.yaml');
const audience = loadYaml('audience.yaml');
const glossary = loadGlossary();

// 언어 설정. 한국어가 원문, 영어가 번역본입니다.
const LOCALES = style.locales || { ko: { path: 'sample_docs', role: 'source' } };
const SOURCE_LOCALE =
  Object.keys(LOCALES).find((k) => LOCALES[k].role === 'source') || 'ko';

/** 규칙 묶음이 이 언어에 적용되는지 */
const applies = (group, locale) =>
  !group?.applies_to || group.applies_to.includes(locale);

// 디렉터리 → 문서 세트 → 독자 설정
const dirToSet = admon.doc_set_dirs || {};
const audienceByDir = {};
for (const a of Object.values(audience.audiences || {})) {
  if (a.dir) audienceByDir[a.dir] = a;
}

// ─────────────────────────────────────────── 결과 수집

/**
 * 아직 번역되지 않은 파일인지 판정합니다.
 *
 * 번역을 점진적으로 진행할 때는 원문을 그대로 복사해 두고 한 편씩 고칩니다.
 * 그 상태의 파일에 영어 규칙을 들이대면 리포트가 원문 수만큼 부풀어
 * 정작 번역된 문서의 지적이 묻힙니다. 미번역 파일은 '미번역' 한 건만 올립니다.
 */
const KEEP_AS_IS = (style.translation?.keep_as_is || []).join('|');
function isUntranslated(body) {
  const stripped = KEEP_AS_IS
    ? body.replace(new RegExp(KEEP_AS_IS, 'g'), '')
    : body;
  return /[가-힣]/.test(stripped.replace(/```[\s\S]*?```/g, ''));
}

const findings = [];
const report = (level, file, line, rule, message) =>
  findings.push({ level, file, line, rule, message });

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

/** 프런트매터와 본문을 나눕니다. */
function split(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: {}, body: raw, offset: 0 };
  return {
    front: yaml.load(m[1]) || {},
    body: m[2],
    offset: m[1].split('\n').length + 2,
  };
}

/**
 * 코드블록과 '검사 제외 구간'을 뺀 줄만 넘겨줍니다.
 *
 * 설계 노트는 용어 정책 자체를 설명하는 자리라 금지어가 등장합니다.
 * ("'OTA'를 쓰지 않고 '소프트웨어 업데이트'로 씁니다") 제품 본문이 아니므로 제외합니다.
 * 제외할 제목은 style-rules.yaml 의 exempt_sections 에서 관리합니다.
 */
const EXEMPT = style.exempt_sections || [];
function proseLines(body, offset) {
  const out = [];
  let inFence = false;
  let exempt = false;
  body.split('\n').forEach((text, i) => {
    if (/^\s*```/.test(text)) { inFence = !inFence; return; }
    const h = text.match(/^(#{2,4}) (.+)$/);
    if (h) exempt = EXEMPT.some((name) => h[2].trim() === name);
    if (!inFence && !exempt) out.push({ no: offset + i + 1, text });
  });
  return out;
}

// ─────────────────────────────────────────── 검사 항목

/** 1. 금지 표현 (style-rules.yaml, 언어별) */
function checkForbidden(file, lines, locale) {
  for (const rule of style.forbidden_expressions?.[locale] || []) {
    // 영어는 문장 첫 글자가 대문자로 올라오므로 대소문자를 가리지 않습니다.
    const re = new RegExp(rule.pattern, locale === 'ko' ? 'g' : 'gi');
    for (const { no, text } of lines) {
      if (/^\s*\|?\s*-{3,}/.test(text)) continue; // 표 구분선
      const hit = text.match(re);
      if (hit) report('error', file, no, '금지 표현',
        `"${hit[0]}" — ${rule.reason || rule.note}`);
    }
  }
}

/**
 * 한국어 낱말 경계.
 *
 * 영어의 \b는 한국어에 쓸 수 없습니다. '차'를 금지어로 두면 '차량', '주차',
 * '자동차'까지 걸립니다. 반대로 조사가 붙은 '차를', '차가'는 잡아야 합니다.
 * 그래서 앞은 한글이 아니어야 하고, 뒤는 조사이거나 글자가 아니어야 한다고 봅니다.
 */
const PARTICLES = '은는이가을를의와과로도만에서에부터까지라도보다처럼';
const koreanWord = (term) =>
  // 한 글자 금지어는 조사까지 허용하면 '차이', '차례'까지 걸립니다.
  // 양옆이 모두 한글이 아닐 때만 잡습니다. '차를'은 놓치지만 오탐이 없습니다.
  term.length === 1
    ? new RegExp(`(?<![A-Za-z0-9가-힣])${term}(?![A-Za-z0-9가-힣])`)
    : new RegExp(
        `(?<![A-Za-z0-9가-힣])${term}(?=[${PARTICLES}]|[^A-Za-z0-9가-힣]|$)`
      );

/** 2. 용어집 금지 변형 (glossary.csv, scope와 언어 적용) */
function checkGlossary(file, lines, docSet, locale) {
  // 용어집 문서 자체는 금지 변형을 설명하는 자리이므로 건너뜁니다.
  if (basename(file) === 'glossary.md') return;
  for (const entry of glossary) {
    if (entry.scope !== '공통' && entry.scope !== docSet) continue;
    const banned = locale === 'en' ? entry.bannedEn : entry.banned;
    const prefer = locale === 'en' ? entry.en : entry.term;
    if (!prefer) continue;
    for (const bad of banned) {
      // 영어는 대소문자가 규칙 자체인 경우가 많습니다. LiDAR 를 강제하려면
      // LIDAR 와 Lidar 를 잡아야 하는데, 대소문자를 무시하면 LiDAR 까지 걸립니다.
      // 금지어에 대문자가 있으면 그대로 맞추고, 전부 소문자면 문장 첫 글자만 허용합니다.
      const re = locale === 'en'
        ? new RegExp(
            /[A-Z]/.test(bad)
              ? `\\b${bad}\\b`
              : `\\b[${bad[0].toUpperCase()}${bad[0]}]${bad.slice(1)}\\b`
          )
        : koreanWord(bad);
      for (const { no, text } of lines) {
        // 인라인 코드는 식별자입니다. 포트 이름 `LIDAR` 나 필드 이름은
        // 제품이 그렇게 표기하므로 표기 규칙을 적용하지 않습니다.
        if (re.test(text.replace(/`[^`]*`/g, ''))) report('error', file, no, '용어',
          `"${bad}" 대신 "${prefer}"을 씁니다${entry.note && locale !== 'en' ? `. ${entry.note}` : ''}`);
      }
    }
  }
}

/** 3. 독자별 금지 용어 (audience.yaml, 원문에만 적용) */
function checkAudienceTerms(file, lines, aud, locale) {
  if (locale !== SOURCE_LOCALE) return;
  for (const term of aud?.forbidden_terms || []) {
    for (const { no, text } of lines) {
      if (text.includes(term)) report('error', file, no, '독자 수준',
        `"${term}"은 ${aud.label} 문서에 쓰지 않습니다`);
    }
  }
}

/** 4. 절차 단계 수 상한 */
function checkSteps(file, body, offset, aud) {
  const max = aud?.max_procedure_steps ?? style.procedure?.max_steps ?? 8;
  let heading = '';
  let headingLine = 0;
  let last = 0;
  const flush = () => {
    if (last > max) report('warn', file, headingLine, '절차 길이',
      `"${heading}"이 ${last}단계입니다. ${max}단계를 넘으면 절을 나눕니다`);
    last = 0;
  };
  body.split('\n').forEach((text, i) => {
    if (/^#{2,4} /.test(text)) { flush(); heading = text.replace(/^#+ /, ''); headingLine = offset + i + 1; }
    const m = text.match(/^(\d+)\. /);
    if (m) last = Math.max(last, Number(m[1]));
  });
  flush();
}

/** 5. 안내 상자: 등급 허용 범위와 개수 */
function checkAdmonitions(file, body, offset, docSet, locale) {
  const allowed = admon.doc_set_scope?.[docSet]?.allowed || [];
  const syntaxToLevel = {};
  for (const [key, v] of Object.entries(admon.levels)) {
    const syntax = locale === 'en' && v.syntax_en ? v.syntax_en : v.syntax;
    syntaxToLevel[syntax] = key;
  }
  const noteSyntax = locale === 'en' && admon.levels.note.syntax_en
    ? admon.levels.note.syntax_en : admon.levels.note.syntax;
  let notes = 0;
  body.split('\n').forEach((text, i) => {
    const m = text.match(/^:::(danger|warning|info|note)(\[[^\]]*\])?\s*$/);
    if (!m) return;
    let syntax = `:::${m[1]}${m[2] || ''}`;
    // 참고는 상황을 설명하는 고유 제목을 붙일 수 있습니다.
    if (m[1] === 'note' && m[2]) syntax = noteSyntax;
    const level = syntaxToLevel[syntax];
    const no = offset + i + 1;
    if (!level) {
      report('error', file, no, '안내 상자',
        `"${syntax}"는 정의된 형식이 아닙니다. admonitions.yaml 의 syntax 값을 씁니다`);
      return;
    }
    if (allowed.length && !allowed.includes(level)) {
      report('error', file, no, '안내 상자 등급',
        `${docSet} 문서에는 '${admon.levels[level].label_ko}'를 쓰지 않습니다. ` +
        (admon.doc_set_scope[docSet]?.note || ''));
    }
    if (level === 'note') notes += 1;
  });

  // 여는 ::: 과 닫는 ::: 의 수가 맞는지 확인합니다.
  // 닫지 않으면 뒤 본문이 통째로 상자 안으로 들어가 버립니다.
  const opens = (body.match(/^:::[a-z]/gm) || []).length;
  const closes = (body.match(/^:::\s*$/gm) || []).length;
  if (opens !== closes) {
    report('error', file, 1, '안내 상자',
      `여는 상자 ${opens}개, 닫는 ::: ${closes}개로 짝이 맞지 않습니다`);
  }
  const maxNotes = admon.levels.note.max_per_page;
  if (maxNotes && notes > maxNotes) {
    report('warn', file, 1, '참고 개수',
      `참고가 ${notes}개입니다. ${maxNotes}개를 넘으면 본문으로 옮깁니다`);
  }
}

/** 6. 선제 정보 위치: 안내 상자가 번호 목록 뒤에 있는지 */
function checkPlacement(file, body, offset) {
  const lines = body.split('\n');
  let sawStep = false;
  let inFence = false;
  lines.forEach((text, i) => {
    if (/^\s*```/.test(text)) inFence = !inFence;
    if (inFence) return;
    if (/^#{2,4} /.test(text)) sawStep = false;
    if (/^\d+\. /.test(text)) sawStep = true;
    const m = text.match(/^:::(danger|warning|info)(\[[^\]]*\])?\s*$/);
    if (m && sawStep) {
      const bodyText = lines[i + 1] || '';
      // 수행 후 조건은 예외로 둡니다.
      if (/뒤에|후에|다 끼운|경화|교체하면|복원/.test(bodyText)) return;
      report('warn', file, offset + i + 1, '경고 위치',
        '수행 전에 알아야 할 내용이면 그 절의 첫 단계 앞으로 옮깁니다');
    }
  });
}

/** 7. 번호 목록 끊김: 표·글머리 기호가 들여쓰기 없이 목록 사이에 있는지 */
function checkListBreaks(file, body, offset) {
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    if (!/^\d+\. /.test(lines[i])) continue;
    // 이 항목 뒤에 빈 줄 + 들여쓰기 없는 표/불릿이 오고, 그 뒤 다시 번호가 이어지면 끊김
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j += 1;
    if (j >= lines.length) break;
    const isBlock = /^(\||-\s|\*\s)/.test(lines[j]);
    if (!isBlock) continue;
    let k = j;
    while (k < lines.length && lines[k].trim() !== '') k += 1;
    while (k < lines.length && lines[k].trim() === '') k += 1;
    if (k < lines.length && /^\d+\. /.test(lines[k])) {
      report('error', file, offset + j + 1, '목록 끊김',
        '번호 목록 안의 표와 글머리 기호는 세 칸 들여씁니다. 들여쓰지 않으면 목록이 끊깁니다');
    }
  }
}

/** 8. 프런트매터: doc_type 값 */
const DOC_TYPES = ['개념', '절차', '레퍼런스', '튜토리얼', '문제 해결', '개념 + 절차'];
function checkFrontMatter(file, front) {
  if (basename(file) === 'index.md') return;
  if (!front.doc_type) {
    report('error', file, 1, '정보 유형', 'doc_type 프런트매터가 없습니다');
  } else if (!DOC_TYPES.includes(front.doc_type)) {
    report('error', file, 1, '정보 유형',
      `"${front.doc_type}"은 허용된 값이 아닙니다. 허용: ${DOC_TYPES.join(', ')}`);
  }
  if (!front.title) report('error', file, 1, '프런트매터', 'title이 없습니다');
  if (/\.$/.test(front.title || '')) {
    report('warn', file, 1, '제목', '제목에 마침표를 쓰지 않습니다');
  }
}

/** 9. 강조 뒤에 조사가 붙어 굵게 처리되지 않는 경우 */
function checkEmphasis(file, lines, locale) {
  if (locale !== 'ko') return;
  for (const { no, text } of lines) {
    if (/\*\*[^*\n]+\)\*\*[가-힣]/.test(text) || /\*\*[^*\n]*[A-Za-z0-9)\]]\*\*[을를이가은는와과로]/.test(text)) {
      report('warn', file, no, '강조 표기',
        '닫는 ** 바로 뒤에 조사가 붙으면 굵게 표시되지 않습니다. 조사를 강조 밖으로 뺍니다');
    }
  }
}

/** 10. 표 정렬: 왼쪽 정렬만 허용 */
function checkTables(file, lines) {
  if (style.tables?.alignment !== 'left_only') return;
  for (const { no, text } of lines) {
    if (!/^\s*\|[\s:|-]+\|\s*$/.test(text)) continue;
    if (/:-+:|-+:/.test(text)) {
      report('error', file, no, '표 정렬',
        '모든 열은 왼쪽 정렬(:---)만 씁니다. 가운데·오른쪽 정렬은 쓰지 않습니다');
    }
  }
}

/** 11. 영문 제목은 문장형 대소문자 */
function checkHeadingCase(file, lines, locale) {
  const cfg = style.headings_en;
  if (locale !== 'en' || !cfg?.sentence_case) return;
  const keep = new Set((cfg.keep_capitalised || []).map((w) => w.toLowerCase()));
  for (const { no, text } of lines) {
    const m = text.match(/^#{1,6} (.+)$/);
    if (!m) continue;
    // "### 1. Register a client" 처럼 번호가 앞에 붙으면 번호를 떼고 첫 낱말을 셉니다.
    const words = m[1]
      .replace(/^\d+\.\s*/, '')
      .replace(/[`*\[\]()]/g, '')
      .split(/\s+/)
      .slice(1);
    const bad = words.filter(
      (w) => /^[A-Z][a-z]/.test(w) && !keep.has(w.toLowerCase().replace(/[^a-z]/g, ''))
    );
    if (bad.length) {
      report('warn', file, no, '제목 표기',
        `문장형 대소문자를 씁니다. 첫 단어와 고유명사만 대문자: ${bad.join(', ')}`);
    }
  }
}

/** 12. 정확성 표시: 미확인 값과 검토 표시 */
function checkAccuracy(file, body, offset) {
  if (!style.accuracy) return;
  body.split('\n').forEach((text, i) => {
    const no = offset + i + 1;
    if (/\[TBU\]/.test(text)) {
      report('error', file, no, '정확성',
        '비어 있는 [TBU]는 쓰지 않습니다. [TBU: 무엇이 필요한지]처럼 적습니다');
    }
    const tbu = text.match(/\[TBU: ([^\]]+)\]/);
    if (tbu) {
      report('warn', file, no, '미확인 값',
        `원본 확인이 필요합니다: ${tbu[1]}`);
    }
    const rev = text.match(/<!--\s*REVIEW:\s*([^-]+?)\s*-->/);
    if (rev) {
      report('warn', file, no, '검토 대기',
        `확인 후 표시를 지웁니다: ${rev[1].slice(0, 46)}`);
    }
  });
}

/** 13. 이미지 대체 텍스트 */
function checkImageAlt(file, lines) {
  if (!style.images?.require_alt_text) return;
  for (const { no, text } of lines) {
    for (const m of text.matchAll(/!\[([^\]]*)\]\(/g)) {
      if (!m[1].trim()) {
        report('error', file, no, '이미지',
          '그림에 대체 텍스트가 없습니다. 무엇을 보여주는 그림인지 적습니다');
      }
    }
  }
}

/**
 * 14. 문서 간 링크와 앵커
 *
 * Docusaurus의 링크 검사는 번역본 로케일에서 오탐을 냅니다.
 * 생성된 HTML은 정상인데도 .md 링크를 풀지 못했다고 보고합니다.
 * 그래서 onBrokenLinks 를 warn 으로 두고 이 검사가 대신 판정합니다.
 */
const slug = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[^0-9a-z가-힣\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

function anchorsOf(body) {
  return new Set(
    (body.match(/^#{1,6} .+$/gm) || []).map((h) => slug(h.replace(/^#+\s*/, '')))
  );
}

function checkLinks(file, lines, localeRoot) {
  const dir = dirname(join(ROOT, file));
  for (const { no, text } of lines) {
    for (const m of text.matchAll(/\[[^\]]*\]\((\.{1,2}\/[^)#\s]+\.md)(#[^)\s]*)?\)/g)) {
      const target = join(dir, m[1]);
      if (!existsSync(target)) {
        report('error', file, no, '링크',
          `${m[1]} 이 없습니다 (${relative(ROOT, target)})`);
        continue;
      }
      if (!m[2]) continue;
      const t = split(readFileSync(target, 'utf8'));
      // 아직 번역되지 않은 대상은 제목이 원문이므로 앵커를 검사하지 않습니다.
      if (localeRoot !== LOCALES[SOURCE_LOCALE].path && isUntranslated(t.body)) continue;
      const want = decodeURIComponent(m[2].slice(1));
      if (!anchorsOf(t.body).has(want)) {
        report('error', file, no, '앵커',
          `${m[1]}${m[2]} 의 앵커가 대상 문서에 없습니다`);
      }
    }
  }
}

/** 15. 다이어그램 안의 문장형 텍스트 */
function checkDiagrams() {
  const max = style.diagrams?.max_caption_length ?? 17;
  for (const f of readdirSync(IMG)) {
    if (extname(f) !== '.svg' || f.includes('profile')) continue;
    const svg = readFileSync(join(IMG, f), 'utf8');
    for (const m of svg.matchAll(/>([^<]+)<\/text>/g)) {
      const t = m[1].trim();
      if (t.length > max && /[다요오]\.?$/.test(t)) {
        report('warn', relative(ROOT, join(IMG, f)), 0, '다이어그램',
          `문장형 텍스트 "${t.slice(0, 28)}…" 는 본문 안내 상자로 옮깁니다`);
      }
    }
    if (/<line\s/.test(svg)) {
      const diagonals = [...svg.matchAll(/<line[^>]*x1="([\d.]+)"[^>]*y1="([\d.]+)"[^>]*x2="([\d.]+)"[^>]*y2="([\d.]+)"/g)]
        .filter(([, x1, y1, x2, y2]) => x1 !== x2 && y1 !== y2);
      if (diagonals.length) {
        report('warn', relative(ROOT, join(IMG, f)), 0, '다이어그램',
          `사선 연결선이 ${diagonals.length}개 있습니다. 직각으로 꺾습니다`);
      }
    }
  }
}

/**
 * 11. 번역본 대조
 *
 * 번역에서 가장 어려운 것은 번역 자체가 아니라 원문과 어긋나지 않게 유지하는 일입니다.
 * 문장의 질은 사람이 보고, 구조가 어긋났는지는 기계가 봅니다.
 */
function structureOf(body) {
  const noFence = body.replace(/```[\s\S]*?```/g, '\u0000');
  return {
    headings: (body.match(/^#{1,6} /gm) || []).length,
    heading_levels: (body.match(/^#{1,6} /gm) || [])
      .map((h) => h.trim().length).join(','),
    code_blocks: (body.match(/^```/gm) || []).length / 2,
    tables: (noFence.match(/^\|/gm) || []).length,
    images: (noFence.match(/!\[[^\]]*\]\(/g) || []).length,
    links: (noFence.match(/(?<!!)\[[^\]]*\]\(/g) || []).length,
    admonitions: (body.match(/^:::[a-z]/gm) || []).length,
  };
}

const LABEL = {
  headings: '제목', heading_levels: '제목 단계', code_blocks: '코드블록', tables: '표 행',
  images: '이미지', links: '링크', admonitions: '안내 상자',
};

function checkTranslations(sourceDocs) {
  const cfg = style.translation || {};
  const keep = (cfg.keep_as_is || []).join('|');
  const results = [];

  for (const [locale, def] of Object.entries(LOCALES)) {
    if (def.role !== 'translation') continue;
    const base = join(ROOT, def.path);
    if (!existsSync(base)) {
      results.push({ locale, total: sourceDocs.length, translated: 0 });
      continue;
    }
    // 번역을 아직 시작하지 않았으면 파일마다 경보를 띄우지 않습니다.
    // 44건의 '없음'은 정보가 아니라 소음입니다. 요약 한 줄로 충분합니다.
    const started = sourceDocs.some((src) =>
      existsSync(join(ROOT, def.path,
        relative(LOCALES[def.source || SOURCE_LOCALE].path, src.file))));

    let translated = 0;
    for (const src of sourceDocs) {
      const rel = relative(LOCALES[def.source || SOURCE_LOCALE].path, src.file);
      const target = join(def.path, rel);
      const abs = join(ROOT, target);

      if (!existsSync(abs)) {
        if (cfg.report_missing && started) {
          report('warn', src.file, 1, `번역 누락(${locale})`,
            `${target} 이 없습니다`);
        }
        continue;
      }
      const t = split(readFileSync(abs, 'utf8'));
      const untranslated = isUntranslated(t.body);
      if (!untranslated) translated += 1;
      if (untranslated) {
        const level = cfg.in_progress ? 'warn' : 'error';
        report(level, target, 1, `미번역(${locale})`, '아직 번역되지 않았습니다');
        continue;
      }

      const sStruct = structureOf(src.body);
      const tStruct = structureOf(t.body);
      for (const key of cfg.compare || []) {
        if (sStruct[key] !== tStruct[key]) {
          const msg = key === 'heading_levels'
            ? `제목 단계가 원문과 다릅니다. 원문 ${sStruct[key]} / 번역 ${tStruct[key]}`
            : `${LABEL[key] || key} 개수가 원문과 다릅니다. 원문 ${sStruct[key]} / 번역 ${tStruct[key]}`;
          report('error', target, 1, `번역 구조(${locale})`, msg);
        }
      }

      if (cfg.leftover_source_script && locale !== SOURCE_LOCALE) {
        // 줄마다 보고하면 미번역 파일 하나가 수백 줄을 뱉습니다.
        // 파일당 한 건만 올리고, 남은 줄 수를 함께 보여 줍니다.
        const lines = t.body.split('\n');
        const hits = [];
        lines.forEach((text, i) => {
          if (/^\s*```/.test(text)) return;
          const stripped = keep ? text.replace(new RegExp(keep, 'g'), '') : text;
          if (/[가-힣]/.test(stripped)) hits.push({ i, text });
        });
        if (hits.length) {
          const level = cfg.in_progress ? 'warn' : 'error';
          const first = hits[0];
          report(level, target, t.offset + first.i + 1, `미번역(${locale})`,
            hits.length > 5
              ? `아직 번역되지 않았습니다. 한글이 남은 줄 ${hits.length}개`
              : `번역되지 않은 한글이 남아 있습니다: "${first.text.trim().slice(0, 30)}"`);
        }
      }

      if (cfg.report_stale) {
        const srcTime = gitTime(src.file);
        const tgtTime = gitTime(target);
        if (srcTime && tgtTime && srcTime > tgtTime) {
          report('warn', target, 1, `번역 최신화(${locale})`,
            `원문이 더 나중에 바뀌었습니다. 원문 ${srcTime.slice(0, 10)} / 번역 ${tgtTime.slice(0, 10)}`);
        }
      }
    }
    results.push({ locale, total: sourceDocs.length, translated });
  }
  return results;
}

/**
 * git 이력에서 '내용이 마지막으로 바뀐' 시각을 읽습니다.
 *
 * 단순히 마지막 커밋을 보면 파일을 옮기기만 해도 그 시각이 갱신됩니다.
 * 폴더 이름을 docs/ 에서 sample_docs/ 로 바꿨을 때 원문 44편이 전부
 * '번역보다 나중에 바뀌었다'로 보고된 적이 있습니다. 내용은 그대로인데
 * 경로만 달라진 것이라 오탐입니다.
 *
 *   --diff-filter=AM  추가(A)와 수정(M)만 셉니다. 이름 변경(R)은 뺍니다.
 *   --follow          이름이 바뀌기 전의 이력까지 따라갑니다.
 *
 * 추적되지 않는 파일은 null 을 돌려주고 이 검사만 건너뜁니다.
 */
function gitTime(file) {
  try {
    return execSync(
      `git log -1 --format=%cI --diff-filter=AM --follow -- "${file}"`,
      { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }
    ).toString().trim() || null;
  } catch { return null; }
}

/** 12. 같은 설명 문장이 여러 파일에 중복 */
function checkDuplication(allDocs) {
  const min = style.duplication?.min_sentence_length ?? 30;
  const seen = new Map();
  for (const { file, lines } of allDocs) {
    for (const { no, text } of lines) {
      if (/^[|#>\-*\d]/.test(text.trim())) continue;
      for (const s of text.split(/(?<=다\.)\s+/)) {
        const t = s.trim();
        if (t.length < min) continue;
        if (!seen.has(t)) seen.set(t, []);
        seen.get(t).push({ file, no });
      }
    }
  }
  for (const [sentence, places] of seen) {
    const files = [...new Set(places.map((p) => p.file))];
    if (files.length > 1) {
      report('warn', files[1], places[1].no, '중복',
        `"${sentence.slice(0, 32)}…" 가 ${files[0]} 에도 있습니다. 한 곳에 쓰고 링크합니다`);
    }
  }
}

// ─────────────────────────────────────────── 실행

const sourceDocs = [];
const allProse = [];
let scanned = 0;

for (const [locale, def] of Object.entries(LOCALES)) {
  const base = join(ROOT, def.path);
  if (!existsSync(base)) continue;

  for (const path of walk(base)) {
    if (extname(path) !== '.md') continue;
    const file = relative(ROOT, path);
    const dir = relative(base, dirname(path)).split('/')[0];
    const docSet = dirToSet[dir];
    const aud = audienceByDir[dir];

    const { front, body, offset } = split(readFileSync(path, 'utf8'));
    const lines = proseLines(body, offset);
    scanned += 1;
    if (locale === SOURCE_LOCALE) sourceDocs.push({ file, body, lines });

    // 번역본인데 아직 원문 그대로면 언어 규칙을 적용하지 않습니다.
    if (locale !== SOURCE_LOCALE && isUntranslated(body)) continue;

    if (applies(style.duplication, locale)) allProse.push({ file, lines });

    checkFrontMatter(file, front);
    checkForbidden(file, lines, locale);
    checkGlossary(file, lines, docSet, locale);
    checkAudienceTerms(file, lines, aud, locale);
    checkSteps(file, body, offset, aud);
    checkAdmonitions(file, body, offset, docSet, locale);
    checkPlacement(file, body, offset);
    checkListBreaks(file, body, offset);
    checkEmphasis(file, lines, locale);
    checkTables(file, lines);
    checkHeadingCase(file, lines, locale);
    checkAccuracy(file, body, offset);
    checkImageAlt(file, lines);
    checkLinks(file, lines, def.path);
  }
}

checkDiagrams();
checkDuplication(allProse);
const translation = checkTranslations(sourceDocs);

// ─────────────────────────────────────────── 보고

const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

console.log('\n문서 검수 결과');
console.log('─'.repeat(72));
console.log(`검사 대상  문서 ${scanned}편 (원문 ${sourceDocs.length}편) · 용어집 ${glossary.length}항목`);
for (const t of translation) {
  const rate = t.total ? Math.round((t.translated / t.total) * 100) : 0;
  console.log(`번역 현황  ${LOCALES[t.locale].label}  ${t.translated} / ${t.total}편 (${rate}%)`);
}
console.log(`설정 출처  _config/glossary.csv · style-rules.yaml · audience.yaml · admonitions.yaml`);
console.log('─'.repeat(72));

if (!findings.length) {
  console.log('지적 사항 없음\n');
} else {
  for (const [file, items] of [...byFile].sort()) {
    console.log(`\n${file}`);
    for (const f of items.sort((a, b) => a.line - b.line)) {
      const mark = f.level === 'error' ? '오류' : '주의';
      const loc = f.line ? `:${f.line}` : '';
      console.log(`  ${mark}  ${String(f.rule).padEnd(10)} ${file}${loc}`);
      console.log(`        ${f.message}`);
    }
  }
  console.log('\n' + '─'.repeat(72));
  console.log(`오류 ${errors.length}건 · 주의 ${warns.length}건`);
}

// 오류가 있으면 빌드를 멈춥니다. 주의는 보고만 합니다.
process.exit(errors.length > 0 ? 1 : 0);
