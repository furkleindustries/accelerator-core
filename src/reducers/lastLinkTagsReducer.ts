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
  ITag,
} from '../tags/ITag';

const deflt: ReadonlyArray<ITag> = Object.freeze([ BuiltInTags.Start ]);
export const lastLinkTagsReducer = (
  previousState: ReadonlyArray<ITag> = deflt,
  action: IPassageNavigationAction | IStoryResetAction,
): ReadonlyArray<ITag> => {
  let ret;
  if (action.type === ActionTypes.PassageNavigation) {
    ret = (action.value.tags || []).map((tag) => (
      typeof tag === 'string' ?
        {
          key: tag,
          value: true,
        } :
        tag
    ));
  } else if (action.type === ActionTypes.StoryReset) {
    ret = [ ...deflt ];
  } else {
    ret = previousState;
  }

  return Object.freeze(ret);
};
