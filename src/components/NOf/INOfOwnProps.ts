import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface INOfOwnProps {
  readonly children: MaybeReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly n: number;
  readonly shuffle?: boolean;
}
