import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export interface IStoryStateUpdateAction {
  readonly type: ActionTypes.StoryStateUpdate;
  readonly value: Partial<IStoryStateInstance>;
}

export default IStoryStateUpdateAction;
