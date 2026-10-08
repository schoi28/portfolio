import React from 'react';

/**
 * Carousel과 Grid가 공통으로 쓰는 패널 한 칸입니다.
 *
 * 이 컴포넌트 자체는 제목과 본문을 묶어 두는 그릇일 뿐이고,
 * 무엇을 보여줄지는 부모가 정합니다. 같은 내용을 캐러셀로도,
 * 그리드로도 배치할 수 있어야 하므로 표시 방식을 여기에 두지 않았습니다.
 *
 * label은 부모가 탭 이름으로도 읽기 때문에 반드시 넘겨야 합니다.
 */
export default function Panel({ label, children }) {
  return (
    <section className="panel" aria-label={label}>
      <h3 className="panel__title">{label}</h3>
      <div className="panel__body">{children}</div>
    </section>
  );
}
