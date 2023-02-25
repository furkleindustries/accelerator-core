import {
  AppStyleProvider,
} from '../AppStyleProvider';
import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  INewContentAlertOwnProps,
} from './INewContentAlertOwnProps';
import {
  newContentAlertId,
} from './newContentAlertId';
import {
  Typography,
} from '../Typography';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const NewContentAlert: React.FC<INewContentAlertOwnProps> = ({
  id = newContentAlertId,
}) => {
  const closeWindow = () => {
    const containerElem = document.body.querySelector(id);
    if (containerElem) {
      ReactDOM.unmountComponentAtNode(containerElem);
    }
  };

  const refreshWindow = () => window.location.reload();

  return (
    <AppStyleProvider>
      <div
        className={classNames(
          builtIns['new-content-alert'],
          'new-content-alert',
        )}

        role="document"
      >
        <Typography
          className={classNames(
            builtIns['new-content-alert-text'],
            'new-content-alert-text',
          )}

          paragraph={true}
          role="alert"
        >
          Please refresh the page to get the newest content. Errors may occur otherwise. This will not affect your save game.
        </Typography>

        <Button
          className={classNames(
            builtIns['new-content-alert-refresh-button'],
            'new-content-alert-refresh-button',
          )}

          onClick={refreshWindow}
          title="Refresh window"
        >
          Refresh window
        </Button>

        <Button
          className={classNames(
            builtIns['new-content-alert-close-button'],
            'new-content-alert-close-button',
          )}

          onClick={closeWindow}
          title="Close window"
        >
          🗙
        </Button>
      </div>
    </AppStyleProvider>
  )
};

