import {
  BuiltInTags,
} from '../../tags/BuiltInTags';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getTag,
} from '../../tags/getTag';
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

export const strings = {
  CANT_RENDER_NORENDER_PASSAGE:
    'A passage with the tag "noRender" was passed to PassageContainer. ' +
    'These passages cannot be rendered and should be used solely for ' +
    'exporting reusable content.',
};

export class PassageContainer extends React.PureComponent<IPassageContainerOwnProps & IPassageContainerDispatchProps> {
  public render() {
    const {
      passage: {
        title,
        contents,
        tags,
      },

      passage,
      storyState,
      dispatch,
      setStoryState,
    } = this.props;

    if (Array.isArray(tags) && getTag(tags, BuiltInTags.NoRender)) {
      throw new Error(strings.CANT_RENDER_NORENDER_PASSAGE);
    }

    const ownProps = {
      passage,
      passageObject: passage,
      dispatch,
      storyState,
      setStoryState,
    };

    const child = (() => {
      if (React.isValidElement(contents)) {
        /* Do not pass any props to plain elements. */ 
        return contents;
      } else {
        /* Do pass props to components. */
        return React.createElement(contents as any, ownProps);
      }
    })();

    return (
      <div className="passageContainer">
        {title ? <h1>{title}</h1> : null}

        {child}
      </div>
    )
  }
}

export const mapDispatchToProps: MapDispatchToProps<IPassageContainerDispatchProps, IPassageContainerOwnProps> = (reduxDispatch: Dispatch<IAction>, ownProps) => ({
  dispatch(action) {
    return reduxDispatch(action);
  },

  setStoryState(newState) {
    const {
      storyState,
    } = ownProps;

    const action = createStoryStateAction(Object.assign({}, storyState, newState));
    return reduxDispatch(action);
  },
})

export const PassageContainerConnected = connect(null, mapDispatchToProps)(PassageContainer);

export default PassageContainerConnected;
