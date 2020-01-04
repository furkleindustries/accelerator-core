import {
  IHeader,
} from '../../passages/IHeader'
import {
  IPassageContentContainerOwnProps,
} from '../PassageContentContainer/IPassageContentContainerOwnProps'
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray'

export interface IPassageHeadersOwnProps
  extends IPassageContentContainerOwnProps
{
  readonly headers: MaybeReadonlyArray<IHeader>;
}
