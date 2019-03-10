import {
  ChipProps,
} from '@material-ui/core/Chip';
import {
  ReactNoOutput,
} from '../../typeAliases/ReactNoOutput';

export interface IChipOwnProps extends ChipProps {
  readonly children?: ReactNoOutput;
}
