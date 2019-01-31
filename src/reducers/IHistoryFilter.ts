import {
  IStateFrame,
} from '../state/IStateFrame';

export interface IHistoryFilter {
  (state: IStateFrame): boolean;
}