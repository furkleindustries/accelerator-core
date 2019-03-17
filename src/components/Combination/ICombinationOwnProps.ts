import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ICombinationOwnProps extends IClassNameable {
  readonly children: ReadonlyArray<ReactNodeWithoutNullOrUndefined>;
  readonly pick?: number;
}
