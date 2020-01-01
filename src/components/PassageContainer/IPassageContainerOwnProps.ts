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
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps';
import {
  Dispatch,
} from 'redux';

export interface IPassageContainerOwnProps extends IPassageContentContainerOwnProps {
  readonly dispatch: Dispatch<IAction>;
  readonly footers: MaybeReadonlyArray<IFooter>;
  readonly headers: MaybeReadonlyArray<IHeader>;
}
