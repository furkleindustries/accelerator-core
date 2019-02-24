import {
  classNameSafeAppend,
} from '../../functions/classNameSafeAppend';
import {
  IUrlLinkOwnProps,
} from './IUrlLinkOwnProps';
import MuiLink from '@material-ui/core/Link';

import * as React from 'react';

import styles from './UrlLink.scss';

export const UrlLink: React.FunctionComponent<IUrlLinkOwnProps> = (props) => (
  <MuiLink {...{
    ...props,
    className: classNameSafeAppend(
      props.className,
      `${styles.urlLink} urlLink`,
    ),
  }} />
);
