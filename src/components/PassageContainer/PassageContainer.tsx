import {
  createStoryRequiresFullRerenderAction,
} from '../../actions/creators/createStoryRequiresFullRerenderAction';
import {
  IPassageContainerDispatchProps,
} from './IPassageContainerDispatchProps';
import {
  IPassageContainerStateProps,
} from './IPassageContainerStateProps';
import {
  IState,
} from '../../state/IState';
import {
  PassageContentsContainerConnected,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  PassageFootersConnected,
} from '../PassageFooters/PassageFooters';
import {
  PassageHeadersConnected,
} from '../PassageHeaders/PassageHeaders';
import {
  PassagePluginsWrapperConnected,
} from '../PassagePluginsWrapper/PassagePluginsWrapper';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';

import * as React from 'react';

import styles from './PassageContainer.scss';

export class PassageContainer extends React.PureComponent<IPassageContainerStateProps & IPassageContainerDispatchProps> {
  public render() {
    const {
      storyRequiresFullRerender,
    } = this.props;

    return (
      /* This is very evil! But right now it's the only way I've found that is
       * guaranteed to work, so evil it is. If it's not clear, this and the
       * logic in componentDidUpdate forces an unmount of everything in the
       * story, then immediately resets the storyRequiresFullRerender prop and
       * rerenders the whole passage tree. */
      storyRequiresFullRerender ?
        null :
        <div className={`${styles.passageContainer} passageContainer`}>
          <PassagePluginsWrapperConnected>
            <PassageHeadersConnected />

            <PassageContentsContainerConnected />

            <PassageFootersConnected />
          </PassagePluginsWrapperConnected>
        </div>
    );
  }

  public componentDidUpdate() {
    /* This is also a very, very evil way of doing this and I should endeavor
     * to find a safer way of accomplishing it rather than changing state in a
     * rendering lifecycle method. */
    const {
     resetStoryRequiresFullRerender,
     storyRequiresFullRerender,
    } = this.props;

    if (storyRequiresFullRerender) {
      /* Reset the value of the property to false immediately. This logic
       * causes two full walks of the component tree, but I don't think anyone
       * expects or requires restarting the entire story to be
       * super-high-efficiency. */
      resetStoryRequiresFullRerender();
    }
  }
}

export const mapStateToProps: MapStateToProps<IPassageContainerStateProps, null, IState> = ({
  storyRequiresFullRerender,
}) => ({ storyRequiresFullRerender });

export const mapDispatchToProps: MapDispatchToProps<IPassageContainerDispatchProps, IPassageContainerStateProps> = (dispatch) => ({
  resetStoryRequiresFullRerender() {
    return dispatch(createStoryRequiresFullRerenderAction(false));
  },
});

export const PassageContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PassageContainer);
