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

export function createPassageNavigationAction(passage: IPassage, tags?: Tag[]): IPassageNavigationAction {
  return Object.freeze({
    type: ActionTypes.PassageNavigation,
    value: {
      passage,
      ...(tags ? { tags } : {}),
    },
  }) as IPassageNavigationAction;
}
