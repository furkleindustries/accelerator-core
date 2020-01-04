import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICombinationOwnProps extends IClassNameable {
  readonly children: MaybeReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly pick?: number;
}
