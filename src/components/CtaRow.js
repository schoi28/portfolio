import React from 'react';

/** 버튼 여러 개를 한 줄로 묶습니다. 좁은 화면에서는 자동으로 줄바꿈됩니다. */
export default function CtaRow({ children }) {
  return <div className="cta-row">{children}</div>;
}
