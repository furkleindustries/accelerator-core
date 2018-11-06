import {
  ReactNode,
} from 'react';

export interface IDelayOwnProps {
  children: ReactNode;
  className?: string;
  renderWithZeroOpacity?: boolean;
  timeout: number;
}
