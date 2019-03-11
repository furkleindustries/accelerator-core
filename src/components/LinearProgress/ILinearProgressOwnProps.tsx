import {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress';
import {
  ReactNoOutput,
} from '../../typeAliases/ReactNoOutput';

export interface ILinearProgressOwnProps extends LinearProgressProps {
  readonly children?: ReactNoOutput;
}
