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

export const GetStateUnconnected: React.FC<
  IGetStateOwnProps &
    IGetStatePropsForState &
    IGetStateDispatchProps
> = ({
  children,
  lastPassageName,
  storyState,
  setStoryState,
}) => (
  <>
    {children(
      storyState,
      { setStoryState: setStoryState.bind(null, lastPassageName) },
    )}
  </>
);

export const mapStateToProps: MapStateToProps<
  IGetStatePropsForState,
  IGetStateOwnProps,
  IState
> = ({
  history: {
    past,
    present: { storyState },
  },
}) => ({
  storyState,
  lastPassageName: (past[past.length - 1] || {}).passageName || '',
});

export const mapDispatchToProps: MapDispatchToProps<
  IGetStateDispatchProps,
  IGetStateOwnProps
> = (dispatch) => ({
  setStoryState: (lastPassageName, updatedStoryState) => {
    dispatch(
      createStoryStateAction(updatedStoryState, lastPassageName),
    );
  },
});

export const GetState = connect(mapStateToProps, mapDispatchToProps)(GetStateUnconnected);
