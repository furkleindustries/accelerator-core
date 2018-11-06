import {
  IPlugin,
} from './IPlugin';

export interface IPluginExport {
  name: string;
  contents: IPlugin | null;
  precedence?: number;
}
