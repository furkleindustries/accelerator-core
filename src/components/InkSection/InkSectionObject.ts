import {
  Choice,
} from '../../../lib/ink/inkjs/src/Choice';
import {
  InkLineObject,
} from './InkLineObject';

export interface InkSectionObject {
  readonly choices: readonly Choice[];
  readonly lines: readonly InkLineObject[];
}
