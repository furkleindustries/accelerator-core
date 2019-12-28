import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  createStoryRequiresFullRerenderAction,
} from '../../actions/creators/createStoryRequiresFullRerenderAction';
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
  PassagePluginsWrapper,
} from '../PassagePluginsWrapper';
import {
  PassageRendererWrapperConnected,
} from '../PassageRendererWrapper';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  SkipToContentLink,
} from '../SkipToContentLink/SkipToContentLink';

import * as React from 'react';

import styles from './index.less';

export class RenderingContainer extends React.PureComponent<IRenderingContainerStateProps & IRenderingContainerDispatchProps> {
  public render = () => {
    const { storyRequiresFullRerender } = this.props;

    return (
      <>
        {/**
          * The first item in the tab ordering (and natural document flow)
          * should be the accessibility link used to skip to the newest passage
          * content.
          */}
        <SkipToContentLink />

        <AppContextConsumerWrapper>
          {({
            passagesMap,
            plugins,
            store,
          }) => (
            /**
             * This is very evil! But right now it's the only way I've
             * found that is guaranteed to work, so evil it is. This
             * and the logic in componentDidUpdate force an unmount of
             * everything in the story, immediately rerendering the
             * whole passage tree and resetting the
             * storyRequiresFullRerender prop.
             */
            storyRequiresFullRerender ?
              null :
              <div className={classNames(
                styles.renderingContainer,
                'renderingContainer',
              )}>
                <PassagePluginsWrapper
                  passagesMap={passagesMap}
                  plugins={plugins}
                  reduxStore={store}
                >
                  <PassageRendererWrapperConnected
                    passagesMap={passagesMap}
                    plugins={plugins}
                  />
                </PassagePluginsWrapper>
              </div>
          )}
        </AppContextConsumerWrapper>
      </>
    );
  };

  public componentDidUpdate = () => {
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
  };
}

export const mapStateToProps: MapStateToProps<IRenderingContainerStateProps, {}, IState> = ({
  storyRequiresFullRerender,
}) => ({ storyRequiresFullRerender });

export const mapDispatchToProps: MapDispatchToProps<IRenderingContainerDispatchProps, IRenderingContainerStateProps> = (dispatch) => ({
  resetStoryRequiresFullRerender: () => (
    dispatch(createStoryRequiresFullRerenderAction(false))
  ),
});

export const RenderingContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderingContainer);
