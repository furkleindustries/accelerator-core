import {
  ReactNode,
} from 'react';

export interface ICyclerOwnProps {
  className?: string;
  notifyOfChange?: (current: ReactNode, index: number) => void;
}

export default ICyclerOwnProps;
