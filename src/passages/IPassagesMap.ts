import {
  IPassage,
} from './IPassage';

import {
  registry,
} from '../../passages/passages-manifest';

type RegistryType = typeof registry;
type Temp = { [K in keyof RegistryType]: IPassage; }

export interface IPassagesMap extends Temp {}
