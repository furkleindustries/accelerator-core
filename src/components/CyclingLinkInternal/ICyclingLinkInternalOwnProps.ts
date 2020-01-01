import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface ICyclingLinkInternalOwnProps extends IClassNameable {
  readonly children: MaybeReadonlyArray<string>;
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly passagesMap: IPassagesMap;
  readonly plugins: MaybeReadonlyArray<IPlugin>;
  readonly variableToSet?: string;
  readonly callback?: (current?: string) => void;
}
