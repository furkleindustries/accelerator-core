import classNames from 'classnames';
import {
  IChipOwnProps,
} from './IChipOwnProps';
import MuiChip from '@material-ui/core/Chip';

import * as React from 'react';

import styles from './index.less';

export const Chip: React.FunctionComponent<IChipOwnProps> = ({
  className,
  ...props
}) => (
  <MuiChip
    {...props}
    className={classNames(
      styles.chip,
      'chip',
      className,
    )}
  />
);
