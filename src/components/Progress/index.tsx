import {
  CircularProgress,
} from '../CircularProgress';
import {
  ICircularProgressOwnProps,
} from '../CircularProgress/ICircularProgressOwnProps';
import {
  ILinearProgressOwnProps,
} from '../LinearProgress/ILinearProgressOwnProps';
import {
  LinearProgress,
} from '../LinearProgress';

import * as React from 'react';

export const Progress = ({
  orientation,
  ...props
}: (ICircularProgressOwnProps | ILinearProgressOwnProps) & { orientation?: 'circular' | 'linear' }) => (
  orientation === 'circular' ?
    <CircularProgress {...props as ICircularProgressOwnProps} /> :
    <LinearProgress {...props as ILinearProgressOwnProps} />
);
