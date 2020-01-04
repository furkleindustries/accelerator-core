import {
  IOpenable,
} from '../../interfaces/IOpenable';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface IVisibilityTree extends IOpenable {
  readonly children: MaybeReadonlyArray<IVisibilityTree>;
  readonly visible: boolean;
}
