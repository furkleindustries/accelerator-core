import {
  IHistory,
} from '../../state/IHistory';

export interface IRewindButtonStateProps {
  readonly canRewind: boolean;
  readonly history: IHistory;
}
