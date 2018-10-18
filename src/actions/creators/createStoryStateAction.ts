import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryState,
} from '../../state/IStoryState';
import {
  IStoryStateAction,
} from '../IStoryStateAction';

export const createStoryStateAction = (value: IStoryState): IStoryStateAction => ({
  type: ActionTypes.StoryState,
  value,
});

export default createStoryStateAction;
