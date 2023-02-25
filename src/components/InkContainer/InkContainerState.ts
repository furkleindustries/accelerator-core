import {
  InkModule,
} from './InkModule';
import type {
  ReactNode,
} from 'react';
import type {
  Story,
} from 'inkjs/engine/Story';

export interface InkContainerState {
  readonly content: readonly ReactNode[];
  readonly currentChoices: readonly ReactNode[];
  readonly inkModule: InkModule | null;
  readonly selectedDelayingChoice: number;
  readonly story: Story | null;
}
