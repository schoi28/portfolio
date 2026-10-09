import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// 문서 제목 위에 '정보 유형' 라벨을 붙입니다.
// 값은 각 문서 맨 위 프런트매터의 doc_type 을 그대로 읽습니다.
//
//   doc_type: 절차
//
// 프런트매터는 국문 값 하나만 두고, 영문 사이트에서는 아래 표로 바꿔 보여 줍니다.
// 값을 두 곳에 두면 한쪽만 고치는 일이 생기기 때문입니다.
const TYPE_EN = {
  개념: 'Concept',
  절차: 'Task',
  레퍼런스: 'Reference',
  튜토리얼: 'Tutorial',
  '문제 해결': 'Troubleshooting',
  머리말: 'Preface',
};

export default function ContentWrapper(props) {
  const { frontMatter } = useDoc();
  const { i18n } = useDocusaurusContext();
  const docType = frontMatter.doc_type;
  const en = i18n.currentLocale !== i18n.defaultLocale;

  return (
    <>
      {docType && (
        <div className="doc-type">
          <span className="doc-type__label">
            {en ? 'Information type' : '정보 유형'}
          </span>
          {/* '개념 + 절차' 처럼 두 유형이 붙은 값은 나눠서 각각 보여 줍니다. */}
          {docType.split('+').map((t) => (
            <span className="doc-type__value" key={t}>
              {en ? TYPE_EN[t.trim()] || t.trim() : t.trim()}
            </span>
          ))}
        </div>
      )}
      <Content {...props} />
    </>
  );
}
