import classnames from 'classnames';
import {
  log,
} from 'colorful-logging';
import {
  Typography,
} from '../../bundles/componentsBundle';
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

import styles from './DebugPlugin.scss';

export class DebugPlugin implements IPlugin {
  public readonly afterStoryInit = ({
    passageObject,
    lastLinkTags,
  }: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs) => {
    log('---- afterStoryInit ----');
    log('The story is initializing.');
    log(`Current passage is: ${passageObject.name}`);
    log('The previous link tags after story initialization were:\n' +
        JSON.stringify(lastLinkTags, null, 2));
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
    log(JSON.stringify(tags, null, 2));
    log('The story state before render is:');
    log(JSON.stringify(currentStoryState, null, 2));

    return (
      <>
        {children}

        {/* Inject the debug widget at the bottom of the page. */}
        <article className={classnames(
          styles.debugContainer,
          'debugContainer',
        )}>
          <Typography
            className={classnames(
              styles.debugStateTitleContainer,
              'debugStateTitle',
            )}
            paragraph={true}
          >
            <Typography
              className={classnames(styles.debugStateTitle)}
              component="strong"
            >
              Current story state:
            </Typography>
          </Typography>

          <Typography
            className={classnames(
              styles.debugReadoutContainer,
              'debugReadoutContainer',
            )}
            component="div"
          >
            <Typography
              className={classnames(
                styles.debugStateReadout,
                'debugStateReadout',
              )}
              component="code"
            >
              {JSON.stringify(currentStoryState, null, 2)}
            </Typography>
          </Typography>
        </article>
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
    log(JSON.stringify(updatedStateProps, null, 2));

    if (document && typeof document.querySelector === 'function') {
      const readout = document.querySelector('.debugStateReadout');
      if (readout) {
        readout.textContent = JSON.stringify(storyState, null, 2);
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
    log(JSON.stringify(storyState, null, 2));

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
