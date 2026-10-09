import MDXComponents from '@theme-original/MDXComponents';
import Cta from '@site/src/components/Cta';
import CtaRow from '@site/src/components/CtaRow';
import Skills from '@site/src/components/Skills';
import ProjectList from '@site/src/components/ProjectList';
import ProjectRow from '@site/src/components/ProjectRow';
import Figure from '@site/src/components/Figure';

// 여기 등록한 컴포넌트는 모든 .md 파일에서 import 없이 바로 쓸 수 있습니다.
export default {
  ...MDXComponents,
  // 마크다운의 ![설명](주소) 를 전부 Figure 로 보냅니다.
  img: Figure,
  Cta,
  CtaRow,
  Skills,
  ProjectList,
  ProjectRow,
};
