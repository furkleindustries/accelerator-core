import {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import {
  ReactNode,
} from 'react';

export interface ICircularProgressOwnProps extends CircularProgressProps {
  readonly children: ReactNode;
  readonly className?: string;
}
