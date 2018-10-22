import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

export interface IStoryStateAction {
  type: ActionTypes.StoryStateNew |
        ActionTypes.StoryStateUpdate |
        ActionTypes.StoryRewind;
  index?: number;
  value?: IStoryStateInstance;
}

export default IStoryStateAction;
