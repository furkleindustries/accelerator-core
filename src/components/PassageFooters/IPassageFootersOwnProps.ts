import {
  IFooter,
} from '../../passages/IFooter';
import {
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface IPassageFootersOwnProps
  extends IPassageContentContainerOwnProps
{
  readonly footers: MaybeReadonlyArray<IFooter>;
}
