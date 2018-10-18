import {
  Action,
} from 'redux';

export interface IAction extends Action {
  type: string;
  value: any;
}

export default IAction;
