import {
  RefObject,
} from 'react';
import {
  MDXComponent,
} from '../../typeAliases/MDXComponent';
import {
  Story,
} from '../../../lib/ink/inkjs/src/Story';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';

export interface InkContainerOwnProps {
  readonly inkModule: {
    storyContent: Record<string, any> & { root: Record<string, any> };
    text: string;
    getMdxComponent: (id: string) => MDXComponent;
    mdxAliases?: Record<string, MDXComponent>;
  };

  readonly className?: string;
  readonly doneCallback?: (story: StoryWithDoneEvent) => void;
  readonly inputVariables?: Record<string, any>;
  readonly listDefinitions?: Record<string, string | number>;
  readonly dontMergeComponents?: boolean;
  readonly observerCallback?: Story.VariableObserver;
  readonly ref?: RefObject<HTMLDivElement>;
  readonly variablesToObserve?: string[];
}
