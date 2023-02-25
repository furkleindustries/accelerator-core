import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryLoadedAction,
} from '../IStoryLoadedAction';

export const createStoryLoadedAction = (value: boolean): IStoryLoadedAction => Object.freeze({
  type: ActionTypes.StoryLoaded,
  value,
});
