import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  ITypographyOwnProps,
} from './ITypographyOwnProps';
import MuiTypography from '@material-ui/core/Typography';

import * as React from 'react';

import styles from './Typography.scss';

export const Typography: React.FunctionComponent<ITypographyOwnProps> = (props) => (
  <MuiTypography {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.typography} typography`,
    ),
  }} />
);
