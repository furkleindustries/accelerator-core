import classNames from 'classnames';
import {
  IAddressOwnProps,
} from './IAddressOwnProps';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../passages/_global-styles/components/index.less';

export const Address: React.FC<IAddressOwnProps> = ({
  className,
  from,
  to,
  at,
  title,
}) => (
  <div
    className={classNames(
      styles.address,
      'address',
      className,
    )}

    role="group"
  >
    <address>{from}</address>
    <address>{to}</address>
    {at ?
      <Typography
        component="em"
        paragraph={true}
        role="group"
      >
        <time>{at}</time>
      </Typography> :
      null}

    {title ?
      <Typography
        component="h6"
        variant="h6"
        paragraph={true}
      >
        {title}
      </Typography> :
      null}
  </div>
);
