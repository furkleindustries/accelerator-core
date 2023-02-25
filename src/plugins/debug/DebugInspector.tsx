import {
  AppContextConsumerWrapper,
} from '../../components/AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  DebugNodeRenderer,
} from './DebugNodeRenderer';
import {
  DebugObjectInspector,
} from '../../components/DebugObjectInspector';
import {
  IDebugInspectorOwnProps,
} from './IDebugInspectorOwnProps';
import {
  IDebugInspectorStateProps,
} from './IDebugInspectorStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  sortSoundManagerState,
} from './sortSoundManagerState';
import {
  sortStoryState,
} from './sortStoryState';

import * as React from 'react';

import styles from '../../../plugins/debug/index.less';

export class DebugInspectorUnconnected extends React.PureComponent<
  IDebugInspectorOwnProps &
    IDebugInspectorStateProps
> {
  public readonly render = () => {
    const {
      className,
      reduxState: {
        autoplayerState,
        currentSaveUuid,
        history: {
          present: {
            passageName,
            passageTimeCounter,
            storyEnded,
            storyState: unsortedStoryState,
          },
        },

        passageReady,
        soundManagerState: unsortedSoundManagerState,
        soundsLoaded,
        storyLoaded,
        storyStateSavePointers,
      },
    } = this.props;

    const storyState = sortStoryState(unsortedStoryState);
    
    const soundManagerState = sortSoundManagerState(unsortedSoundManagerState);

    return (
      <AppContextConsumerWrapper>
        {({
          config: { debugOptions },
        }) => {
          return (
            <DebugObjectInspector
              data={{
                passageName,
                passageTimeCounter,
                currentSaveUuid,
                passageReady,
                storyLoaded,
                storyEnded,
                storyState,
                storyStateSavePointers,
                soundsLoaded,
                soundManagerState,
                autoplayerState,
                debugOptions,
              }}

              className={classNames(
                styles['debug-inspector'],
                'debug-inspector',
                className,
              )}

              expandPaths={[
                '$',
                '$.soundManagerState',
                '$.soundManagerState.groups',
                '$.soundManagerState.sounds',
                '$.storyStateSavePointers',
                '$.storyStateSavePointers.Autosave',
                '$.storyState',
                '$.debugOptions',
              ]}

              nodeRenderer={DebugNodeRenderer}
            />
          );
        }}
      </AppContextConsumerWrapper>
    );
  };
}

export const mapStateToProps: MapStateToProps<
  IDebugInspectorStateProps,
  IDebugInspectorOwnProps,
  IState
> = (state) => ({ reduxState: state });

export const DebugInspector = connect(
  mapStateToProps,
)(DebugInspectorUnconnected);
