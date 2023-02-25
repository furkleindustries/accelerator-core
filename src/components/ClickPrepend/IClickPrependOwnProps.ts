import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  ReactNode,
} from 'react';

export interface IClickPrependOwnProps extends IClassNameable {
  readonly toPrepend: ReactNode;
}
