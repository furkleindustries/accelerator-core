import {
  CardProps,
} from '@material-ui/core/Card';
import {
  ReactNode,
} from 'react';

export interface ICardOwnProps extends CardProps {
  readonly children: ReactNode;
  readonly className?: string;
}
