import {
  InkMutatorProps,
} from '../../ink-mutators/InkMutatorProps'
import {
  InkMutatorObject,
} from '../../ink-mutators/InkMutatorObject'
import type {
  ReactNode,
} from 'react';

export const mutateInkContent = (
  mutatorObjects: readonly InkMutatorObject[],
  {
    components,
    lines,
    inkModule,
    story,
  }: InkMutatorProps,
): ReactNode => {
  let output: ReactNode;
  for (const { content: mutator } of mutatorObjects) {
    output = mutator({
      components,
      inkModule,
      lines,
      story,
    }) || output;
  }

  return output || null;
};
