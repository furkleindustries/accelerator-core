import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export interface IStoryStateUpdateAction {
  type: ActionTypes.StoryStateUpdate;
  value: Partial<IStoryStateInstance>;
}

export default IStoryStateUpdateAction;
