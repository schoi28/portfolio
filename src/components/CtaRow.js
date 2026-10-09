import React from 'react';

// 버튼 여러 개를 한 줄로 묶습니다. 화면이 좁으면 알아서 줄이 바뀝니다.
export default function CtaRow({ children }) {
  return <div className="cta-row">{children}</div>;
}
