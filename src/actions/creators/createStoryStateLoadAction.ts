import {
  ActionTypes,
} from '../ActionTypes';
import {
  IStoryStateLoadAction,
} from '../IStoryStateLoadAction';
import {
  IStorySerialization,
} from '../../state/IStorySerialization';

export const createStoryStateLoadAction = (
  value: IStorySerialization,
): IStoryStateLoadAction => Object.freeze({
  type: ActionTypes.StoryStateLoad,
  value,
});
