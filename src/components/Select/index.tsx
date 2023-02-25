import classNames from 'classnames';
import {
  default as MuiSelect,
  SelectProps,
} from '@material-ui/core/Select';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Select: React.FC<SelectProps> = ({
  children,
  className,
  defaultValue,
  ...props
}) => (
  <MuiSelect
    {...props}

    className={classNames(
      'select',
      builtIns.select,
      className,
    )}

    defaultValue={defaultValue}
  >
    {children}
  </MuiSelect>
);
