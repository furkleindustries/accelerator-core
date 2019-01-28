import {
  IPlugin,
} from './IPlugin';

export interface IPluginExport {
  name: string;
  contents?: IPlugin;
  precedence?: number;
}
