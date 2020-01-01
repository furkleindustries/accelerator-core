import {
  MDXComponent,
} from '../../typeAliases/MDXComponent';

export interface InkModule {
  readonly storyContent: Record<string, any> & { root: Record<string, any> };
  readonly text: string;
  readonly getMdxComponent: (id: string) => MDXComponent;
  readonly mdxAliases?: Record<string, MDXComponent>;
}
