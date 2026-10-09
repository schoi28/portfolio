import React, { useCallback, useEffect, useRef, useState } from 'react';

// 본문의 모든 그림을 감쌉니다. MDXComponents 에 img 로 등록되어 있어서
// 마크다운의 ![설명](주소) 가 자동으로 여기를 거칩니다.
//
//  - 그림을 본문 너비에 맞춰 늘립니다. 전부 SVG 라 키워도 선명합니다.
//  - 누르면 확대해서 보여 줍니다.
//
// 확대 창은 브라우저 기본 <dialog> 입니다. 따로 라이브러리를 쓰지 않아도
// Esc 로 닫기, 키보드 포커스 가두기가 따라옵니다.
export default function Figure({ src, alt = '', title, ...rest }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    const el = dialogRef.current;
    if (!el) return;
    // 아주 오래된 브라우저에는 showModal 이 없습니다. 그때는 확대만 건너뜁니다.
    if (typeof el.showModal !== 'function') return;
    el.showModal();
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    const el = dialogRef.current;
    if (el && el.open) el.close();
  }, []);

  // 배경을 눌러도 닫습니다. dialog 자신이 배경입니다.
  const onBackdrop = useCallback(
    (event) => {
      if (event.target === dialogRef.current) hide();
    },
    [hide],
  );

  // 확대 창이 열려 있는 동안 뒤쪽 본문이 스크롤되지 않게 막습니다.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="figure"
        onClick={show}
        aria-label={alt ? `${alt} — 확대해서 보기` : '그림 확대해서 보기'}
      >
        <img className="figure__img" src={src} alt={alt} title={title} {...rest} />
      </button>

      <dialog
        ref={dialogRef}
        className="figure-zoom"
        onClick={onBackdrop}
        onClose={() => setOpen(false)}
        aria-label={alt || undefined}
      >
        <button
          type="button"
          className="figure-zoom__close"
          onClick={hide}
          aria-label="닫기"
        >
          ✕
        </button>
        <img className="figure-zoom__img" src={src} alt={alt} />
      </dialog>
    </>
  );
}
