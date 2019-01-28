import {
  IAction,
} from '../../actions/IAction';
import {
  IHistoryFilter,
} from '../../reducers/IHistoryFilter';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerDispatchProps {
  dispatch: Dispatch<IAction>;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(): void;
  rewind(filter: IHistoryFilter): void;
}
