import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  IGetStateDispatchProps,
} from './IGetStateDispatchProps';
import {
  IGetStatePropsForState,
} from './IGetStatePropsForState';
import {
  IGetStateOwnProps,
} from './IGetStateOwnProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapStateToProps,
  MapDispatchToProps,
} from 'react-redux';

import * as React from 'react';

export const GetStateUnconnected: React.FunctionComponent<
  IGetStateOwnProps & IGetStatePropsForState & IGetStateDispatchProps
> = ({
  children,
  storyState,
  setStoryState,
}) => <>{children(storyState, { setStoryState })}</>;

export const mapStateToProps: MapStateToProps<
  IGetStatePropsForState,
  IGetStateOwnProps,
  IState
> = ({
  history: {
    present: { storyState },
  },
}) => ({ storyState });

export const mapDispatchToProps: MapDispatchToProps<
  IGetStateDispatchProps,
  IGetStateOwnProps
> = (dispatch) => ({
  setStoryState: (updatedStoryState) => {
    dispatch(createStoryStateAction(updatedStoryState));
  },
});

export const GetState = connect(mapStateToProps, mapDispatchToProps)(GetStateUnconnected);
