import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface IDelayOwnProps extends IClassNameable {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly timeout: number;
  readonly renderWithZeroOpacity?: boolean;
}
