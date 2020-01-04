import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface ICyclingLinkOwnProps extends IClassNameable {
  readonly children: MaybeReadonlyArray<string>;
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly variableToSet?: string;
  readonly callback?: (current?: string) => void;
}
