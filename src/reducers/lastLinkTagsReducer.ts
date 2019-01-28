import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  Tag,
} from '../tags/Tag';

export function lastLinkTagsReducer(
  previousState: Tag[] = [],
  action: IPassageNavigationAction | IStoryResetAction,
)
{
  if (action.type === ActionTypes.PassageNavigation) {
    return action.value.tags || [];
  } else if (action.type === ActionTypes.StoryReset) {
    return [];
  }

  return previousState;
}
