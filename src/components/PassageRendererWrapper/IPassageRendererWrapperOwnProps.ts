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
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';

export interface IPassageRendererWrapperOwnProps extends INoChildren {
  readonly passagesMap: IPassagesMap;
  readonly plugins: MaybeReadonlyArray<IPlugin>;
}
