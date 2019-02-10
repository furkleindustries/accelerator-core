import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';

export interface ICyclingLinkInternalOwnProps {
  readonly children: string[];
  readonly className?: string;
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
  readonly variableToSet?: string;
  callback?(current?: string): void;
}
