import React, { useState } from 'react';
import Link from '@docusaurus/Link';

// Portfolio 개요 페이지의 프로젝트 한 줄입니다. 누르면 요점이 펼쳐집니다.
// 다섯 줄이 한 화면에 들어와야 전체를 훑을 수 있어 접어 두었고,
// 첫 줄만 펼쳐 두어 누를 수 있다는 것을 보여 줍니다.

// 프로젝트 성격을 나타내는 아이콘입니다. icon="structure" 처럼 이름으로 고릅니다.
const ICONS = {
  structure: (
    <>
      <path d="M3 3h14v4H3z" />
      <path d="M3 13h5.5v4H3z" />
      <path d="M11.5 13H17v4h-5.5z" />
      <path d="M10 7v3M6 10v3M14 10v3M6 10h8" />
    </>
  ),
  tool: (
    <>
      <path d="M3 4h14v12H3z" />
      <path d="M6 8.5l2 2 3.5-4" />
      <path d="M6 13h8" />
    </>
  ),
  flow: (
    <>
      <circle cx="4.5" cy="4.5" r="2" />
      <circle cx="4.5" cy="15.5" r="2" />
      <circle cx="15.5" cy="10" r="2" />
      <path d="M6.5 4.5h3.5a1 1 0 011 1v2.5M6.5 15.5h3.5a1 1 0 001-1V12" />
      <path d="M11 10h2.5" />
    </>
  ),
  translate: (
    <>
      <path d="M3 4h7v5H3z" />
      <path d="M10 11h7v5h-7z" />
      <path d="M5 11.5v3M15 5.5v3" />
      <path d="M5 14.5l1.5-2M15 8.5l-1.5-2" />
    </>
  ),
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

      {/* 접혀 있어도 내용을 지우지 않습니다. 지우면 검색이 못 읽습니다. */}
      <div className="prow__body" hidden={!open}>
        {children}
        <Link className="prow__more" to={to}>
          자세히 보기
        </Link>
      </div>
    </div>
  );
}
