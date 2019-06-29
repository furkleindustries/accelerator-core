import {
  ComponentType,
  RefObject,
} from 'react';
import {
  StoryWithDoneEvent,
} from '../../../lib/inkjs/StoryWithDoneEvent';

export interface InkContainerOwnProps {
  readonly storyContent: Record<string, any> & { root: Record<string, any> };
  readonly bindings?: Record<string, any>;
  readonly className?: string;
  readonly components?: Record<string, ComponentType[]>;
  readonly doneCallback?: (story: StoryWithDoneEvent) => void;
  readonly inputVariables?: Record<string, any>;
  readonly listDefinitions?: Record<string, string | number>;
  readonly mergeComponents?: boolean;
  readonly observerCallback?: (variableName: string, value: any) => void;
  readonly ref?: RefObject<HTMLDivElement>;
  readonly variablesToObserve?: string[];
}
