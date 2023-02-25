import classNames from 'classnames';
import {
  default as MuiInput,
  InputProps,
} from '@material-ui/core/Input';
import {
  InputOwnProps,
} from './InputOwnProps';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Input: React.FC<InputOwnProps> = ({
  className,
  ...props
}) => (
  <MuiInput
    {...props as InputProps}
    className={classNames(
      builtIns['input'],
      'input',
      className,
    )}
  />
);
