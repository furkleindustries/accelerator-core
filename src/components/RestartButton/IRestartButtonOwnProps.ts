import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ReactNode,
} from 'react';

export interface IRestartButtonOwnProps extends IButtonProps {
  children: ReactNode;
  className?: string;
}
