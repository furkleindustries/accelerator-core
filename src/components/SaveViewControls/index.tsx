import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  ISaveViewControlsOwnProps,
} from './ISaveViewControlsOwnProps';

import * as React from 'react';

import styles from '../../../options/save-manager/save-manager.less';

export const SaveViewControls: React.FC<ISaveViewControlsOwnProps> = ({
  currentPassageName,
  menuStartPassageName,
  destroy,
  entry: {
    currentPassageName: entryPassageName,
    uuid,
  },

  read,
  update,
}) => (
  <div
    className={classNames(
      styles['save-view-controls'],
      'save-view-controls',
    )}

    role="group"
  >
    {uuid !== 'Autosave' ?
      <div
        className={classNames(
          styles['save-view-controls-non-autosave-content'],
          'save-view-controls-non-autosave-content',
        )}

        role="group"
      >
        <Button
          className={classNames(
            styles['save-view-controls-load-button'],
            'save-view-controls-load-button',
          )}

          disabled={entryPassageName === currentPassageName}
          onClick={read}
        >
          Load save
        </Button>

        <Button
          className={classNames(
            styles['save-view-controls-overwrite-button'],
            'save-view-controls-overwrite-button',
          )}

          disabled={entryPassageName === currentPassageName || currentPassageName === menuStartPassageName}
          onClick={update}
        >
          Update save
        </Button>

        <Button
          className={classNames(
            styles['save-view-controls-delete-button'],
            'save-view-controls-delete-button',
          )}
        
          onClick={destroy}
        >
          Delete save
        </Button>
      </div> :
      null}
  </div>
);
