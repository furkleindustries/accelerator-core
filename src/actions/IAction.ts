import {
  Action,
} from 'redux';
import {
  IValued,
} from '../interfaces/IValued';

export interface IAction extends
  Action,
  Partial<IValued>
{
  readonly type: string;
}
