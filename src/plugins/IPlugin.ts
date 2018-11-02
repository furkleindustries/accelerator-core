import {
  IPassageProps,
} from '../passages/IPassageProps';
import {
  IPluginMethodArgs,
} from './IPluginMethodArgs';
import {
  ReactElement,
} from 'react';

export interface IPlugin {
  beforeComponentDidMount?(args: IPluginMethodArgs): void;
  afterComponentDidMount?(args: IPluginMethodArgs): void;
  beforeRender?(args: IPluginMethodArgs & { child: ReactElement<IPassageProps>, }): ReactElement<IPassageProps>;
  beforeComponentDidUpdate?(args: IPluginMethodArgs): void;
  afterComponentDidUpdate?(args: IPluginMethodArgs): void;
}

export default IPlugin;
