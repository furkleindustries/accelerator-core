import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ReactNode,
} from 'react';

export interface ICyclerOwnProps extends IButtonProps {
  children: ReactNode[];
  callback?(current: ReactNode, index?: number): void;
}
