import {
  IPluginMethodBaseArgs,
  IPluginMethodChildArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodStateChangingArgs,
} from './IPluginMethodArgs';
import {
  ReactNode,
} from 'react';

export interface IPlugin {
  afterStoryInit?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforePassageChange?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforeRender?(args: IPluginMethodBaseArgs & IPluginMethodChildArgs): ReactNode;
  afterPassageChange?(args: IPluginMethodBaseArgs): void;
  afterStoryStateChange?(args: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs): void;
  beforeRestart?(args: IPluginMethodBaseArgs): void;
}

export default IPlugin;
