import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  configurationDefaults,
} from '../../configuration/configurationDefaults';
import {
  createStoryStateSaveAction,
} from '../../actions/creators/createStoryStateSaveAction';
import {
  Input,
} from '../Input';
import {
  IState,
} from '../../state/IState';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  IStoryStateSaveLoadViewDispatchProps,
} from './IStoryStateSaveLoadViewDispatchProps';
import {
  IStoryStateSaveLoadViewOwnProps,
} from './IStoryStateSaveLoadViewOwnProps';
import {
  IStoryStateSaveLoadViewState,
} from './IStoryStateSaveLoadViewState';
import {
  IStoryStateSaveLoadViewStateProps,
} from './IStoryStateSaveLoadViewStateProps';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  pushToSaveRegistry,
} from '../../../plugins/save-manager/pushToSaveRegistry';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import type {
  Store,
} from 'redux';
import {
  SaveView,
} from '../SaveView';
import {
  Typography,
} from '../Typography';
import {
  v4,
} from 'uuid';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export class StoryStateSaveLoadViewUnconnected extends React.PureComponent<
  IStoryStateSaveLoadViewOwnProps &
    IStoryStateSaveLoadViewStateProps &
    IStoryStateSaveLoadViewDispatchProps,
  IStoryStateSaveLoadViewState
> {
  public readonly state: IStoryStateSaveLoadViewState = {
    newSaveName: '',
  };

  public readonly render = () => {
    const {
      className,
      currentPassageName,
      currentSaveUuid,
      storyStateSavePointers,
    } = this.props;

    const { newSaveName } = this.state;

    return (
      <AppContextConsumerWrapper>
        {({
          config: {
            historyFramesToSerialize,
            startPassageName: menuStartPassageName,
          },

          store,
        }) => {
          const makeNewSaveFunc = () => this.makeNewSave(store, historyFramesToSerialize);
          const setNewSaveNameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ newSaveName: e.currentTarget.value });
          };

          return (
            <div
              className={classNames(
                styles['story-state-save-load-view'],
                'story-state-save-load-view',
                className,
              )}

              role="group"
            >
              <List
                className={classNames(
                  styles['story-state-save-load-view-list'],
                  'story-state-save-load-view-list',
                )}
              >
                <ListItem
                  className={classNames(
                    styles['story-state-save-load-view-list-item'],
                    'story-state-save-load-view-list-item',
                  )}

                  key="new-save"
                >
                  <div
                    className={classNames(
                      styles['story-state-save-load-view-save-content'],
                      'story-state-save-load-view-save-content',
                      { disabled: currentPassageName === menuStartPassageName },
                    )}

                    role="group"
                  >
                    <Typography
                      className={classNames(
                        styles['story-state-save-load-view-new-save-label'],
                        'story-state-save-load-view-new-save-label',
                      )}

                      component="label"
                      htmlFor="new-save-input"
                      id="new-save-label"
                    >
                      Create new save
                    </Typography>

                    <Input
                      className={classNames(
                        styles['story-state-save-load-view-new-save-input'],
                        'story-state-save-load-view-new-save-input',
                      )}

                      disabled={currentPassageName === menuStartPassageName}
                      id="new-save-input"
                      onChange={setNewSaveNameFunc}
                      placeholder="New save name"
                      required={true}
                      title="New save"
                      value={newSaveName}
                    />

                    <Button
                      className={classNames(
                        styles['story-state-save-load-view-new-save-button'],
                        'story-state-save-load-view-new-save-button',
                      )}

                      disabled={!newSaveName || currentPassageName === menuStartPassageName}
                      onClick={makeNewSaveFunc}
                    >
                      New save
                    </Button>
                  </div>
                </ListItem>

                {Object.values(storyStateSavePointers).sort((aa, bb) => {
                  if (aa.lastModified > bb.lastModified) {
                    return -1;
                  } else if (aa.lastModified < bb.lastModified) {
                    return 1;
                  }

                  return 0;
                }).map((entry) => (
                  <ListItem
                    className={classNames(
                      styles['story-state-save-load-view-list-item'],
                      'story-state-save-load-view-list-item',
                      { current: entry.uuid === currentSaveUuid },
                    )}

                    key={entry.uuid}
                    role="treeitem"
                  >
                    <SaveView
                      currentPassageName={currentPassageName}
                      entry={entry}
                      isCurrentSaveFile={entry.uuid === currentSaveUuid}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          );
        }}
      </AppContextConsumerWrapper>
    );
  };

  public readonly makeNewSave = (
    store: Store<IState>,
    numberOfFramesToSave = configurationDefaults.historyFramesToSave,
  ) => {
    const {
      currentPassageName,
      dispatch,
      storyStateSavePointers,
    } = this.props;

    const { newSaveName } = this.state;

    let saveName = newSaveName;
    if (newSaveName && newSaveName in storyStateSavePointers) {
      // Show an error here, or whatever. --VW, 09/20
      return;
    } else if (!saveName) {
      return;
    }

    const lastModified = new Date().getTime();
    const uuid = v4();

    const pointer: IStorySerializationPointer = {
      currentPassageName,
      lastModified,
      saveName,
      uuid,
    };

    pushToSaveRegistry(pointer, store, numberOfFramesToSave);

    dispatch(createStoryStateSaveAction(pointer));

    this.setState({ newSaveName: '' });
  };
}

export const mapStateToProps: MapStateToProps<
  IStoryStateSaveLoadViewStateProps,
  IStoryStateSaveLoadViewOwnProps,
  IState
> = ({
  currentSaveUuid,
  history: {
    present: { passageName: currentPassageName },
  },

  storyStateSavePointers,
}) => ({
  currentPassageName,
  currentSaveUuid,
  storyStateSavePointers,
});

export const mapDispatchToProps: MapDispatchToProps<
  IStoryStateSaveLoadViewDispatchProps,
  IStoryStateSaveLoadViewOwnProps
> = (dispatch) => ({ dispatch });

export const StoryStateSaveLoadView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryStateSaveLoadViewUnconnected)
