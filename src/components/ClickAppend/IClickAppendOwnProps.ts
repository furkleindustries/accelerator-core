import {
  ReactNode,
} from 'react';

export interface IClickAppendOwnProps {
  children: ReactNode;
  className?: string;
  toAppend: ReactNode;
}
