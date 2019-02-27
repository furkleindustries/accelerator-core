import {
  IFootersContext,
} from './IFootersContext';
import {
  IHeadersContext,
} from './IHeadersContext';
import {
  IPassagesMapAndStartPassageNameContext,
} from './IPassagesMapAndStartPassageNameContext';
import {
  IPluginsContext,
} from './IPluginsContext';
import {
  ISoundManagerContext,
} from './ISoundManagerContext';

export interface IContext extends
  IFootersContext,
  IHeadersContext,
  IPassagesMapAndStartPassageNameContext,
  IPluginsContext,
  ISoundManagerContext
{}
