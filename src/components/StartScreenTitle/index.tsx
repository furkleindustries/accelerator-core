import { AppContextConsumerWrapper } from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const StartScreenTitle: React.FC = () => (
  <AppContextConsumerWrapper>
    {({
      config: {
        storyMetadata: { title },
      },
    }) => (
      <Typography
        className={classNames(
          builtIns['start-screen-title'],
          'start-screen-title',
        )}

        variant="h1"
      >
        {title}
      </Typography>
    )}
  </AppContextConsumerWrapper>
);
