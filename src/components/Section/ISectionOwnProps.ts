import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export type ISectionOwnProps =
  { children: ReactNodeWithoutNullOrUndefined } &
  IClassNameable;
