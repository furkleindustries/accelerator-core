import {
  IPluginMethodChildArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodBaseArgs,
} from './IPluginMethodArgs';
import {
  ReactNode,
} from 'react';

export interface IPlugin {
  atStoryInit?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforePassageChange?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforeRender?(args: IPluginMethodBaseArgs & IPluginMethodChildArgs): ReactNode;
  afterPassageChange?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforeRestart?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
}

export default IPlugin;
