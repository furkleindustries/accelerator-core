import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ReactNode,
} from 'react';

export interface IArticleOwnProps extends IClassNameable {
  readonly children?: ReactNode; 
}
