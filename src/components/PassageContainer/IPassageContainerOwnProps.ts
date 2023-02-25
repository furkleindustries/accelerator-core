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
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps';
import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface IPassageContainerOwnProps
  extends
    IDispatchAware,
    IPassageProps,
    IPassageContentContainerOwnProps
{
  readonly footers: MaybeReadonlyArray<IFooter>;
  readonly headers: MaybeReadonlyArray<IHeader>;
}
