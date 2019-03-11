import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface ICyclingLinkOwnProps extends IClassNameable {
  readonly children: ReadonlyArray<string>;
  readonly dontCallbackOnMount?: boolean;
  readonly dontSetVariableOnMount?: boolean;
  readonly variableToSet?: string;
  callback?(current?: string): void;
}
