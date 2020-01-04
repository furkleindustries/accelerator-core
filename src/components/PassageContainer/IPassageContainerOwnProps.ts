import {
  IDispatchAware,
} from '../../interfaces/IDispatchAware';
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

export interface IPassageContainerOwnProps
  extends
    IDispatchAware,
    IPassageContentContainerOwnProps
{
  readonly footers: MaybeReadonlyArray<IFooter>;
  readonly headers: MaybeReadonlyArray<IHeader>;
}
