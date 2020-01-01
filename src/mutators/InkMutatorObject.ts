import {
  InkMutator,
} from './InkMutator';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

export interface InkMutatorObject extends
  IPrecedenceWeighted
{
  readonly content: InkMutator;
}
