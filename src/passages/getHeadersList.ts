import {
  checkHeaderObject,
} from './checkHeaderObject';
import {
  IHeader,
} from './IHeader';
import {
  precedenceSort,
} from '../functions/precedenceSort';
import {
  assert,
} from 'ts-assertions';

import manifest from '../../headers/headers-manifest';

export const strings = {
  HEADERS_MANIFEST_INVALID:
    'The headers-manifest.json file was not parseable into an array.',
  
  HEADER_OBJECT_INVALID:
  'One of the Header objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%',
};

assert(Array.isArray(manifest), strings.HEADERS_MANIFEST_INVALID);

/* Memoize results and return them without computation on repeat calls. */
let headersList: readonly IHeader[] | null = null;

export const getHeadersList = (): readonly IHeader[] => {
  if (headersList) {
    return headersList;
  }

  type temp = { [key: string]: IHeader[] } & { none: IHeader[] };
  const headersPrecedenceMap: temp = { none: [] };

  manifest.forEach(({
    asset,
    filepath,
  }) => {
    const headerObj = asset;
    try {
      checkHeaderObject(headerObj);
    } catch (err) {
      const errStr = strings.HEADER_OBJECT_INVALID
        .replace('%FILEPATH%', filepath)
        .replace('%REASON%', err);

      throw new Error(errStr);
    }

    if (headerObj.precedence! >= 0) {
      const precedence = headerObj.precedence!.toString();
      if (!headersPrecedenceMap[precedence]) {
        headersPrecedenceMap[precedence] = [];
      }

      headersPrecedenceMap[precedence].push(headerObj);
    } else {
      headersPrecedenceMap.none.push(headerObj);
    }
  });

  headersList = precedenceSort(headersPrecedenceMap);

  return headersList;
};
