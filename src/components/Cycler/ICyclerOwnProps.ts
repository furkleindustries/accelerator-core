import {
  ReactNode,
} from 'react';

export interface ICyclerOwnProps {
  children: ReactNode[];
  className?: string;
  callback?(current: ReactNode, index?: number): void;
}
