import classNames from 'classnames';
import {
  IUrlLinkOwnProps,
} from './IUrlLinkOwnProps';
import MuiLink from '@material-ui/core/Link';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const UrlLink: React.FC<IUrlLinkOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiLink
    {...props}

    className={classNames(
      builtIns['url-link'],
      'url-link',
      className,
    )}
  >
    {children}
  </MuiLink>
);
