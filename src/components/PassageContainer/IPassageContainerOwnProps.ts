import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';

export interface IPassageContainerOwnProps {
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
  readonly children?: never[] | undefined;
}
