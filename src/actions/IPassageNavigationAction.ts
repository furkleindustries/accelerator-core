import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';
import {
  IPassage,
} from '../passages/IPassage';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageNavigationAction extends IAction {
  readonly type: ActionTypes.PassageNavigation;
  readonly value: {
    passage: IPassage;
    tags?: Tag[];
  };
}
