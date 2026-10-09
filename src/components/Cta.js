import React from 'react';
import Link from '@docusaurus/Link';

// 본문에서 쓰는 버튼형 링크입니다.
//
//   <Cta to="/contact">연락하기</Cta>                   사이트 안으로 이동
//   <Cta to="/projects" variant="ghost">프로젝트 보기</Cta>  테두리만 있는 버튼
//   <Cta href="mailto:...">이메일 보내기</Cta>           외부 주소나 파일
//
// to  = 사이트 안. 주소 앞에 baseUrl 이 자동으로 붙습니다.
// href = 사이트 밖이나 PDF. 라우터가 모르는 대상이라 일반 <a> 로 둡니다.
//
// 버튼 이름은 목적지마다 정해져 있습니다. _config/style-rules.yaml 의 cta_labels 를 보십시오.
export default function Cta({ to, href, children, variant = 'solid' }) {
  const className = `button cta cta--${variant}`;

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        className={className}
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
