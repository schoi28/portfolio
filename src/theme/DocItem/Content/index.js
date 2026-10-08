import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * 문서 제목 위에 정보 유형 라벨을 붙입니다.
 *
 * 각 문서의 프런트매터에 적은 doc_type 값을 그대로 읽습니다.
 * 값의 출처가 한 곳이어야 본문과 라벨이 어긋나지 않습니다.
 *
 *   doc_type: 절차
 *
 * DITA의 정보 유형(concept · task · reference)을 한국어로 옮긴 값을 씁니다.
 * '개념 + 절차'는 기능 하나를 설명하려면 두 유형이 함께 필요한 문서입니다.
 * 파일을 쪼개는 대신 문서 안에서 섹션으로 나눕니다.
 *
 * 번역본에서는 같은 값을 영어로 바꿔 보여 줍니다. 프런트매터를 로케일마다
 * 다르게 적지 않는 이유는, 값이 두 곳에 있으면 한쪽만 고치는 일이 생기기
 * 때문입니다. 원문 값을 그대로 두고 표시만 아래 표에서 옮깁니다.
 */
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
