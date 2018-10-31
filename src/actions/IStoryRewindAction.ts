import {
  ActionTypes,
} from './ActionTypes';

export interface IStoryRewindAction {
  type: ActionTypes.StoryRewind;
  value: number;
}

export default IStoryRewindAction;
