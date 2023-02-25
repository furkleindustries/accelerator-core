import classNames from 'classnames';
import {
  ISaveViewHeaderOwnProps,
} from './ISaveViewHeaderOwnProps';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export const SaveViewHeader: React.FC<ISaveViewHeaderOwnProps> = ({
  entry: { saveName },
}) => (
  <div
    className={classNames(
      styles['save-view-header'],
      'save-view-header',
    )}

    role="group"
  >
    <Typography
      className={classNames(
        styles['save-view-title'],
        'save-view-title',
      )}

      variant="h5"
    >
      {saveName}
    </Typography>
  </div>
);
