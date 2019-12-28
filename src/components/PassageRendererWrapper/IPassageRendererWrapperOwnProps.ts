import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';

export interface IPassageRendererWrapperOwnProps extends INoChildren {
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[] | ReadonlyArray<IPlugin>;
}
