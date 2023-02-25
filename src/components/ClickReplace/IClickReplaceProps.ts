import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  ReactNode,
} from 'react';

export interface IClickReplaceOwnProps extends IClassNameable  {
  readonly children: ReactNode;
  readonly replaceWith: ReactNode;
}
