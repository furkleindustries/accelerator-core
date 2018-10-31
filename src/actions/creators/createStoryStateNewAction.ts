import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateNewAction,
} from '../IStoryStateNewAction';

/* The Partial type on the state doesn't actually change anything, as
 * IStoryState is a very simple type, but it indicates the purpose: the value
 * argument is an object to be merged into the storyState object, not a
 * replacement. */
export const createStoryStateNewAction = (): IStoryStateNewAction => (
  Object.freeze({
    type: ActionTypes.StoryStateNew,
  }) as IStoryStateNewAction
);

export default createStoryStateNewAction;
