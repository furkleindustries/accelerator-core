import {
  InkMutator,
} from './InkMutator';
import {
  INamed,
} from '../interfaces/INamed';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

import {
  registry,
} from '../../ink-mutators/ink-mutators-manifest';

type RegistryType = typeof registry;

export type InkMutatorNames = keyof RegistryType;

export interface InkMutatorObject extends
  INamed,
  IPrecedenceWeighted
{
  readonly name: InkMutatorNames;
  readonly content: InkMutator;
}
