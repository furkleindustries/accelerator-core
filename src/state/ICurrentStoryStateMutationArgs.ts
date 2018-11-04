import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from '../reducers/IState';
import {
  IStoryStateInstance,
} from './IStoryStateInstance';
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
  updatedStateProps: Partial<IStoryStateInstance>;
}

export default ICurrentStoryStateMutationArgs;
