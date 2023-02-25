import classNames from 'classnames';
import {
  ISaveViewExtraStateDetailsOwnProps,
} from './ISaveViewExtraStateDetailsOwnProps';
import {
  IStorySerialization,
} from '../../state/IStorySerialization';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';
import {
  readFromSaveRegistry,
} from '../../../plugins/save-manager/readFromSaveRegistry';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export const SaveViewExtraStateDetails: React.FC<ISaveViewExtraStateDetailsOwnProps> = ({
  className,
  entry,
  entry: { uuid },
  loggers: { warn },
  storyStatePropNamesToShow,
  storyState,
}) => {
  let saveFile: IStorySerialization | null = null;
  try {
    saveFile = readFromSaveRegistry(entry);
  } catch (err) {
    warn(err);
  }

  return (
    <List
      className={classNames(
        styles['save-view-details-extra-state-details-list'],
        'save-view-details-extra-state-details-list',
        className,
      )}
    >
      {storyStatePropNamesToShow.filter(Boolean).map((key) => (
        <ListItem
          className={classNames(
            styles['save-view-details-extra-state-details-list-item'],
            'save-view-details-extra-state-details-list-item',
          )}

          key={key}
        >
          <Typography
            className={classNames(
              styles['save-view-details-extra-state-detail-key'],
              'save-view-details-extra-state-detail-key',
            )}

            component="label"
          >
            {key.split(new RegExp(/[.\-_]/g)).map((part, idx) => (
              idx ? part : `${part[0].toUpperCase()}${part.slice(1)}`
            )).join(' ')}:
          </Typography>

          <Typography
            className={classNames(
              styles['save-view-details-extra-state-detail-value'],
              'save-view-details-extra-state-detail-value',
            )}

            component="code"
          >
            {uuid === 'autosave' ?
              storyState[key] :
              saveFile!.engineHistory.present.storyState[key]}
          </Typography>
        </ListItem>
        ))}
    </List>
  );
};
