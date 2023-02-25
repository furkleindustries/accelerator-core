import {
  createStoryEndAction,
} from '../../actions/creators/createStoryEndAction';
import {
  IEndDispatchProps,
} from './IEndDispatchProps';
import {
  INoChildren,
} from '../../interfaces/INoChildren';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';

import * as React from 'react';

export const EndUnconnected: React.FC<
  INoChildren &
    IEndDispatchProps
> = ({ dispatch }) => (
  <>
    {dispatch(createStoryEndAction())}
  </>
);

const mapDispatchToProps: MapDispatchToProps<
  IEndDispatchProps,
  INoChildren
> =  (dispatch) => ({ dispatch });

export const End = connect(null, mapDispatchToProps)(EndUnconnected);
