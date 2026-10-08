import React from 'react';
import Link from '@docusaurus/Link';

/**
 * 본문에서 쓰는 버튼형 링크입니다.
 *
 *   <Cta to="/contact">연락하기</Cta>              사이트 내부 이동
 *   <Cta to="/projects" variant="ghost">기록 보기</Cta>
 *   <Cta href="mailto:...">이메일 보내기</Cta>      외부 주소·파일
 *
 * `to`는 Docusaurus Link로 처리해 baseUrl을 붙이고 빌드 시 링크 검사를 받습니다.
 * `href`는 일반 <a>로 둡니다. 외부 주소와 PDF 같은 정적 파일은
 * 라우터가 모르는 대상이라 링크 검사에 걸리기 때문입니다.
 *
 * `button` 클래스를 함께 주는 이유는 custom.css의 본문 링크 스타일이
 * `a:not(.button)`으로 버튼을 제외하도록 되어 있기 때문입니다.
 */
export default function Cta({ to, href, children, variant = 'solid' }) {
  const className = `button cta cta--${variant}`;

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        className={className}
        href={href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}
