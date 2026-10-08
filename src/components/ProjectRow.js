import React, { useState } from 'react';
import Link from '@docusaurus/Link';

/**
 * 개요 페이지의 프로젝트 한 줄입니다.
 *
 * 접힌 상태에서는 번호 · 아이콘 · 제목 · 무엇을 증명하는가 · 기간만
 * 보입니다. 한 화면에 다섯 줄이 들어와야 전체를 훑을 수 있기 때문입니다.
 * 펼치면 요점 세 줄이 나오고, 상세는 별도 페이지로 넘깁니다.
 *
 * 첫 번째 줄만 펼쳐 둡니다. 전부 접혀 있으면 눌러야 열린다는 것이
 * 보이지 않고, 전부 펼쳐 두면 접은 의미가 없습니다.
 */

const ICONS = {
  // 2층 구조. 문서를 계층으로 나눈 일입니다.
  structure: (
    <>
      <path d="M3 3h14v4H3z" />
      <path d="M3 13h5.5v4H3z" />
      <path d="M11.5 13H17v4h-5.5z" />
      <path d="M10 7v3M6 10v3M14 10v3M6 10h8" />
    </>
  ),
  // 검사 도구. 빌드가 통과·실패를 판정합니다.
  tool: (
    <>
      <path d="M3 4h14v12H3z" />
      <path d="M6 8.5l2 2 3.5-4" />
      <path d="M6 13h8" />
    </>
  ),
  // 리뷰 흐름. 갈라졌다 하나로 합쳐집니다.
  flow: (
    <>
      <circle cx="4.5" cy="4.5" r="2" />
      <circle cx="4.5" cy="15.5" r="2" />
      <circle cx="15.5" cy="10" r="2" />
      <path d="M6.5 4.5h3.5a1 1 0 011 1v2.5M6.5 15.5h3.5a1 1 0 001-1V12" />
      <path d="M11 10h2.5" />
    </>
  ),
  // 두 언어. 원문과 번역을 한 단위로 묶습니다.
  translate: (
    <>
      <path d="M3 4h7v5H3z" />
      <path d="M10 11h7v5h-7z" />
      <path d="M5 11.5v3M15 5.5v3" />
      <path d="M5 14.5l1.5-2M15 8.5l-1.5-2" />
    </>
  ),
  // 네 독자. 같은 기능을 네 깊이로 설명합니다.
  sample: (
    <>
      <path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" />
    </>
  ),
};

export default function ProjectRow({
  n,
  icon,
  to,
  title,
  proves,
  meta,
  children,
}) {
  const [open, setOpen] = useState(n === '1');

  return (
    <div className={`prow${open ? ' prow--open' : ''}`}>
      <button
        type="button"
        className="prow__head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="prow__n">{n}</span>
        <span className="prow__icon" aria-hidden="true">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          >
            {ICONS[icon] || ICONS.structure}
          </svg>
        </span>
        <span className="prow__text">
          <span className="prow__title">{title}</span>
          <span className="prow__meta">{meta}</span>
        </span>
        <span className="prow__proves">{proves}</span>
        <span className="prow__chev" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>

      {/* 접혀 있을 때도 본문을 HTML 에 남깁니다. 지워 버리면 검색 엔진과
          사이트 내 검색이 요점을 못 읽습니다. */}
      <div className="prow__body" hidden={!open}>
        {children}
        <Link className="prow__more" to={to}>
          자세히 보기
        </Link>
      </div>
    </div>
  );
}
