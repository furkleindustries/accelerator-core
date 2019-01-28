import {
  IStateInstance,
} from './IStateInstance';

export interface IHistory {
  past: IStateInstance[];
  present: IStateInstance;
  future: IStateInstance[];
}
