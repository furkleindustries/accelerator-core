import {
  ActionTypes,
} from './ActionTypes';
import {
  IAction,
} from './IAction';

export interface IMidrenderSignalAction extends IAction {
  readonly type: ActionTypes.MidrenderSignal;
}
