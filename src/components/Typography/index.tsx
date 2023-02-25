import classNames from 'classnames';
import {
  ITypographyProps,
} from './ITypographyProps';
import {
  default as MuiTypography,
} from '@material-ui/core/Typography';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Typography: React.FC<ITypographyProps> = ({
  children,
  className,
  paragraph,
  variant,
  ...props
}) => (
  <MuiTypography
    {...props}

    className={classNames(
      builtIns['typography'],
      'typography',
      className,
    )}

    paragraph={paragraph || props.component === 'p'}
    variant={variant || 'body1'}
  >
    {children}
  </MuiTypography>
);
