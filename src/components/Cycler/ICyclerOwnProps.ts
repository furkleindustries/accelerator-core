import {
  ReactChild,
} from 'react';

export interface ICyclerOwnProps {
  className?: string;
  notifyOfChange?: (current: ReactChild, index: number) => void;
}

export default ICyclerOwnProps;
