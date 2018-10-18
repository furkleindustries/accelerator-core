import {
  ActionTypes,
} from './ActionTypes';
import {
  IStoryState,
} from '../state/IStoryState';

export interface IStoryStateAction {
  type: ActionTypes.StoryState;
  value: IStoryState;
}

export default IStoryStateAction;
