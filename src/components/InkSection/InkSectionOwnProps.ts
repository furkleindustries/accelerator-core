import {
  Choice,
} from '../../../lib/ink/inkjs/src/Choice';
import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ReactNode,
} from 'react';

export interface InkSectionOwnProps extends IClassNameable {
  readonly choices: MaybeReadonlyArray<Choice>;
  readonly choicesVisible: boolean;
  readonly onClick: (index: number) => void;
  readonly children?: ReactNode;
}
