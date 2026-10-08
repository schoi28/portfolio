import MDXComponents from '@theme-original/MDXComponents';
import Cta from '@site/src/components/Cta';
import CtaRow from '@site/src/components/CtaRow';
import Intro from '@site/src/components/Intro';
import Skills from '@site/src/components/Skills';
import Panel from '@site/src/components/Panel';
import Carousel from '@site/src/components/Carousel';
import Grid from '@site/src/components/Grid';

// 여기에 등록한 컴포넌트는 모든 .md / .mdx 파일에서 import 없이 바로 쓸 수 있습니다.
export default {
  ...MDXComponents,
  Cta,
  CtaRow,
  Intro,
  Skills,
  Panel,
  Carousel,
  Grid,
};
