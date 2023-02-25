import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  AriaAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

export interface ISectionOwnProps extends
  AriaAttributes,
  Omit<HTMLAttributes<HTMLElement>, 'className'>,
  IClassNameable
{
  readonly children: ReactNode;
}
