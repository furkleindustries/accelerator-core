import {
  checkFooterObject,
} from './checkFooterObject';
import {
  IFooter,
} from './IFooter';

import manifest from '../../footers/footers-manifest';

export const strings = {
  FOOTERS_MANIFEST_INVALID:
    'The footers-manifest.json file was not parseable into an array.',

  FOOTER_OBJECT_INVALID:
    'One of the footer objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

/* Memoize results and return them without computation on repeat calls. */
let footersList: IFooter[] | null = null;

export const getFootersList = (): IFooter[] => {
  if (footersList) {
    return footersList;
  }

  if (!Array.isArray(manifest)) {
    throw new Error(strings.FOOTERS_MANIFEST_INVALID);
  }

  const footersPrecedenceMap: { [key: string]: IFooter[], } & { none: IFooter[], } = {
    none: [],
  };

  manifest.forEach((footerFileObj) => {
    const footerObj = footerFileObj.footerObject;
    const checkFailMsg = checkFooterObject(footerObj);
    if (checkFailMsg) {
      const errStr = strings.FOOTER_OBJECT_INVALID
        .replace('%FILEPATH%', footerFileObj.filepath)
        .replace('%REASON%', checkFailMsg);

      throw new Error(errStr);
    }

    if (footerObj.precedence! > 0) {
      const precedence = footerObj.precedence!.toString();
      if (!footersPrecedenceMap[precedence]) {
        footersPrecedenceMap[precedence] = [];
      }

      footersPrecedenceMap[precedence].push(footerObj);
    } else {
      footersPrecedenceMap.none.push(footerObj);
    }
  });

  /* Sort precedence in descending lexicographic order. In practice, this means
     4, 3, 2, 1, and then 'none' is always appended. */
  const keys = Object.keys(footersPrecedenceMap).sort((aa, bb) => {
    if (aa === 'none') {
      return 1;
    } else if (bb === 'none') {
      return -1;
    } else if (aa > bb) {
      return -1;
    } else if (aa === bb) {
      return 0;
    } else {
      return 1;
    }
  });

  footersList = keys.map<IFooter[]>((key) => (
    /* Sort the footers in each precedence in ascending lexicographic
     * order. */
    footersPrecedenceMap[key].sort((aa, bb) => {
      if (aa.name < bb.name) {
        return -1;
      } else if (aa.name === bb.name) {
        return 0;
      } else {
        return 1;
      }
    })
  )).reduce<IFooter[]>((prev, cur) => {
    return prev.concat(cur);
  }, []);
  
  return footersList;
};
