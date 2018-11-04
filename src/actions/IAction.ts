import {
  Action,
} from 'redux';

export interface IAction extends Action {
  readonly type: string;
  readonly value?: any;
}

export default IAction;
