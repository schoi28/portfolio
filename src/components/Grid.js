import React, { useState } from 'react';

/**
 * 패널을 2×2로 늘어놓는 배치입니다.
 *
 * 한 화면에 네 칸을 함께 보여주는 것이 목적이므로, 각 칸은 접힌 상태로
 * 시작합니다. 본문을 줄이지 않고 높이만 제한한 뒤 '더 보기'로 펼칩니다.
 * 내용을 칸 크기에 맞춰 손으로 요약해 두면 원문과 어긋나기 때문입니다.
 *
 * 펼친 칸은 두 칸 폭을 차지합니다. 표와 코드 블록이 들어 있어 한 칸
 * 폭에서는 읽히지 않습니다.
 */
export default function Grid({ children }) {
  const panels = React.Children.toArray(children).filter(
    (child) => child?.props?.label
  );
  const [open, setOpen] = useState(() => new Set());

  if (panels.length === 0) return null;

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="grid2">
      {panels.map((panel, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={panel.props.label}
            className={`grid2__cell${isOpen ? ' grid2__cell--open' : ''}`}
          >
            <div className="grid2__clip">{panel}</div>
            <button
              type="button"
              className="grid2__more"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              {isOpen ? '접기' : '더 보기'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
