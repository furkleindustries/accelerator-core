import {
  ILoadingScreenOwnProps,
} from './ILoadingScreenOwnProps';
import {
  ILoadingScreenStateProps,
} from './ILoadingScreenStateProps';
import {
  connect,
  MapStateToProps,
} from 'react-redux';

import * as React from 'react';

export class LoadingScreen extends React.PureComponent {

}

export const mapStateToProps: MapStateToProps<
  ILoadingScreenStateProps,
  ILoadingScreenOwnProps,
  number
> = (progressTicks) => ({ progressTicks });

export const ConnectedLoadingScreen = connect(mapStateToProps)(LoadingScreen);
