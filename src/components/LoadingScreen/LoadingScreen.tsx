import classnames from 'classnames';
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

import builtInStyles from '../../../passages/_global-styles/built-ins.scss';

export const LoadingScreen: React.FunctionComponent<
  ILoadingScreenOwnProps & ILoadingScreenStateProps
> = ({
  bodyText,
  descriptions,
  ticks,
  title,
}) => (
  <article className={classnames('loadingScreen', builtInStyles.loadingScreen)}>
    <h2
      className={classnames(
        'loadingScreenTitle',
        builtInStyles.loadingScreenTitle,
      )}
    >
      {title}
    </h2>

    <p
      className={classnames(
        'loadingScreenBodyText',
        builtInStyles.loadingScreenBodyText,
      )}
    >
      {bodyText || 'The story is loading. Thank you for your patience.'}
    </p>

    <p
      className={classnames(
        'loadingScreenDescription',
        builtInStyles.loadingScreenDescription,
      )}
    >
      {Array.isArray(descriptions) && descriptions[ticks] ?
        descriptions[ticks] :
        ''}
    </p>
  </article>
);
