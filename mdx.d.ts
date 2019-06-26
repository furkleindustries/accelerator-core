import {
  MDXComponent,
} from './src/typeAliases/MDXComponent';

declare module '*.mdx' {
  const MDXComponent: MDXComponent;
  export default MDXComponent;
}
