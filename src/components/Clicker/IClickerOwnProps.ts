import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  ReactNode,
} from 'react';

export interface IClickerOwnProps extends IClassNameable {
  readonly children: ReactNode;
  readonly contentAfterClick: ReactNode;
  readonly onClick?: () => void; 
}
