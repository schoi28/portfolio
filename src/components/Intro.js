import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * 사진 한 장과 소개 글을 나란히 놓습니다. 좁은 화면에서는 위아래로 쌓입니다.
 *
 *   <Intro photo="/img/profile-placeholder.svg" alt="소윤">
 *
 *   소개 문단…
 *
 *   </Intro>
 *
 * photo 경로는 useBaseUrl로 감쌉니다. 마크다운 이미지와 달리 JSX <img>에는
 * Docusaurus가 baseUrl을 자동으로 붙이지 않기 때문입니다.
 */
export default function Intro({ photo, alt = '', children }) {
  return (
    <div className="intro">
      <img className="intro__photo" src={useBaseUrl(photo)} alt={alt} />
      <div className="intro__text">{children}</div>
    </div>
  );
}
