import {
  InkLineObject,
} from '../InkSection/InkLineObject';
import {
  InkModule,
} from './InkModule';
import {
  InkMutatorObject,
} from '../../ink-mutators/InkMutatorObject';
import type {
  Story,
} from 'inkjs/engine/Story';

export interface IMutateInkContentArgs {
  readonly components: Record<string, any>;
  readonly inkModule: InkModule;
  readonly lines: readonly InkLineObject[];
  readonly mutatorObjects: readonly InkMutatorObject[];
  readonly story: Story;
}
