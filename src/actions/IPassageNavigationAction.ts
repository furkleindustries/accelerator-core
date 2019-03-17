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
  ITaggable,
} from '../interfaces/ITaggable';

export interface IPassageNavigationAction extends IAction {
  readonly type: ActionTypes.PassageNavigation;
  readonly value: { passage: IPassage } & ITaggable;
}
