import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';

const deflt: ILastLinkTagsAware['lastLinkTags'] = Object.freeze([ BuiltInTags.Start ]);
export const lastLinkTagsReducer = (
  previousState: ILastLinkTagsAware['lastLinkTags'] = deflt,
  action: IPassageNavigationAction | IStoryResetAction,
): ILastLinkTagsAware['lastLinkTags'] => {
  let ret;
  if (action.type === ActionTypes.PassageNavigation) {
    ret = (action.value.linkTags || []).map((tag) => (
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
