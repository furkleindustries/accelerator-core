import {
  ButtonProps,
} from '@material-ui/core/Button';
import {
  ReactNode,
} from 'react';

export interface IButtonProps extends ButtonProps {
  readonly children: ReactNode;
  readonly className?: string;
}
