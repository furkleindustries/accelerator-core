import {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import {
  ReactNoOutput,
} from '../../typeAliases/ReactNoOutput';

export interface ICircularProgressOwnProps extends CircularProgressProps {
  readonly children?: ReactNoOutput;
}
