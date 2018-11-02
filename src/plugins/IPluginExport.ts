import {
  IPlugin,
} from './IPlugin';

export interface IPluginExport {
  name: string;
  contents: IPlugin;
}

export default IPluginExport;
