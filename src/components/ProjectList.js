import React from 'react';

/** 프로젝트 줄을 묶어 테두리와 구분선을 한 번만 그립니다. */
export default function ProjectList({ children }) {
  return <div className="plist">{children}</div>;
}
