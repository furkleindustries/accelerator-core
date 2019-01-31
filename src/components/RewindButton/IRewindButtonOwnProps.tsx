import {
  ReactNode,
} from 'react';
import {
  IHistoryFilter,
} from '../../reducers/IHistoryFilter';

export interface IRewindButtonOwnProps {
  children: ReactNode;
  className?: string;
  filter?: IHistoryFilter;
}
