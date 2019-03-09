import {
  Chip,
} from '../Chip/Chip';
import {
  IBreadcrumbOwnProps,
} from './IBreadcrumbOwnProps';

import * as React from 'react';

export const Breadcrumb: React.FunctionComponent<IBreadcrumbOwnProps> = ({
  crumb: {
    logo,
    logoAlt,
    title,
  },

  ...props
}) => (
  <Chip {...props}>
    {logo ? <img src={logo} alt={logoAlt} /> : null}
    {title}
  </Chip>
);
