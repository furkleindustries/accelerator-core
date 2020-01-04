import {
  checkFooterObject,
} from './checkFooterObject';
import {
  IFooter,
} from './IFooter';
import {
  precedenceSort,
} from '../functions/precedenceSort';
import {
  assert,
} from 'ts-assertions';

import manifest from '../../footers/footers-manifest';

export const strings = {
  FOOTERS_MANIFEST_INVALID:
    'The footers-manifest.json file was not parseable into an array.',
  
  FOOTER_OBJECT_INVALID:
  'One of the footer objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%',
};

assert(Array.isArray(manifest), strings.FOOTERS_MANIFEST_INVALID);

/* Memoize results and return them without computation on repeat calls. */
let footersList: readonly IFooter[] | null = null;

export const getFootersList = (): readonly IFooter[] => {
  if (footersList) {
    return footersList;
  }

  type temp = { [key: string]: IFooter[] } & { none: IFooter[] };
  const footersPrecedenceMap: temp = { none: [] };

  manifest.forEach(({
    asset,
    filepath,
  }) => {
    const footerObj = asset;
    try {
      checkFooterObject(footerObj);
    } catch (err) {
      const errStr = strings.FOOTER_OBJECT_INVALID
        .replace('%FILEPATH%', filepath)
        .replace('%REASON%', err);

      throw new Error(errStr);
    }

    if (footerObj.precedence! > 0) {
      const precedence = String(footerObj.precedence);
      if (!footersPrecedenceMap[precedence]) {
        footersPrecedenceMap[precedence] = [];
      }

      footersPrecedenceMap[precedence].push(footerObj);
    } else {
      footersPrecedenceMap.none.push(footerObj);
    }
  });

  footersList = precedenceSort(footersPrecedenceMap);

  return footersList;
};
