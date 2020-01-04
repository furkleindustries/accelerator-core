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
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  Tag,
} from '../../tags/Tag';
import { getStructuredTags } from '../../tags/getStructuredTags';

export const createPassageNavigationAction = (
  passage: IPassage,
  linkTags: MaybeReadonlyArray<Tag> = Object.freeze([]),
): IPassageNavigationAction => Object.freeze({
  type: ActionTypes.PassageNavigation,
  value: {
    linkTags: getStructuredTags(linkTags),
    passage,
  },
});
