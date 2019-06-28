import {
  ListDefinition,
} from 'inkjs/engine/ListDefinition';
import {
  Story,
} from 'inkjs/engine/Story';
import {
  RefObject,
} from 'react';

export interface InkContainerOwnProps {
  readonly storyContent: Record<string, any> & { root: Record<string, any> };
  readonly className?: string;
  readonly doneCallback?: (story: Story) => void;
  readonly inputVariables?: Record<string, any>;
  readonly listDefinitions?: Record<string, string | number>;
  readonly observerCallback?: (variableName: string, value: any) => void;
  readonly ref?: RefObject<HTMLDivElement>;
  readonly variablesToObserve?: string[];
}
