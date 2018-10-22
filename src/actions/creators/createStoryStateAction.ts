import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateAction,
} from '../IStoryStateAction';
import {
  IStoryStateInstance,
} from '../../state/IStoryStateInstance';

type StoryStateTypes = ActionTypes.StoryStateNew |
                       ActionTypes.StoryStateUpdate |
                       ActionTypes.StoryRewind;

/* The Partial type on the state doesn't actually change anything, as
 * IStoryState is a very simple type, but it indicates the purpose: the value
 * argument is an object to be merged into the storyState object, not a
 * replacement. */
export const createStoryStateAction = (type: StoryStateTypes, value?: Partial<IStoryStateInstance>): IStoryStateAction => {
  const obj: Partial<IStoryStateAction> = {
    type,
  };

  if (typeof value !== 'undefined') {
    obj.value = value;
  }

  return obj as IStoryStateAction;
};

export default createStoryStateAction;
