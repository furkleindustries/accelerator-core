import {
  checkHeaderObject,
} from './checkHeaderObject';
import {
  IHeader,
} from './IHeader';

import manifest from '../../headers/headers-manifest';

export const strings = {
  HEADERS_MANIFEST_INVALID:
    'The Headers-manifest.json file was not parseable into an array.',

  HEADER_OBJECT_INVALID:
    'One of the Header objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

/* Memoize results and return them without computation on repeat calls. */
let headersList: IHeader[] | null = null;

export const getHeadersList = (): IHeader[] => {
  if (headersList) {
    return headersList;
  }

  if (!Array.isArray(manifest)) {
    throw new Error(strings.HEADERS_MANIFEST_INVALID);
  }

  const headersPrecedenceMap: { [key: string]: IHeader[], } & { none: IHeader[], } = {
    none: [],
  };

  manifest.forEach((headerFileObj) => {
    const headerObj = headerFileObj.headerObject;

    const checkFailMsg = checkHeaderObject(headerFileObj.headerObject);
    if (checkFailMsg) {
      const errStr = strings.HEADER_OBJECT_INVALID
        .replace('%FILEPATH%', headerFileObj.filepath)
        .replace('%REASON%', checkFailMsg);

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

  /* Sort precedence in descending lexicographic order. In practice, this means
     4, 3, 2, 1, and then 'none' is always appended. */
  const keys = Object.keys(headersPrecedenceMap).sort((aa, bb) => {
    if (aa === 'none') {
      return 1;
    } else if (bb === 'none') {
      return -1;
    }

    if (aa > bb) {
      return -1;
    } else if (aa === bb) {
      return 0;
    } else {
      return 1;
    }
  });

  headersList = keys.map<IHeader[]>((key) => (
    /* Sort the headers in each precedence in ascending lexicographic
     * order. */
    headersPrecedenceMap[key].sort((aa, bb) => {
      if (aa.name < bb.name) {
        return -1;
      } else if (aa.name === bb.name) {
        return 0;
      } else {
        return 1;
      }
    })
  )).reduce<IHeader[]>((prev, cur) => {
    return prev.concat(cur);
  }, []);
  
  return headersList;
};

export default getHeadersList;
