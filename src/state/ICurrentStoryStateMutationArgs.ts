import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from './IState';
import {
  IStoryStateFrame,
} from './IStoryStateFrame';
import {
  Store,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export interface ICurrentStoryStateMutationArgs {
  currentPassageObject: IPassage;
  store: Store<IState>;
  lastLinkTags: Tag[];
  updatedStateProps: Partial<IStoryStateFrame>;
}
