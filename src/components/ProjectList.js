import React from 'react';

// ProjectRow 여러 개를 묶어 테두리를 한 번만 그립니다.
export default function ProjectList({ children }) {
  return <div className="plist">{children}</div>;
}
