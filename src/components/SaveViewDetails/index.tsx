import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  CurrentPassageDisplayName,
} from '../CurrentPassageDisplayName';
import {
  ISaveViewDetailsOwnProps,
} from './ISaveViewDetailsOwnProps';
import {
  ISaveViewDetailsStateProps,
} from './ISaveViewDetailsStateProps';
import {
  IState,
} from '../../state/IState';
import {
  connect,
  MapStateToProps,
} from 'react-redux';
import {
  SaveViewExtraStateDetails,
} from '../SaveViewExtraStateDetails';
import {
  SaveViewLastModifiedTimestamp,
} from '../SaveViewLastModifiedTimestamp';
import {
  SaveViewNewGamePlusDetails,
} from '../SaveViewNewGamePlusDetails';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export const SaveViewDetailsUnconnected: React.FC<
  ISaveViewDetailsOwnProps &
    ISaveViewDetailsStateProps
> = ({
  entry,
  entry: {
    currentPassageName,
    lastModified,
    uuid,
  },

  storyState,
  storyStatePropNamesToShow = [],
}) => (
  <AppContextConsumerWrapper>
    {({
      config: { loggers },
      passagesMap,
    }) => {
      return (
        <div
          className={classNames(
            styles['save-view-details'],
            'save-view-details',
          )}

          role="group"
        >
          <CurrentPassageDisplayName
            className={classNames(
              styles['save-view-details-current-passage-content'],
              'save-view-details-current-passage-content',
            )}

            currentPassageName={currentPassageName}
            passagesMap={passagesMap}
          />

          {uuid !== 'Autosave' ?
            <SaveViewLastModifiedTimestamp lastModified={lastModified} /> :
            null}

          <SaveViewExtraStateDetails
            entry={entry}
            loggers={loggers}
            storyState={storyState}
            storyStatePropNamesToShow={storyStatePropNamesToShow}
          />

          <SaveViewNewGamePlusDetails entry={entry} />
        </div>
      );
    }}
  </AppContextConsumerWrapper>
);

export const mapStateToProps: MapStateToProps<
  ISaveViewDetailsStateProps,
  ISaveViewDetailsOwnProps,
  IState
> = ({
  history: {
    present: { storyState },
  },
}) => ({ storyState });

export const SaveViewDetails = connect(
  mapStateToProps,
)(SaveViewDetailsUnconnected);
