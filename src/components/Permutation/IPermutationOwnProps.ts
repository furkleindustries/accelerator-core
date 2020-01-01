import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IPermutationOwnProps {
  readonly children: MaybeReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly pick?: number;
}
