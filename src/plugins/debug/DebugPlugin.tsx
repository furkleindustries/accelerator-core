import chalk from 'chalk';
import {
  DebugController,
} from './DebugController';
import {
  getNiceValueString,
} from '../../functions/getNiceValueString';
import {
  IPlugin,
} from '../IPlugin';
import {
  IState,
} from '../../state/IState';
import type {
  Store,
} from 'redux';

import * as React from 'react';

export class DebugPlugin implements IPlugin {
  private store: Store<IState>;
  public readonly afterStoryInit: IPlugin['afterStoryInit'] = ({
    config: {
      storyMetadata: { title },
      loggers: { log },
    },

    lastLinkTags,
    passageObject: { name: passageName },
    store,
    store: { getState },
  }) => {
    this.store = store;

    const { debug } = getState();

    if (debug) {
      log('---- Debug: afterStoryInit ----');
  
      log(
        `XLR8R is initializing the story "${chalk.underline(title)}".`,
      );
  
      log(
        `Current passage is: ${chalk.underline(passageName)}`,
      );
  
      log(
        'The previous link tags after story initialization were:',
      );
  
      log(getNiceValueString(lastLinkTags));
  
      log('--------');
    }
  };

  public readonly beforePassageChange: IPlugin['beforePassageChange'] = ({
    config: { loggers: { log } },
    passageObject: { name: passageName },
  }) => {
    const { debug } = this.store.getState();

    if (debug) {
      log('---- Debug: beforePassageChange ----');
  
      log(
        `XLR8R will navigate to the passage named "${chalk.underline(passageName)}".`,
      );
  
      log('--------');
    }
  };

  public readonly beforeRender: IPlugin['beforeRender'] = () => (
    <DebugController />
  );

  public readonly shouldRerender = () => false;

  public readonly afterPassageChange: IPlugin['afterPassageChange'] = ({
    config: {
      loggers: { log },
    },

    passageObject: { name: passageName },
  }) => {
    const { debug } = this.store.getState();

    if (debug) {
      log('---- Debug: afterRender ----');
  
      log(
        `XLR8R has navigated to the passage named "${chalk.underline(passageName)}".`,
      );
  
      log('--------');
    }
  };

  public readonly afterStoryStateChange: IPlugin['afterStoryStateChange'] = ({
    config: {
      loggers: { log },
    },

    updatedStateProps,
  }) => {
    const { debug } = this.store.getState();

    if (debug) {
      log('---- Debug: afterStoryStateChange ----');
  
      log('XLR8R is making these modifications to the story state:');
  
      log(getNiceValueString(updatedStateProps));
  
      log('--------');
    }
  };

  public readonly beforeRestart: IPlugin['beforeRestart'] = ({
    config: {
      loggers: { log },
    },

    passageObject: { name },
    storyState,
  }) => {
    const { debug } = this.store.getState();

    if (debug) {
      log('---- Debug: beforeRestart ----');
      log(
        `XLR8R is restarting the story "{chalk.underline(title)}.`
      );

      log(
        `The passage on which the user restarted was named ${name}.`,
      );

      log('The story state at restart was:');

      log(getNiceValueString(storyState));

      log('--------');
    }
  };
}
