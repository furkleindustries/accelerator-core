import {
  IButtonProps,
} from './IButtonProps';
import {
  Button as MuiButton,
} from '@material-ui/core';

import * as React from 'react';

export const Button: React.FunctionComponent<IButtonProps> = (props) => (
  <MuiButton {...props} />
);
