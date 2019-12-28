import {
  ActionTypes,
} from '../ActionTypes';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassageNavigationAction,
} from '../IPassageNavigationAction';
import {
  Tag,
} from '../../tags/Tag';

export const createPassageNavigationAction = (
  passage: IPassage,
  linkTags: Tag[] | ReadonlyArray<Tag> = [],
): IPassageNavigationAction => Object.freeze({
  type: ActionTypes.PassageNavigation,
  value: {
    linkTags,
    passage,
  },
});
