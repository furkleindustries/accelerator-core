import {
  IAction,
} from '../../actions/IAction';
import {
  IFooter,
} from '../../passages/IFooter';
import {
  IHeader,
} from '../../passages/IHeader';
import {
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps';
import {
  Dispatch,
} from 'redux';

export interface IPassageContainerOwnProps extends IPassageContentContainerOwnProps {
  readonly dispatch: Dispatch<IAction>;
  readonly footers: ReadonlyArray<IFooter>;
  readonly headers: ReadonlyArray<IHeader>;
}
