import {
  IPlugin,
} from './IPlugin';
import {
  IPluginMethodChildArgs,
} from './IPluginMethodArgs';
import {
  MenuPluginComponent,
} from './MenuPluginComponent';

import * as React from 'react';

export class MenuPlugin implements IPlugin {
  public beforeRender = ({ children }: IPluginMethodChildArgs) => (
    <>
      <MenuPluginComponent />

      {children}
    </>
  );
}
