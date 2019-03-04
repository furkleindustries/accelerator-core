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
  IRenderingContainerDispatchProps,
} from './IRenderingContainerDispatchProps';
import {
  IRenderingContainerStateProps,
} from './IRenderingContainerStateProps';
import {
  IState,
} from '../../state/IState';
import {
  PassagePluginsWrapperConnected,
} from '../PassagePluginsWrapper/PassagePluginsWrapper';
import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  SkipToContentLink,
} from '../SkipToContentLink/SkipToContentLink';

import * as React from 'react';

import styles from './RenderingContainer.scss';

const {
  Consumer: PassagesMapAndStartPassageNameConsumer,
} = getPassagesMapAndStartPassageNameContext();
const { Consumer: PluginsConsumer } = getPluginsContext();

export class RenderingContainer extends React.PureComponent<IRenderingContainerStateProps & IRenderingContainerDispatchProps> {
  public render() {
    const { storyRequiresFullRerender } = this.props;

    return (
      <>
        <SkipToContentLink />

        <PassagesMapAndStartPassageNameConsumer>
          {({ passagesMap }) => (
            <PluginsConsumer>
              {({ plugins }) => (
                /**
                 * This is very evil! But right now it's the only way I've
                 * found that is guaranteed to work, so evil it is. This and
                 * the logic in componentDidUpdate forces an unmount of
                 * everything in the story, then immediately resets the
                 * storyRequiresFullRerender prop and rerenders the whole
                 * passage tree.
                 */
                storyRequiresFullRerender ?
                  null :
                  <div className={`${styles.renderingContainer} renderingContainer`}>
                    <PassagePluginsWrapperConnected
                      passagesMap={passagesMap}
                      plugins={plugins}
                    >
                      <PassageContainerConnected
                        passagesMap={passagesMap}
                        plugins={plugins}
                      />
                    </PassagePluginsWrapperConnected>
                  </div>
              )}
            </PluginsConsumer>
          )}
        </PassagesMapAndStartPassageNameConsumer>
      </>
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

export const mapStateToProps: MapStateToProps<IRenderingContainerStateProps, {}, IState> = ({
  storyRequiresFullRerender,
}) => ({ storyRequiresFullRerender });

export const mapDispatchToProps: MapDispatchToProps<IRenderingContainerDispatchProps, IRenderingContainerStateProps> = (dispatch) => ({
  resetStoryRequiresFullRerender() {
    return dispatch(createStoryRequiresFullRerenderAction(false));
  },
});

export const RenderingContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderingContainer);
