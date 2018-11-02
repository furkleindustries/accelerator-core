import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from '../reducers/IState';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';
import {
  IStoryStateUpdateAction,
} from '../actions/IStoryStateUpdateAction';
import {
  Store,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export interface IPluginMethodArgs {
  currentPassageObject: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Readonly<Tag[]>;
  setStoryState(newState: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
  store: Store<IState>;
}

export default IPluginMethodArgs;
