import {
  ReactNode,
} from 'react';

export interface IClickerOwnProps {
  children: ReactNode;
  className?: string;
  contentAfterClick: ReactNode;
}
