import classnames from 'classnames';
import {
  IUrlLinkOwnProps,
} from './IUrlLinkOwnProps';
import MuiLink from '@material-ui/core/Link';

import * as React from 'react';

import styles from './UrlLink.scss';

export const UrlLink: React.FunctionComponent<IUrlLinkOwnProps> = (props) => (
  <MuiLink {...{
    ...props,
    className: classnames(
      'urlLink',
      styles.urlLink,
      props.className,
    ),
  }} />
);
