import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './docs-health.module.css';
import health from '@site/src/data/docs-health.json';

function Metric({ label, value, tone }) {
  return (
    <div className={styles.metric}>
      <p className={styles.metricLabel}>{label}</p>
      <p className={clsx(styles.metricValue, tone && styles[tone])}>{value}</p>
    </div>
  );
}

function UnansweredSection({ items }) {
  if (!items.length) {
    return (
      <div className={styles.empty}>
        아직 수집된 질문이 없습니다. 챗봇을 연결하면 답변하지 못한 질문이 여기에 쌓이고,
        그것이 다음에 쓸 문서의 목록이 됩니다.
      </div>
    );
  }

  return (
    <div className={styles.rows}>
      {items.map((q) => (
        <div className={styles.row} key={q.question}>
          <div>
            <p className={styles.rowMain}>{q.question}</p>
            <p className={styles.rowSub}>
              {q.area} · {q.count}회 질문
            </p>
          </div>
          <span className={styles.badge}>{q.status}</span>
        </div>
      ))}
    </div>
  );
}

function FreshnessSection({ items }) {
  return (
    <div className={styles.rows}>
      {items.map((d) => {
        const overdue = d.lastReviewedDaysAgo > d.reviewCycleDays;
        return (
          <div className={styles.row} key={d.doc}>
            <Link className={styles.rowMain} to={d.path}>
              {d.doc}
            </Link>
            <span className={clsx(styles.rowRight, overdue && styles.danger)}>
              {d.lastReviewedDaysAgo === 0
                ? `검토 주기 ${d.reviewCycleDays}일 · 기록 없음`
                : `검토 ${d.lastReviewedDaysAgo}일 전 · 주기 ${d.reviewCycleDays}일${
                    overdue ? ' · 초과' : ''
                  }`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function DocsHealth() {
  const { metrics, unansweredQuestions, freshness, period, note, recentReview } = health;

  return (
    <Layout
      title="Docs health"
      description="이 사이트의 문서가 얼마나 정확하고 최신인지 공개합니다.">
      <main className={styles.wrap}>
        <h1 className={styles.title}>Docs health</h1>
        <p className={styles.meta}>{period} · 매일 자동 갱신</p>
        <p className={styles.lede}>
          챗봇이 답하지 못한 질문을 문서 공백으로 보고, 그 공백을 메운 이력까지 공개합니다.
          잘 된 것만 보여주는 페이지가 아니라, 무엇이 아직 부족한지 드러내는 페이지입니다.
        </p>

        <div className={styles.metrics}>
          <Metric label="이번 달 질문" value={metrics.questions} />
          <Metric
            label="답변 성공률"
            value={metrics.questions > 0 ? `${metrics.answerRate}%` : '—'}
            tone="ok"
          />
          <Metric label="미해결 공백" value={metrics.openGaps} tone="warn" />
          <Metric label="검토 초과 문서" value={metrics.overdueDocs} tone="danger" />
        </div>

        <h2 className={styles.sectionTitle}>답변하지 못한 질문</h2>
        <p className={styles.sectionNote}>
          근거 문서가 없어 답을 못 한 질문입니다. 이것이 다음에 쓸 문서의 목록이 됩니다.
        </p>
        <UnansweredSection items={unansweredQuestions} />

        <h2 className={styles.sectionTitle}>문서 신선도</h2>
        <p className={styles.sectionNote}>
          문서마다 검토 주기를 정하고, 주기를 넘긴 문서를 표시합니다.
        </p>
        <FreshnessSection items={freshness} />

        <h2 className={styles.sectionTitle}>최근 자동 검수</h2>
        <p className={styles.sectionNote}>
          문서를 수정한 PR마다 링크·용어·문체 검사가 자동으로 실행됩니다.
        </p>
        {recentReview ? (
          <div className={styles.rows}>
            <div className={styles.row}>
              <div>
                <p className={styles.rowMain}>{recentReview.title}</p>
                <p className={styles.rowSub}>
                  링크 {recentReview.links}건 · 용어 {recentReview.terms}건 · 문체{' '}
                  {recentReview.style}건
                </p>
              </div>
              <span className={styles.badge}>{recentReview.result}</span>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            검수 워크플로를 연결하면 최근 PR의 검사 결과가 여기에 표시됩니다.
          </div>
        )}

        <p className={styles.sectionNote} style={{ marginTop: '2.5rem' }}>
          {note}
        </p>
      </main>
    </Layout>
  );
}
