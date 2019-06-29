import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export type ISectionOwnProps =
  ReactNodeWithoutNullOrUndefined &
  IClassNameable;
