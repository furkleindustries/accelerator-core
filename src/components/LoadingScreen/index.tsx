import classNames from 'classnames';
import {
  ILoadingScreenOwnProps,
} from './ILoadingScreenOwnProps';
import {
  ILoadingScreenStateProps,
} from './ILoadingScreenStateProps';
/*import {
  CircularProgress,
  LinearProgress,
} from '@material-ui/core';*/

import * as React from 'react';

import builtInStyles from '../../../passages/_global-styles/built-ins.less';

export const LoadingScreen: React.FunctionComponent<
  ILoadingScreenOwnProps & ILoadingScreenStateProps
> = ({
  bodyText,
  descriptions,
  ticks,
  title,
}) => (
  <article className={classNames(builtInStyles.loadingScreen, 'loadingScreen')}>
    <h2
      className={classNames(
        builtInStyles.loadingScreenTitle,
        'loadingScreenTitle',
      )}
    >
      {title}
    </h2>

    <p
      className={classNames(
        builtInStyles.loadingScreenBodyText,
        'loadingScreenBodyText',
      )}
    >
      {bodyText || 'The story is loading. Thank you for your patience.'}
    </p>

    <p
      className={classNames(
        builtInStyles.loadingScreenDescription,
        'loadingScreenDescription',
      )}
    >
      {Array.isArray(descriptions) && descriptions[ticks] ?
        descriptions[ticks] :
        ''}
    </p>
  </article>
);
