import {
  ChipProps,
} from '@material-ui/core/Chip';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IChipOwnProps extends ChipProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
}
