import React from 'react';

// 프로젝트마다 붙는 보유 기술 줄입니다.
//
//   <Skills>정보 구조 설계 · 독자 분석 · OpenAPI</Skills>
//
// 가운뎃점으로 나눈 글자를 받아 항목마다 태그로 그립니다.
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
