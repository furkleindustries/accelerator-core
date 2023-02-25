import classNames from 'classnames';
import {
  IDebugObjectNameOwnProps,
} from './IDebugObjectNameOwnProps';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

export const DebugObjectName: React.FC<IDebugObjectNameOwnProps> = ({
  className,
  delimiterGlyph = ':',
  depth,
  dimmed = false,
  nodeName,
}) => (
  <>
    <Typography
      className={classNames(
        'debug-object-name',
        className,
        { dimmed },
      )}

      component="strong"
      variant={depth ? 'body2' : 'body1'}
    >
      {nodeName}{delimiterGlyph || ':'}&nbsp;
    </Typography>
  </>
);
