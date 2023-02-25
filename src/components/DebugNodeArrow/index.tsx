import classNames from 'classnames';
import {
  IDebugNodeArrowOwnProps,
} from './IDebugNodeArrowOwnProps';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../plugins/debug/index.less';

export const DebugNodeArrow: React.FC<IDebugNodeArrowOwnProps> = ({
  className,
  expanded,
  glyphCollapsed,
  glyphExpanded,
}) => (
  <Typography
    className={classNames(
      styles['debug-node-arrow'],
      'debug-node-arrow',
      className,
      { expanded },
    )}

    component="span"
    role="presentation"
    variant="body2"
  >
    {expanded ?
      glyphExpanded || '▼' :
      glyphCollapsed || '▶'}
  </Typography>
);
