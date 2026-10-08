import React from 'react';

/**
 * 프로젝트마다 붙는 보유 기술 블록입니다.
 *
 *   <Skills>정보 구조 설계 · 독자 분석 · OpenAPI</Skills>
 *
 * 가운뎃점으로 구분한 문자열을 받아 항목별 태그로 나눠 그립니다.
 * 한 줄 문단으로 두면 본문에 묻혀서, 스캔하는 독자의 눈에 걸리도록 분리했습니다.
 */
export default function Skills({ children, label = 'Skills' }) {
  const items = String(children)
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="skills">
      <span className="skills__label">{label}</span>
      {items.map((item) => (
        <span className="skills__item" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
