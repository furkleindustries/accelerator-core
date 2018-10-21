import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryState,
} from '../../state/IStoryState';
import {
  IStoryStateAction,
} from '../IStoryStateAction';

/* The Partial type doesn't actually change anything, as IStoryState is a very
 * simple type, but it indicates the purpose: the value argument is an object
 * to be merged into the storyState object, not a replacement. */
export const createStoryStateAction = (value: Partial<IStoryState>): IStoryStateAction => ({
  type: ActionTypes.StoryState,
  value,
});

export default createStoryStateAction;
