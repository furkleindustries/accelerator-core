import {
  InkLineObject,
} from '../components/InkSection/InkLineObject';
import {
  InkModule,
} from '../components/InkContainer/InkModule';
import {
  ReactNode,
} from 'react';
import {
  StoryWithDoneEvent,
} from '../../lib/ink/StoryWithDoneEvent';

export interface InkMutatorProps {
  readonly currentNode: ReactNode;
  readonly inkModule: InkModule;
  readonly story: StoryWithDoneEvent;
  readonly lines: readonly InkLineObject[];
}
