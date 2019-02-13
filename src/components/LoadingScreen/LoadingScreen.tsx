import {
  ILoadingScreenOwnProps,
} from './ILoadingScreenOwnProps';
import {
  ILoadingScreenState,
} from './ILoadingScreenState';
/*import {
  CircularProgress,
  LinearProgress,
} from '@material-ui/core';*/

import * as React from 'react';

import builtInStyles from '../../passages/styles.scss';

export class LoadingScreen extends React.PureComponent<
  ILoadingScreenOwnProps,
  ILoadingScreenState
> {
  public readonly state = {
    description: '',
    ticks: 0,
  };

  public render() {
    const {
      bodyText,
      descriptions,
      title,
    } = this.props;

    const { ticks } = this.state;

    const description = Array.isArray(descriptions) && descriptions[ticks] ?
      descriptions[ticks] :
      '';

    return (
      <article className={`${builtInStyles.loadingScreen} loadingScreen`}>
        <h2
          className={`${builtInStyles.loadingScreenTitle} loadingScreenTitle`}
        >
          {title}
        </h2>

        <p
          className={`${builtInStyles.loadingScreenBodyText} loadingScreenBodyText`}
        >
          {bodyText || 'The story is loading. Thank you for your patience.'}
        </p>

        {
          description ?
            <p
              className={`${builtInStyles.loadingScreenDescription} loadingScreenDescription`}
            >
              {description}
            </p> :
            null
        }
      </article>
    );
  }

  public addTicks(ticks: number) {
    const { ticks: current } = this.state;
    this.setState({ ticks: current + ticks })
  }
}
