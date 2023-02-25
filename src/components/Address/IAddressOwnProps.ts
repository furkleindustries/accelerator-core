import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IAddressOwnProps extends IClassNameable {
  readonly from: ReactNodeWithoutNullOrUndefined;
  readonly to: ReactNodeWithoutNullOrUndefined;
  readonly at?: ReactNodeWithoutNullOrUndefined;
  readonly title?: ReactNodeWithoutNullOrUndefined;
}
