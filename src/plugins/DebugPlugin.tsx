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

export class DebugPlugin implements IPlugin {
  public afterStoryInit(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs) {
    const {
      currentPassageObject,
      lastLinkTags,
    } = args;

    console.log('---- afterStoryInit ----');
    console.log('The story is initializing.');
    console.log(`Current passage is: ${currentPassageObject.name}`);
    console.log('The previous link tags after story initialization were:\n' +
                JSON.stringify(lastLinkTags, null, 2));
  }

  public beforePassageChange(args: IPluginMethodBaseArgs) {
    const {
      currentPassageObject: { name },
    } = args;

    console.log('---- beforePassageChange ----');
    console.log(`PassageContainer will render the passage named ${name}.`);
  }

  public beforeRender(args: IPluginMethodBaseArgs & IPluginMethodChildArgs) {
    const {
      children,
      currentPassageObject: {
        name,
        tags,
      },

      storyState: currentStoryState,
    } = args;

    console.log('---- beforeRender ----');
    console.log(`PassageContainer is rendering the passage named ${name}.`);
    console.log('The passage\'s tags are:');
    console.log(JSON.stringify(tags, null, 2));
    console.log('The story state before render is:');
    console.log(JSON.stringify(currentStoryState, null, 2));

    const debugChildren: React.ReactChild[] = [
      <p className="debugStateTitle" key={0}>
        Current story state:
      </p>,
      <div className="debugStateReadout" key={1}>{
        JSON.stringify(currentStoryState, null, 2)
      }</div>
    ];

    return React.Children.toArray(children).concat(debugChildren);
  }

  public afterPassageChange({
    currentPassageObject: { name },
  }: IPluginMethodBaseArgs)
  {
    console.log('---- afterRender ----');
    console.log(`PassageContainer has rendered the passage named ${name}.`);
  }

  public afterStoryStateChange({
    storyState,
    updatedStateProps,
  }: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs) {
    console.log('---- afterStoryStateChange ----');
    console.log('The following modifications to the story state are being made:');
    console.log(JSON.stringify(updatedStateProps));

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
    currentPassageObject: { name },
  }: IPluginMethodBaseArgs)
  {
    console.log('---- beforeRestart ----');
    console.log('The story is restarting.');
    console.log(`The passage on which the user restarted was named ${name}.`);
    console.log('The story state at restart was:');
    console.log(JSON.stringify(storyState, null, 2));

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
