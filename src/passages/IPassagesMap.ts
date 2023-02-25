import {
  IPassage,
} from './IPassage';
import {
  registry,
} from '../../passages/passages-manifest';

type RegistryType = typeof registry;

export type PassageNames = keyof RegistryType;

type Temp = { [K in PassageNames]: IPassage; }

export interface IPassagesMap extends Temp {}
