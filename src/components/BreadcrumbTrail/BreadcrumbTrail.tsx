import {
  Breadcrumb,
} from '../Breadcrumb/Breadcrumb';
import {
  IBreadcrumbTrailOwnProps,
} from './IBreadcrumbTrailOwnProps';

import * as React from 'react';

export const BreadcrumbTrail: React.FunctionComponent<IBreadcrumbTrailOwnProps> = ({ trail }) => (
  <>
    {trail.map((crumb, key) => (
      <Breadcrumb
        crumb={crumb}
        key={key}
      />
    ))}
  </>
);
