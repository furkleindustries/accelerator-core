import {
  createStoryRequiresFullRerenderAction,
} from '../../actions/creators/createStoryRequiresFullRerenderAction';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
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
  PassagePluginsWrapperConnected,
} from '../PassagePluginsWrapper/PassagePluginsWrapper';
import {
  PassageRendererWrapper,
} from '../PassageRendererWrapper/PassageRendererWrapper';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';

import * as React from 'react';

import styles from './PassageContainer.scss';

const {
  Consumer: PassagesMapAndStartPassageNameConsumer,
} = getPassagesMapAndStartPassageNameContext();
const { Consumer: PluginsConsumer } = getPluginsContext();

export class PassageContainer extends React.PureComponent<IPassageContainerStateProps & IPassageContainerDispatchProps> {
  public render() {
    const { storyRequiresFullRerender } = this.props;

    return (
      <PassagesMapAndStartPassageNameConsumer>
        {({ passagesMap }) => (
          <PluginsConsumer>
            {({ plugins }) => (
              /* This is very evil! But right now it's the only way I've found
               * that is guaranteed to work, so evil it is. If it's not clear,
               * this and the logic in componentDidUpdate forces an unmount of
               * everything in the story, then immediately resets the
               * storyRequiresFullRerender prop and rerenders the whole passage
               * tree. */
              storyRequiresFullRerender ?
                null :
                <div className={`${styles.passageContainer} passageContainer`}>
                  <PassagePluginsWrapperConnected
                    passagesMap={passagesMap}
                    plugins={plugins}
                  >
                    <PassageRendererWrapper />
                  </PassagePluginsWrapperConnected>
                </div>
            )}
          </PluginsConsumer>
        )}
      </PassagesMapAndStartPassageNameConsumer>
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

export const mapStateToProps: MapStateToProps<IPassageContainerStateProps, {}, IState> = ({
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
