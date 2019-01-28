import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ILastLinkTagsAction,
} from '../actions/ILastLinkTagsAction';
import {
  Tag,
} from '../tags/Tag';

export function lastLinkTagsReducer(
  previousState: Tag[] = [],
  action: ILastLinkTagsAction,
)
{
  if (action.type === ActionTypes.LastLinkTags) {
    return action.value;
  }

  return previousState;
}
