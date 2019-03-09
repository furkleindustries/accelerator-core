import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNode,
} from 'react';

export interface IClickerOwnProps extends IClassNameable {
  readonly children: ReactNode;
  readonly contentAfterClick: ReactNode;
}
