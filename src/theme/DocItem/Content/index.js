import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

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
 */
export default function ContentWrapper(props) {
  const { frontMatter } = useDoc();
  const docType = frontMatter.doc_type;

  return (
    <>
      {docType && (
        <div className="doc-type">
          <span className="doc-type__label">정보 유형</span>
          {docType.split('+').map((t) => (
            <span className="doc-type__value" key={t}>
              {t.trim()}
            </span>
          ))}
        </div>
      )}
      <Content {...props} />
    </>
  );
}
