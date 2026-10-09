import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useSidebarBreadcrumbs,
  useDocsSidebar,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import styles from '@docusaurus/theme-classic/lib/theme/DocBreadcrumbs/styles.module.css';

// 문서 위쪽의 경로 표시(브레드크럼)입니다. Docusaurus 기본 것을 가져와
// 한 가지만 고쳤습니다. 가운데 묶음 이름을 눌러도 이동하게 만듭니다.
//
// 사이드바의 묶음에는 link 를 두지 않았습니다(sidebars.js 참고).
// 그래서 기본 상태로는 묶음 이름이 링크가 아니라 그냥 글자라, 눌러도
// 아무 일이 없었습니다. 링크처럼 생겼는데 안 눌리면 고장으로 보입니다.
//
// 어디로 보낼지는 묶음의 성격에 따라 다릅니다.
//
//   VELA Vehicle API 같은 문서 세트 → 그 세트의 설계 노트 (.../intro)
//   '그 밖의 경력' 같은 묶음        → 그 탭의 개요 페이지
//
// 묶음을 첫 자식으로 보내면 안 됩니다. '그 밖의 경력'을 눌렀는데 DBMS
// 매뉴얼이 열리면, 독자는 왜 거기로 갔는지 알 수 없습니다.
const isEntryDoc = (href) => typeof href === 'string' && href.endsWith('/intro');

function BreadcrumbsItemLink({ children, href, isLast }) {
  const className = 'breadcrumbs__link';
  if (isLast || !href) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  );
}

function BreadcrumbsItem({ children, active }) {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
    </li>
  );
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const sidebar = useDocsSidebar();

  if (!breadcrumbs) {
    return null;
  }

  // 사이드바의 첫 항목이 그 탭의 개요입니다. 설계 노트가 없는 묶음은 여기로 보냅니다.
  const overviewHref = sidebar?.items?.length
    ? findFirstSidebarItemLink(sidebar.items[0])
    : undefined;

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}
      >
        <ul className="breadcrumbs">
          {homePageRoute && <HomeBreadcrumbItem />}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            let href = item.href;
            if (!href && item.type === 'category') {
              const first = findFirstSidebarItemLink(item);
              href = isEntryDoc(first) ? first : overviewHref;
            }
            // 비공개 문서를 가리키는 묶음은 링크하지 않습니다.
            if (item.type === 'category' && item.linkUnlisted) {
              href = undefined;
            }
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
