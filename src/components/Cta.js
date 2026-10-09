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
 *
 * ── 라벨 규칙 ────────────────────────────────────────────────
 * 같은 곳으로 가는 버튼은 페이지가 달라도 같은 이름을 씁니다.
 * 이름이 다르면 독자는 다른 곳으로 간다고 생각합니다.
 * 전부 동사로 끝내 무엇을 하게 되는지 드러냅니다.
 *
 *   목적지                      국문                    영문
 *   /projects                   프로젝트 보기            See the projects
 *   /samples                    문서 샘플 읽기           Read the sample docs
 *   /resume                     이력서 보기              See the resume
 *   /contact                    연락하기                 Get in touch
 *   mailto:                     이메일 보내기            Send an email
 *   linkedin.com                LinkedIn 프로필 보기      View the LinkedIn profile
 *   resume-ko.pdf               국문 이력서 내려받기      Download the Korean resume
 *   resume-en.pdf               영문 이력서 내려받기      Download the English resume
 *
 * 목적지를 추가하면 이 표에도 함께 적으십시오.
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
