import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';
import {
  IPassage,
} from '../passages/IPassage';

export interface ICurrentPassageAction extends IAction {
  readonly type: ActionTypes.CurrentPassage;
  readonly value: IPassage;
}
