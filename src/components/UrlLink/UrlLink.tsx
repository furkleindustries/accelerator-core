import classNames from 'classnames';
import {
  IUrlLinkOwnProps,
} from './IUrlLinkOwnProps';
import MuiLink from '@material-ui/core/Link';

import * as React from 'react';

import styles from './index.less';

export const UrlLink: React.FunctionComponent<IUrlLinkOwnProps> = ({
  children,
  className,
  ...props
}) => (
  <MuiLink
    {...props}
    className={classNames(
      styles.urlLink,
      'urlLink',
      className,
    )}
  >{
    children
  }</MuiLink>
);
