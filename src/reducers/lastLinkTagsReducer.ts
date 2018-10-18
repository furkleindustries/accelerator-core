import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ILastLinkTagsAction,
} from '../actions/ILastLinkTagsAction';
import {
  Tag,
} from '../tags/Tag';

export const lastLinkTagsReducer = (previousState: Tag[] = [], action: ILastLinkTagsAction) => {
  if (action.type === ActionTypes.LastLinkTags && action.value && Array.isArray(action.value)) {
    return action.value;
  }

  return previousState;
};

export default lastLinkTagsReducer;
