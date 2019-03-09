import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';

export interface ICyclingLinkInternalOwnProps extends IClassNameable {
  readonly children: string[];
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
  readonly variableToSet?: string;
  callback?(current?: string): void;
}
