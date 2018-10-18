import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  IAction,
} from '../../actions/IAction';
import {
  IPassageContainerDispatchProps,
} from './IPassageContainerDispatchProps';
import {
  IPassageContainerOwnProps,
} from './IPassageContainerOwnProps';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';

import * as React from 'react';

export class PassageContainer extends React.PureComponent<IPassageContainerOwnProps & IPassageContainerDispatchProps> {
  public render() {
    const {
      passage: {
        title,
        contents,
      },

      passage,
      storyState,
      dispatch,
      setStoryState,
    } = this.props;

    const ownProps = {
      passage,
      dispatch,
      storyState,
      setStoryState,
    };

    return (
      <div className="Passage">
        {title ? <h1>{title}</h1> : null}

        {React.isValidElement(contents) ?
          React.cloneElement(contents, ownProps) :
          React.createElement(contents as any, ownProps)
        }
      </div>
    )
  }
}

export const mapDispatchToProps: MapDispatchToProps<IPassageContainerDispatchProps, IPassageContainerOwnProps> = (reduxDispatch: Dispatch<IAction>, ownProps) => ({
  dispatch(action: IAction) {
    return reduxDispatch(action);
  },

  setStoryState(key: string, value: any) {
    const {
      storyState,
    } = ownProps;

    return reduxDispatch(createStoryStateAction(Object.assign({}, storyState, {
      [key]: value,
    })));
  },
})

export const PassageContainerConnected = connect(null, mapDispatchToProps)(PassageContainer);

export default PassageContainerConnected;
