import {
  Choice,
} from '../../../lib/ink/inkjs/src/Choice';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNode,
} from 'react';

export interface InkSectionOwnProps {  
  readonly choices: MaybeReadonlyArray<Choice>;
  readonly choicesVisible: boolean;
  readonly onClick: (index: number) => void;
  readonly children?: ReactNode;
  readonly className?: string;
}
