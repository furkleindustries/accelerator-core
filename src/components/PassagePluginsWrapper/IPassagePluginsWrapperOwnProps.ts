import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IPassagePluginsWrapperOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
}
