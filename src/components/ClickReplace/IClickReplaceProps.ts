import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNode,
} from 'react';

export interface IClickReplaceOwnProps extends IClassNameable  {
  readonly children: ReactNode;
  readonly replaceWith: ReactNode;
}
