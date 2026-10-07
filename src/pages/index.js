import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const works = [
  {
    to: '/work/app/intro',
    title: 'VELA Drive 앱',
    body: '차량 소유자를 위한 차량 관리 앱 사용 설명서',
    tags: ['일반 사용자', '튜토리얼', 'PDF'],
  },
  {
    to: '/work/api/intro',
    title: 'VELA Vehicle API',
    body: '인증부터 시그널 카탈로그, OTA 캠페인까지 다루는 9개 장 레퍼런스',
    tags: ['개발자', '9개 장', 'EN'],
  },
  {
    to: '/work/deploy/intro',
    title: 'VELA Deploy',
    body: '차량 소프트웨어를 단계적으로 배포하는 운영 콘솔 가이드',
    tags: ['운영자', '절차', '레퍼런스'],
  },
  {
    to: '/work/sensor/intro',
    title: 'VELA Sense',
    body: '라이다·카메라 센서 킷 장착과 캘리브레이션 절차',
    tags: ['현장 엔지니어', '안전 경고', 'PDF'],
  },
];

function ExperienceStrip() {
  return (
    <Link className={styles.healthStrip} to="/experience">
      <div>
        <p className={styles.healthLabel}>아래 문서는 가상 제품으로 만든 것입니다</p>
        <p className={styles.healthNumbers}>
          실무에서는 같은 구조의 문서 세트를 0에서 1로 만들고, 그 문서를 만드는 도구를
          직접 개발했습니다
        </p>
      </div>
      <span className={styles.healthCta}>실무 경험 →</span>
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

        <ExperienceStrip />

        <p className={styles.sectionLabel}>
          대표 작업 — 하나의 제품군, 네 종류의 독자
        </p>
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
      </main>
    </Layout>
  );
}
