import {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import {
  ReactNode,
} from 'react';

export interface ILinearProgressOwnProps extends LinearProgressProps {
  readonly children: ReactNode;
  readonly className?: string;
}
