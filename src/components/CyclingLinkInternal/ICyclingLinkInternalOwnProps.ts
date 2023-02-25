import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IPassagesMapAware,
} from '../../interfaces/IPassagesMapAware';
import {
  IPluginsAware,
} from '../../interfaces/IPluginsAware';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface ICyclingLinkInternalOwnProps
  extends
    IClassNameable,
    IPassagesMapAware,
    IPluginsAware,
    ISoundManagerAware
{
  readonly children: MaybeReadonlyArray<string>;
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly variableToSet?: string;
  readonly callback?: (current?: string) => void;
}
