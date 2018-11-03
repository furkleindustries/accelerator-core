import {
  IPassageProps,
} from '../passages/IPassageProps';
import {
  IPlugin,
} from './IPlugin';
import {
  IPluginMethodArgs,
} from '../passages/pluginsBundle';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';

import * as React from 'react';

export class DebugPlugin implements IPlugin {
  private lastBeforeComponentDidMountState: IStoryStateInstance;

  public beforeComponentDidMount(args: IPluginMethodArgs) {
    const {
      currentPassageObject,
      currentStoryState,
      lastLinkTags,
    } = args;

    this.lastBeforeComponentDidMountState = currentStoryState;

    console.log('---- beforeComponentDidMount ----');
    console.log('PassageContainer is mounting.');
    console.log(`Current passage is: ${currentPassageObject.name}`);
    console.log('The story state at mount is:\n' +
                `${JSON.stringify(currentStoryState, null, 2)}`);
    console.log('The previous link tags at mount were:\n' +
                JSON.stringify(lastLinkTags, null, 2));
  }

  public afterComponentDidMount(args: IPluginMethodArgs) {
    const {
      currentStoryState,
    } = args;

    console.log('---- afterComponentDidMount ----');
    console.log('PassageContainer has mounted.');
    console.log('The story state after mount is:');
    const stringified = JSON.stringify(currentStoryState, null, 2);
    if (stringified === JSON.stringify(this.lastBeforeComponentDidMountState, null, 2)) {
      console.log('Identical to before mounting.');
    } else {
      console.log(stringified);
    }
  }

  public beforeRender(args: IPluginMethodArgs & { child: React.ReactElement<IPassageProps>, }) {
    const {
      child,
      currentPassageObject: {
        name,
        tags,
      },

      currentStoryState,
    } = args;

    console.log('---- beforeRender ----');
    console.log('PassageContainer is rendering a new passage.');
    console.log(`The passage being rendered is: ${name}`);
    console.log(`The passage's tags are:\n${JSON.stringify(tags, null, 2)}`);
    console.log('The story state before render is:');
    console.log(JSON.stringify(currentStoryState, null, 2));
    console.log(`The story state at render`);

    return child;
  }
}

export default DebugPlugin;
