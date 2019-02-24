import {
  ChipProps,
} from '@material-ui/core/Chip';
import {
  ReactNode,
} from 'react';

export interface IChipOwnProps extends ChipProps {
  readonly children: ReactNode;
}
