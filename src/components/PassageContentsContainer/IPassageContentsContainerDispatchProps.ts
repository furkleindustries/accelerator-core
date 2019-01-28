import {
  IAction,
} from '../../actions/IAction';
import {
  IPassageNavigationAction,
} from '../../actions/IPassageNavigationAction';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerDispatchProps {
  dispatch: Dispatch<IAction>;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): IPassageNavigationAction;
  restart(): void;
}
