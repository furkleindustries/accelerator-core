import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  createStoryOptionsDialogVisibleAction,
} from '../../actions/creators/createStoryOptionsDialogVisibleAction';
import {
  configurationDefaults,
} from '../../configuration/configurationDefaults';
import {
  createStoryStateLoadAction,
} from '../../actions/creators/createStoryStateLoadAction';
import {
  createStoryStateSaveAction,
} from '../../actions/creators/createStoryStateSaveAction';
import {
  createStoryStateSaveDeleteAction,
} from '../../actions/creators/createStoryStateSaveDeleteAction';
import {
  deleteFromSaveRegistry,
} from '../../../plugins/save-manager/deleteFromSaveRegistry';
import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';
import {
  ISaveViewDispatchProps,
} from './ISaveViewDispatchProps';
import {
  ISaveControllerOwnProps,
} from './ISaveControllerOwnProps';
import {
  IState,
} from '../../state/IState';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  pushToSaveRegistry,
} from '../../../plugins/save-manager/pushToSaveRegistry';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  readFromSaveRegistry,
} from '../../../plugins/save-manager/readFromSaveRegistry';
import {
  Store,
} from 'redux';
import {
  ActionCreators,
} from 'redux-undo';
import {
  SaveViewControls,
} from '../SaveViewControls';
import {
  SaveViewDetails,
} from '../SaveViewDetails';
import {
  SaveViewHeader,
} from '../SaveViewHeader';
import {
  IManager,
} from 'sound-manager';
import {
  stopAllSoundsAutomatically,
} from '../../functions/stopAllSoundsAutomatically';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export class SaveViewUnconnected extends React.PureComponent<
  ISaveControllerOwnProps & ISaveViewDispatchProps
> {
  public readonly render = () => {
    const {
      className,
      currentPassageName,
      entry,
      isCurrentSaveFile,
    } = this.props;

    return (
      <AppContextConsumerWrapper>
        {({
          config,
          config: {
            historyFramesToSerialize,
            startPassageName: menuStartPassageName,
          },

          getSoundManager,
          store,
        }) => {
          const updateFunc = () => this.update(
            {
              ...entry,
              currentPassageName,
              lastModified: new Date().getTime(),
            },

            store,
            historyFramesToSerialize,
          );

          const readFunc = () => this.read(entry, config, getSoundManager());
          const destroyFunc = () => this.delete(entry);

          return (
            <div
              className={classNames(
                styles['save-view'],
                'save-view',
                { current: isCurrentSaveFile },
                className,
              )}

              role="group"
            >
              <SaveViewHeader entry={entry} />

              <SaveViewDetails
                entry={entry}
                storyStatePropNamesToShow={[
                  'confused_score',
                  'convert_score',
                  'resister_score',
                ]}
              />

              <SaveViewControls
                currentPassageName={currentPassageName}
                destroy={destroyFunc}
                entry={entry}
                read={readFunc}
                menuStartPassageName={menuStartPassageName}
                update={updateFunc}
              />
            </div>
          );
        }}
      </AppContextConsumerWrapper>
    );
  };

  public readonly delete = (entry: IStorySerializationPointer) => {
    const { dispatch } = this.props;

    deleteFromSaveRegistry(entry);

    return dispatch(createStoryStateSaveDeleteAction(entry));
  };

  public readonly read = (
    entry: IStorySerializationPointer,

    {
      soundManager: { excludeFromAutomaticStop },
    }: IAcceleratorConfigNormalized,

    {
      collection: { groups },
    }: IManager,
  ) => {
    const { dispatch } = this.props;

    stopAllSoundsAutomatically(groups, excludeFromAutomaticStop);

    const serialization = readFromSaveRegistry(entry);

    dispatch(createStoryOptionsDialogVisibleAction(false));
    dispatch(ActionCreators.clearHistory());

    return dispatch(createStoryStateLoadAction(serialization));
  };

  public readonly update = (
    entry: IStorySerializationPointer,
    store: Store<IState>,
    framesToSave = configurationDefaults.historyFramesToSave,
  ) => {
    const { dispatch } = this.props;
    pushToSaveRegistry(entry, store, framesToSave);
    return dispatch(createStoryStateSaveAction(entry));
  };
};

export const mapDispatchToProps: MapDispatchToProps<
  ISaveViewDispatchProps,
  ISaveControllerOwnProps
> = (dispatch) => ({ dispatch });

export const SaveView = connect(
  null,
  mapDispatchToProps,
)(SaveViewUnconnected);
