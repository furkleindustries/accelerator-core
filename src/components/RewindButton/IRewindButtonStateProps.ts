import {
  IHistoryAware,
} from '../../interfaces/IHistoryAware';
import {
  IHistory,
} from '../../state/IHistory';

export interface IRewindButtonStateProps extends IHistoryAware {
  readonly canRewind: boolean;
  readonly history: IHistory;
}
