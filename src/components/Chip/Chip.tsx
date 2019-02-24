import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  IChipOwnProps,
} from './IChipOwnProps';
import MuiChip from '@material-ui/core/Chip';

import * as React from 'react';

import styles from './Chip.scss';

export const Chip: React.FunctionComponent<IChipOwnProps> = (props) => (
  <MuiChip {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.chip} chip`,
    ),
  }} />
);
