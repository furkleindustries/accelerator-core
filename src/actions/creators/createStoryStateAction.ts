import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateAction,
} from '../IStoryStateAction';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';

/* The Partial type on the state doesn't actually change anything, as
 * IStoryState is a very simple type, but it indicates the purpose: the value
 * argument is an object to be merged into the storyState object, not a
 * replacement. */
export function createStoryStateAction(value: Partial<IStoryStateInstance>): IStoryStateAction {
  return Object.freeze({
    value,
    type: ActionTypes.StoryState,
  }) as IStoryStateAction;
}
