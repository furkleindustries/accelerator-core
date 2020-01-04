import {
  HistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  IButtonProps,
} from '../Button/IButtonProps';

export interface IRewindButtonOwnProps extends IButtonProps {
  readonly filter?: HistoryFilter;
}
