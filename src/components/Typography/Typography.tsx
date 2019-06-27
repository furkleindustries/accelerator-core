import classnames from 'classnames';
import {
  ITypographyOwnProps,
} from './ITypographyOwnProps';
import MuiTypography from '@material-ui/core/Typography';

import * as React from 'react';

import styles from './Typography.less';

export const Typography: React.FunctionComponent<ITypographyOwnProps> = (props) => (
  <MuiTypography
    component={'span'}
    {...props}
    className={classnames(
      'typography',
      styles.typography,
      props.className,
    )}
  />
);
