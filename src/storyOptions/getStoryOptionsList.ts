import {
  checkStoryOptionObject,
} from './checkStoryOptionObject';
import {
  IStoryOption,
} from './IStoryOption';
import {
  assert,
} from 'ts-assertions';

import manifest from '../../options/options-manifest';
import { precedenceSort } from '../passages/precedenceSort';

export const strings = {
  storyOptionS_MANIFEST_INVALID:
  'The storyOptions-manifest.json file was not parseable into an array.',
  
  storyOption_OBJECT_INVALID:
  'One of the storyOption objects, found at %FILEPATH%, was invalid. ' +
  '%REASON%.',
};

assert(Array.isArray(manifest), strings.storyOptionS_MANIFEST_INVALID);

/* Memoize results and return them without computation on repeat calls. */
let storyOptionsList: IStoryOption[] | null = null;

export const getStoryOptionsList = (): IStoryOption[] => {
  if (storyOptionsList) {
    return storyOptionsList;
  }

  type temp = { [key: string]: IStoryOption[] } & { none: IStoryOption[] };
  const storyOptionsPrecedenceMap: temp = { none: [] };

  manifest.forEach(({
    asset,
    filepath,
  }) => {
    try {
      checkStoryOptionObject(asset);
    } catch (err) {
      const errStr = strings.storyOption_OBJECT_INVALID
        .replace('%FILEPATH%', filepath)
        .replace('%REASON%', err);

      throw new Error(errStr);
    }

    if (asset.precedence! >= 0) {
      const precedence = String(asset.precedence);
      if (!storyOptionsPrecedenceMap[precedence]) {
        storyOptionsPrecedenceMap[precedence] = [];
      }

      storyOptionsPrecedenceMap[precedence].push(asset);
    } else {
      storyOptionsPrecedenceMap.none.push(asset);
    }

    return asset;
  });

  storyOptionsList = precedenceSort(storyOptionsPrecedenceMap);

  return storyOptionsList;
};
