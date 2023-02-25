import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  CSSProperties,
} from 'react';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface ISwipeableOwnProps extends IClassNameable {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly style?: CSSProperties;
}
