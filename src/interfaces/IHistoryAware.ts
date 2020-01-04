import {
  IHistory,
} from '../state/IHistory';

export interface IHistoryAware {
  readonly history: IHistory;
}
