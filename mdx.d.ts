import {
  MDXComponent as MDXComponentAlias,
} from './src/typeAliases/MDXComponent';

declare const MDXComponent: MDXComponentAlias;

declare module '*.mdx' {
  export default MDXComponent;
}
