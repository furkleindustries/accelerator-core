import classNames from 'classnames';
import {
  IChipOwnProps,
} from './IChipOwnProps';
import MuiChip from '@material-ui/core/Chip';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Chip: React.FC<IChipOwnProps> = ({
  className,
  ...props
}) => (
  <MuiChip
    {...props}

    className={classNames(
      builtIns['chip'],
      'chip',
      className,
    )}
  />
);
