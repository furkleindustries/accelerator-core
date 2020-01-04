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
} from '../../ink-mutators/mutators-manifest';

type RegistryType = typeof registry;

export interface InkMutatorObject extends
  INamed,
  IPrecedenceWeighted
{
  readonly name: keyof RegistryType;
  readonly content: InkMutator;
}
