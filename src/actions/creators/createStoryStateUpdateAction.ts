import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateUpdateAction,
} from '../IStoryStateUpdateAction';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';

/* The Partial type on the state doesn't actually change anything, as
 * IStoryState is a very simple type, but it indicates the purpose: the value
 * argument is an object to be merged into the storyState object, not a
 * replacement. */
export const createStoryStateUpdateAction = (value: Partial<IStoryStateInstance>): IStoryStateUpdateAction => (
  Object.freeze({
    value,
    type: ActionTypes.StoryStateUpdate,
  }) as IStoryStateUpdateAction
);
