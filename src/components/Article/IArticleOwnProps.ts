import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  AriaAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

export interface IArticleOwnProps
  extends
    IClassNameable,
    AriaAttributes,
    Omit<HTMLAttributes<HTMLElement>, 'className'>
{
  readonly children?: ReactNode; 
}
