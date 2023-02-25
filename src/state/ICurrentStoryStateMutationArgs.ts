import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from './IState';
import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import type {
  Store,
} from 'redux';
import {
  ITag,
} from '../tags/ITag';

export interface ICurrentStoryStateMutationArgs {
  readonly currentPassageObject: IPassage;
  readonly store: Store<IState>;
  readonly lastLinkTags: readonly ITag[];
  readonly updatedStateProps: Partial<IStoryStateFrame>;
}
