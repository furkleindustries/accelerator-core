import {
  ReactChild,
} from 'react';

export interface ICyclerOwnProps {
  className?: string;
  notifyOfChange?: (current: ReactChild) => void;
}

export default ICyclerOwnProps;
