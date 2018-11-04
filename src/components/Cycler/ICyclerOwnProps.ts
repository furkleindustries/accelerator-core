import {
  ReactNode,
  ReactNodeArray,
} from 'react';

export interface ICyclerOwnProps {
  children: ReactNodeArray;
  className?: string;
  notifyOfChange?: (current: ReactNode, index?: number) => void;
}
