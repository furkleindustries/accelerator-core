import classNames from 'classnames';
import {
  ISaveViewLastModifiedTimestampOwnProps,
} from './ISaveViewLastModifiedTimestampOwnProps';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export const SaveViewLastModifiedTimestamp: React.FC<ISaveViewLastModifiedTimestampOwnProps> = ({
  className,
  lastModified,
}) => ( 
  <div
    className={classNames(
      styles['save-view-details-last-modified-container'],
      'save-view-details-last-modified-container',
      className,
    )}

    role="group"
  >
    <Typography
      className={classNames(
        styles['save-view-details-last-modified-label'],
        'save-view-details-last-modified-label',
      )}

      variant="h6"
    >
      Last modified
    </Typography>

    <Typography
      className={classNames(
        styles['save-view-details-last-modified-content'],
        'save-view-details-last-modified-content',
      )}
    >
      <time>{new Date(lastModified).toUTCString()}</time>
    </Typography>
  </div>
);
