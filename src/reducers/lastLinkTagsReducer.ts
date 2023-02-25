import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  IStoryResetAction,
} from '../actions/IStoryResetAction';
import {
  IStoryStateLoadAction,
} from '../actions/IStoryStateLoadAction';

export const lastLinkTagsReducer = (
  previousState = [],
  action: IPassageNavigationAction |
    IStoryResetAction |
    IStoryStateLoadAction,
): ILastLinkTagsAware['lastLinkTags'] => {
  let ret: ILastLinkTagsAware['lastLinkTags'];
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
    ret = [];
  } else if (action.type === ActionTypes.StoryStateLoad) {
    ret = action.value.engineHistory.present.lastLinkTags;
  } else {
    ret = [ ...previousState ];
  }

  return Object.freeze(ret);
};
