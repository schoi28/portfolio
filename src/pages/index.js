import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import health from '@site/src/data/docs-health.json';

const works = [
  {
    to: '/work/hardware/intro',
    title: '하드웨어 매뉴얼',
    body: '설치·안전 경고·트러블슈팅을 포함한 공기질 센서 사용 설명서',
    tags: ['웹', 'PDF', 'KO · EN'],
  },
  {
    to: '/work/software/intro',
    title: '소프트웨어 매뉴얼',
    body: '관리 콘솔 온보딩부터 핵심 기능까지의 SaaS 사용 가이드',
    tags: ['웹', 'PDF', '정보 설계'],
  },
  {
    to: '/work/api/intro',
    title: 'API · SDK 문서',
    body: 'OpenAPI 기반 레퍼런스와 인증·에러 코드 개발자 가이드',
    tags: ['OpenAPI', 'EN'],
  },
];

function HealthStrip() {
  const { questions, answerRate, openGaps } = health.metrics;
  const hasData = questions > 0;

  return (
    <Link className={styles.healthStrip} to="/docs-health">
      <div>
        <p className={styles.healthLabel}>이 사이트는 스스로를 점검합니다</p>
        <p className={styles.healthNumbers}>
          {hasData
            ? `이번 달 질문 ${questions}건 · 답변 성공률 ${answerRate}% · 미해결 공백 ${openGaps}건`
            : '문서 검수 자동화와 신선도 관리를 공개합니다'}
        </p>
      </div>
      <span className={styles.healthCta}>Docs health →</span>
    </Link>
  );
}

export default function Home() {
  return (
    <Layout
      title="Technical Writer"
      description="영·한 테크니컬 라이터. 하드웨어부터 API까지 문서를 설계하고, 그 문서가 낡지 않도록 자동화합니다.">
      <main className={styles.wrap}>
        <section className={styles.hero}>
          <h1 className={styles.headline}>
            읽히는 문서를 쓰고,
            <br />
            계속 읽히도록 구조를 만듭니다
          </h1>
          <p className={styles.lede}>
            영·한 테크니컬 라이터. 하드웨어부터 API까지 문서를 설계하고, 그 문서가 낡지
            않도록 검수와 갱신을 자동화합니다.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary" to="/work">
              작업 보기
            </Link>
            <Link className="button button--secondary button--outline" to="/about">
              About
            </Link>
          </div>
        </section>

        <p className={styles.sectionLabel}>대표 작업</p>
        <div className={styles.cards}>
          {works.map((w) => (
            <Link key={w.to} className={styles.card} to={w.to}>
              <p className={styles.cardTitle}>{w.title}</p>
              <p className={styles.cardBody}>{w.body}</p>
              <div className={styles.tags}>
                {w.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <HealthStrip />
      </main>
    </Layout>
  );
}
