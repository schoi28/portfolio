import React, { useState } from 'react';

/**
 * 패널을 한 번에 하나만 보여주고 좌우로 넘기는 배치입니다.
 *
 * 패널 수가 프로젝트마다 다르므로(3개 또는 4개) 개수를 고정하지 않습니다.
 * MDX는 JSX 사이의 줄바꿈을 공백 노드로 넘기기 때문에, label이 있는
 * 자식만 패널로 셉니다.
 *
 * 화살표만 두면 지금 몇 번째인지 알 수 없어, 위에 패널 이름을 탭으로
 * 함께 노출하고 탭을 눌러 바로 이동할 수 있게 했습니다.
 */
export default function Carousel({ children }) {
  const panels = React.Children.toArray(children).filter(
    (child) => child?.props?.label
  );
  const [index, setIndex] = useState(0);

  if (panels.length === 0) return null;

  const last = panels.length - 1;
  const go = (next) => setIndex(Math.min(Math.max(next, 0), last));

  return (
    <div className="carousel">
      <div className="carousel__tabs" role="tablist">
        {panels.map((panel, i) => (
          <button
            key={panel.props.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`carousel__tab${i === index ? ' carousel__tab--on' : ''}`}
            onClick={() => go(i)}
          >
            {panel.props.label}
          </button>
        ))}
      </div>

      <div className="carousel__stage">
        <button
          type="button"
          className="carousel__arrow carousel__arrow--prev"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="이전 섹션"
        >
          ‹
        </button>

        {/* 현재 패널만 그리면 나머지 본문이 HTML 에 남지 않습니다. 검색
            엔진과 사이트 내 검색이 못 읽으므로, 전부 그려 두고 보이는
            것만 바꿉니다. */}
        <div className="carousel__panel">
          {panels.map((panel, i) => (
            <div key={panel.props.label} hidden={i !== index}>
              {panel}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel__arrow carousel__arrow--next"
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label="다음 섹션"
        >
          ›
        </button>
      </div>

      <div className="carousel__count">
        {index + 1} / {panels.length}
      </div>
    </div>
  );
}
