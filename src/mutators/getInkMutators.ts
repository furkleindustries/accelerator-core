import {
  checkMutatorObject,
} from './checkMutatorObject';
import {
  precedenceSort,
} from '../functions/precedenceSort';
import {
  InkMutatorObject,
} from './InkMutatorObject';
import {
  assert,
} from 'ts-assertions';

import manifest from '../../ink-mutators/mutators-manifest';

export const strings = {
  MUTATORS_MANIFEST_INVALID:
    'The mutators-manifest.json file was not parseable into an array.',
  
  MUTATOR_OBJECT_INVALID:
    'One of the mutator objects, found at %FILEPATH%, was invalid. ' +
      '%REASON%',
};

assert(Array.isArray(manifest), strings.MUTATORS_MANIFEST_INVALID);

/* Memoize results and return them without computation on repeat calls. */
let mutatorsList: readonly InkMutatorObject[] | null = null;

export const getInkMutators = (): readonly InkMutatorObject[] => {
  if (mutatorsList) {
    return mutatorsList;
  }

  type temp = { [key: string]: InkMutatorObject[] } & { none: InkMutatorObject[] };
  const mutatorsPrecedenceMap: temp = { none: [] };

  manifest.forEach(({
    asset,
    filepath,
  }) => {
    const mutatorObj = asset;
    try {
      checkMutatorObject(mutatorObj);
    } catch (err) {
      const errStr = strings.MUTATOR_OBJECT_INVALID
        .replace('%FILEPATH%', filepath)
        .replace('%REASON%', err);

      throw new Error(errStr);
    }

    if (mutatorObj.precedence! > 0) {
      const precedence = String(mutatorObj.precedence);
      if (!mutatorsPrecedenceMap[precedence]) {
        mutatorsPrecedenceMap[precedence] = [];
      }

      mutatorsPrecedenceMap[precedence].push(mutatorObj);
    } else {
      mutatorsPrecedenceMap.none.push(mutatorObj);
    }
  });

  mutatorsList = precedenceSort(mutatorsPrecedenceMap);

  return mutatorsList;
};
