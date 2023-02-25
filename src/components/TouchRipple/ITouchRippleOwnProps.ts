import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import type {
  TouchRippleProps,
} from '@material-ui/core/ButtonBase/TouchRipple';

export interface ITouchRippleOwnProps extends
  IClassNameable,
  Omit<TouchRippleProps, 'className'>
{
  readonly duration?: number;
}