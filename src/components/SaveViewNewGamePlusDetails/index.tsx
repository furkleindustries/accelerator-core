import classNames from 'classnames';
import {
  ISaveViewNewGamePlusDetailsOwnProps,
} from './ISaveViewNewGamePlusDetailsOwnProps';
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

export const SaveViewNewGamePlusDetails: React.FC<
  ISaveViewNewGamePlusDetailsOwnProps
> = ({ entry }) => {
  let saveFile: IStorySerialization | null = null;
  try {
    saveFile = readFromSaveRegistry(entry);
  } catch (err) {
    return null;
  }

  const {
    engineHistory: {
      present: {
        storyState: {
          XLR8R_NEW_GAME: newGameCounter = 0,
        },
      },
    },
  } = saveFile;

  return (
    <div
      className={classNames(
        styles['save-view-new-game-plus-details'],
        'save-view-new-game-plus-details',
      )}

      role="group"
    >
      <List
        className={classNames(
          styles['save-view-new-game-plus-details-list'],
          'save-view-new-game-plus-details-list',
        )}
      >
        {[ ...('⁂'.repeat(Math.min(newGameCounter, 3))) ].map((astr, idx) => (
          <ListItem
            className={classNames(
              styles['save-view-new-game-plus-details-list-item'],
              'save-view-new-game-plus-details-list-item',
            )}

            key={idx}
          >
            <Typography
              className={classNames(
                styles['save-view-new-game-plus-details-content'],
                'save-view-new-game-plus-details-content',
              )}

              title="New game pip"
            >
              {astr}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
