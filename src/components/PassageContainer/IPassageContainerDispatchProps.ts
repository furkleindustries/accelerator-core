import {
  IAction,
} from '../../actions/IAction';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContainerDispatchProps {
  dispatch: Dispatch<IAction>;
  navigateTo(passageName: string, tags?: Tag[]): void;
}

export default IPassageContainerDispatchProps;
