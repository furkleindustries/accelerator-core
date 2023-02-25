import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryEndAction,
} from '../IStoryEndAction';

export const createStoryEndAction = (): IStoryEndAction => ({
  type: ActionTypes.StoryEnd,
  value: null,
});
