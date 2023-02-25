import {
  IDebugObjectLabelOwnProps,
} from './IDebugObjectLabelOwnProps';
import {
  DebugObjectName,
} from '../DebugObjectName';
import {
  DebugObjectValue,
} from '../DebugObjectValue';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

export const DebugObjectLabel: React.FC<IDebugObjectLabelOwnProps> = ({
  data,
  depth,
  isNonenumerable = false,
  nodeName,
  path,
}) => (
  <Typography
    component="span"
    role="contentinfo"
    variant="body2"
  >
    <DebugObjectName
      depth={depth}
      dimmed={isNonenumerable}
      nodeName={nodeName}
    />

    <DebugObjectValue
      data={data}
      path={path}
    />
  </Typography>
);
