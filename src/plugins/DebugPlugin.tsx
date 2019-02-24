import {
  log,
} from 'colorful-logging';
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
  public afterStoryInit(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs) {
    const {
      passageObject,
      lastLinkTags,
    } = args;

    log('---- afterStoryInit ----');
    log('The story is initializing.');
    log(`Current passage is: ${passageObject.name}`);
    log('The previous link tags after story initialization were:\n' +
        JSON.stringify(lastLinkTags, null, 2));
  }

  public beforePassageChange(args: IPluginMethodBaseArgs) {
    const {
      passageObject: { name },
    } = args;

    log('---- beforePassageChange ----');
    log(`PassageContainer will render the passage named ${name}.`);
  }

  public beforeRender(args: IPluginMethodBaseArgs & IPluginMethodChildArgs) {
    const {
      children,
      passageObject: {
        name,
        tags,
      },

      storyState: currentStoryState,
    } = args;

    log('---- beforeRender ----');
    log(`PassageContainer is rendering the passage named ${name}.`);
    log('The passage\'s tags are:');
    log(JSON.stringify(tags, null, 2));
    log('The story state before render is:');
    log(JSON.stringify(currentStoryState, null, 2));

    const debugChildren = [
      <div className={`${styles.debugContainer} debugContainer`} key={0}>
        <p className={`${styles.debugStateTitleContainer} debugStateTitle`}>
          <strong className={styles.debugStateTitle}>
            Current story state:
          </strong>
        </p>

        <div className={`${styles.debugReadoutContainer} debugReadoutContainer`}>
          <pre className={`${styles.debugStateReadout} debugStateReadout`}>{
            JSON.stringify(currentStoryState, null, 2)
          }</pre>
        </div>
      </div>
    ];

    return React.Children.toArray(children).concat(debugChildren);
  }

  public afterPassageChange({
    passageObject: { name },
  }: IPluginMethodBaseArgs)
  {
    log('---- afterRender ----');
    log(`PassageContainer has rendered the passage named ${name}.`);
  }

  public afterStoryStateChange({
    storyState,
    updatedStateProps,
  }: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs) {
    log('---- afterStoryStateChange ----');
    log('The following modifications to the story state are being made:');
    log(JSON.stringify(updatedStateProps, null, 2));

    if (document &&
        typeof document.querySelector === 'function')
    {
      const readout = document.querySelector('.debugStateReadout');
      if (readout) {
        readout.textContent = JSON.stringify(storyState, null, 2);
      }
    }
  }

  public beforeRestart({
    storyState,
    passageObject: { name },
  }: IPluginMethodBaseArgs)
  {
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
  }
}
