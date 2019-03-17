import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IFadeOutOwnProps extends IClassNameable {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly duration: number;
}
