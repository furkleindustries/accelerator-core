import {
  ActionTypes,
} from '../ActionTypes';
import {
  ILastLinkTagsAware,
} from '../../interfaces/ILastLinkTagsAware';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassageNavigationAction,
} from '../IPassageNavigationAction';

export const createPassageNavigationAction = (
  passage: IPassage,
  linkTags: ILastLinkTagsAware['lastLinkTags'] = Object.freeze([]),
): IPassageNavigationAction => Object.freeze({
  type: ActionTypes.PassageNavigation,
  value: {
    linkTags,
    passage,
  },
});
