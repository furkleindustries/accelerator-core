import {
  Checkbox,
} from '@material-ui/core';
import {
  InputOwnProps,
} from './InputOwnProps';

import * as React from 'react';

export const Input: React.FunctionComponent<InputOwnProps> = ({
  children,
  color,
  defaultValue,
  type,
  value,
  ...props
}) => {
  if (type === 'checkbox') {
    return (
      <Checkbox
        {...props}
        color={color as any}
        defaultValue={String(defaultValue)}
      >
        {children}
      </Checkbox>
    );
  }

  return (
    <input
      {...props}
      value={String(value)}
    />
  );
};
