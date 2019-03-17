import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IFadeInOwnProps extends IClassNameable {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly duration: number;
}
