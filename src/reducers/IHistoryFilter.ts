import {
  IStateInstance,
} from '../state/IStateInstance';

export interface IHistoryFilter {
  (state: IStateInstance): boolean;
}