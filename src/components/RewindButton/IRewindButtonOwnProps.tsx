import {
  ReactNode,
} from 'react';
import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';

export interface IRewindButtonOwnProps {
  children: ReactNode;
  className?: string;
  filter?: HistoryFilter;
}
