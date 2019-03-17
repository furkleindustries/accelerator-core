import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  Tag,
} from '../tags/Tag';

const deflt = Object.freeze([ BuiltInTags.Start ]);
export function lastLinkTagsReducer(
  previousState: ReadonlyArray<Tag> = [ ...deflt ],
  action: IPassageNavigationAction | IStoryResetAction,
)
{
  if (action.type === ActionTypes.PassageNavigation) {
    return action.value.tags || [];
  } else if (action.type === ActionTypes.StoryReset) {
    return [ ...deflt ];
  }

  return previousState;
}
