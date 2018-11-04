import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerDispatchProps {
  dispatch: Dispatch<IAction>;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(): void;
}
