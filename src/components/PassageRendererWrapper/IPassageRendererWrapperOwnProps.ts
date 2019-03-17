import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  ReactNoOutput,
} from '../../typeAliases/ReactNoOutput';

export interface IPassageRendererWrapperOwnProps {
  readonly passagesMap: IPassagesMap;
  readonly plugins: ReadonlyArray<IPlugin>;
  readonly children?: ReactNoOutput;
}
