import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  IStartScreenChoicesOwnProps,
} from './IStartScreenChoicesOwnProps';
import {
  List,
} from '../List';
import {
  ListItem,
} from '../ListItem';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const StartScreenChoices: React.FC<IStartScreenChoicesOwnProps> = ({
  className,
  creditsRedirector,
  configStartPassageName,
  loadAutosaveAtStart,
  newGameCounter,
  notesRedirector,
  startPassageName,
  startRedirector,
}) => {
  const startButtonContent = loadAutosaveAtStart &&
    startPassageName !== configStartPassageName ?
      'Continue' :
      'Start';

  return (
    <List
      className={classNames(
        builtIns['story-options-list'],
        'story-options-list',
        className,
      )}
    >
      <ListItem
        className={classNames(
          builtIns['story-options-list-item'],
          'story-options-list-item',
        )}
      >
        <Button
          className={classNames(
            builtIns['start-screen-button'],
            'start-screen-button',
          )}

          id="start-button"
          aria-roledescription="Start button"
          title={startButtonContent}
          onClick={startRedirector}
          style={{
            filter: `invert(${newGameCounter > 0 ? 85 : 0}%)`,
          }}
        >
          {startButtonContent}
        </Button>
      </ListItem>

      <ListItem
        className={classNames(
          builtIns['story-options-list-item'],
          'story-options-list-item',
        )}
      >
        <Button
          className={classNames(
            builtIns['start-screen-button'],
            'start-screen-button',
          )}

          id="notes-button"
          aria-roledescription="Notes button"
          title="Notes"
          onClick={notesRedirector}
          style={{
            filter: `invert(${newGameCounter > 0 ? 85 : 0}%)`,
          }}
        >
          Notes
        </Button>
      </ListItem>

      <ListItem
        className={classNames(
          builtIns['story-options-list-item'],
          'story-options-list-item',
        )}
      >
        <Button
          className={classNames(
            builtIns['start-screen-button'],
            'start-screen-button',
          )}

          aria-roledescription="Credits button"
          title="Credits"
          id="credits-button"
          onClick={creditsRedirector}
          style={{
            filter: `invert(${newGameCounter > 0 ? 85 : 0}%)`,
          }}
        >
          Credits
        </Button>
      </ListItem>
    </List>
  );
};
