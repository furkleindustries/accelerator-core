import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  ReactNode,
} from 'react';

export interface IPassagePluginsWrapperOwnProps {
  readonly children: ReactNode;
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
}
