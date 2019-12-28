import classNames from 'classnames';
import {
  log,
} from 'colorful-logging';
import {
  Article,
  Typography,
} from '../../bundles/componentsBundle';
import {
  getNiceValueString,
} from '../functions/getNiceValueString';
import {
  IPlugin,
} from './IPlugin';
import {
  IPluginMethodBaseArgs,
  IPluginMethodChildArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodStateChangingArgs
} from './IPluginMethodArgs';

import * as React from 'react';

import styles from './DebugPlugin.less';

export class DebugPlugin implements IPlugin {
  public readonly afterStoryInit = ({
    passageObject,
    lastLinkTags,
  }: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs) => {
    log('---- afterStoryInit ----');
    log('The story is initializing.');
    log(`Current passage is: ${passageObject.name}`);
    log('The previous link tags after story initialization were:\n' +
        getNiceValueString(lastLinkTags));
  };

  public readonly beforePassageChange = ({
    passageObject: { name },
  }: IPluginMethodBaseArgs) => {
    log('---- beforePassageChange ----');
    log(`PassageContainer will render the passage named ${name}.`);
  };

  public readonly beforeRender = ({
    children,
    passageObject: {
      name,
      tags,
    },

    storyState: currentStoryState,
  }: IPluginMethodBaseArgs & IPluginMethodChildArgs) => {
    log('---- beforeRender ----');
    log(`PassageContainer is rendering the passage named ${name}.`);
    log('The passage\'s tags are:');

    log(getNiceValueString(tags))

    log('The story state before render is:');
    log(JSON.stringify(currentStoryState, null, 2));

    return (
      <>
        {children}

        {/* Inject the debug widget at the bottom of the page. */}
        <Article className={classNames(
          styles.debugContainer,
          'debugContainer',
        )}>
          <Typography
            className={classNames(
              styles.debugStateTitleContainer,
              'debugStateTitle',
            )}
            paragraph={true}
          >
            <Typography
              className={classNames(styles.debugStateTitle)}
              component="strong"
            >
              Current story state:
            </Typography>
          </Typography>

          <Typography
            className={classNames(
              styles.debugReadoutContainer,
              'debugReadoutContainer',
            )}
            paragraph={true}
          >
            <Typography
              className={classNames(
                styles.debugStateReadout,
                'debugStateReadout',
              )}
              component="code"
            >
              {getNiceValueString(currentStoryState)}
            </Typography>
          </Typography>
        </Article>
      </>
    );
  };

  public readonly afterPassageChange = ({
    passageObject: { name },
  }: IPluginMethodBaseArgs) =>
  {
    log('---- afterRender ----');
    log(`PassageContainer has rendered the passage named ${name}.`);
  };

  public readonly afterStoryStateChange = ({
    storyState,
    updatedStateProps,
  }: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs) => {
    log('---- afterStoryStateChange ----');
    log('The following modifications to the story state are being made:');
    log(getNiceValueString(updatedStateProps));

    if (document && typeof document.querySelector === 'function') {
      const readout = document.querySelector('.debugStateReadout');
      if (readout) {
        readout.textContent = getNiceValueString(storyState);
      }
    }
  };

  public readonly beforeRestart = ({
    storyState,
    passageObject: { name },
  }: IPluginMethodBaseArgs) => {
    log('---- beforeRestart ----');
    log('The story is restarting.');
    log(`The passage on which the user restarted was named ${name}.`);
    log('The story state at restart was:');
    log(getNiceValueString(storyState));

    if (document &&
        typeof document.querySelector === 'function')
    {
      /* Wipe the readout. */
      const readout = document.querySelector('.debugStateReadout');
      if (readout) {
        readout.textContent = '{}';
      }
    }
  };
}
