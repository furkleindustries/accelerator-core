import {
  checkStoryOptionAsset,
} from './checkStoryOptionAsset';
import {
  IStoryOption,
} from './IStoryOption';
import {
  precedenceSort,
} from '../passages/precedenceSort';
import {
  assert,
} from 'ts-assertions';

import manifest from '../../options/storyOptions-manifest';

export const strings = {
  STORY_OPTIONS_MANIFEST_INVALID:
    'The storyOptions-manifest.ts file was not parseable into an array.',

  STORY_OPTION_OBJECT_INVALID:
    'One of the story option objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

assert(Array.isArray(manifest), strings.STORY_OPTIONS_MANIFEST_INVALID);

/* Memoize results and return them without computation on repeat calls. */
let storyOptionsList: IStoryOption[] | null = null;

export function getStoryOptionsList(): IStoryOption[] {
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
      checkStoryOptionAsset(asset);
    } catch (err) {
      const errStr = strings.STORY_OPTION_OBJECT_INVALID
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
}
