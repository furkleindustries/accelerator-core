import {
  IAcceleratorConfigAware,
} from '../../interfaces/IAcceleratorConfigAware';
import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  ISoundManagerAware,
} from '../../interfaces/ISoundManagerAware';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface IPassageRendererWrapperOwnProps
  extends INoChildren,
    IAcceleratorConfigAware,
    ISoundManagerAware
{
  readonly passagesMap: IPassagesMap;
  readonly plugins: MaybeReadonlyArray<IPlugin>;
}
