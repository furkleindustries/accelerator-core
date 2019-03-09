import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNode,
} from 'react';

export interface IClickPrependOwnProps extends IClassNameable {
  readonly toPrepend: ReactNode;
}
