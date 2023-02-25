import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateAction,
} from '../IStoryStateAction';
import {
  IStoryStateFrame,
} from '../../state/IStoryStateFrame';

/* The Partial type on the state doesn't actually change anything, as
 * IStoryState is a very simple type, but it indicates the purpose: the value
 * argument is an object to be merged into the storyState object, not a
 * replacement. */
export const createStoryStateAction = (
  value: Partial<IStoryStateFrame>,
  lastPassageName: string,
): IStoryStateAction =>  Object.freeze({
  value,
  type: ActionTypes.StoryState,
  lastPassageName,
});
