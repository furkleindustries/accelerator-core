import classNames from 'classnames';
import {
  ITypographyOwnProps,
} from './ITypographyOwnProps';
import MuiTypography from '@material-ui/core/Typography';

import * as React from 'react';

import styles from './index.less';

export const Typography: React.FunctionComponent<ITypographyOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiTypography
    component="span"
    {...props}
    className={classNames(
      styles.typography,
      'typography',
      className,
    )}
  >{
    children
  }</MuiTypography>
);
