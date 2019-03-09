import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IClickDisappearOwnProps extends IClassNameable {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly fadeOutDuration?: number;
}
