import {
  InkModule,
} from './InkModule';
import {
  InkMutatorObject,
} from '../../mutators/InkMutatorObject';
import {
  RefObject,
} from 'react';
import {
  Story,
} from '../../../lib/ink/inkjs/src/Story';
import {
  StoryWithDoneEvent,
} from '../../../lib/ink/StoryWithDoneEvent';

export interface InkContainerOwnProps {
  readonly inkModule: InkModule;
  readonly className?: string;
  readonly doneCallback?: (story: StoryWithDoneEvent) => void;
  readonly listDefinitions?: Record<string, string | number>;
  readonly dontMergeComponents?: boolean;
  readonly mutatorObjects?: InkMutatorObject[];
  readonly observerCallback?: Story.VariableObserver;
  readonly ref?: RefObject<HTMLDivElement>;
}
