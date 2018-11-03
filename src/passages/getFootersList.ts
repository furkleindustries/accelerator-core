import {
  checkFooterObject,
} from './checkFooterObject';
import {
  IFooter,
} from './IFooter';

// @ts-ignore
import footersManifest from '../../footers/footers-manifest.json';

// tslint:disable
// @ts-ignore
const slash = require('slash');
// tslint:enable

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

  if (!Array.isArray(footersManifest)) {
    throw new Error(strings.FOOTERS_MANIFEST_INVALID);
  }

  const footersPrecedenceMap: { [key: string]: IFooter[], } & { none: IFooter[], } = {
    none: [],
  };

  let footerObjects: IFooter[];
  try {
    footerObjects = footersManifest.map((path) => (
      /* Give webpack hints about where we're importing. If you don't do this,
       * webpack will bundle a lot of stuff you don't care about and show you a
       * confusing error about "Critical dependencies.""
       * 
       * I had a much nicer async/import() setup here but rendering after a
       * promise resolves was not working at all, and it's doubtful anyone is
       * going to try to kitbash this into an SSR setup, so the client-side
       * difference is effectively nil.
       * 
       * Note also that requires frequently fail in the browser when using
       * Windows filepaths (modules are standardized with forward slashes)
       * so the call to slash should ameliorate this issue. */
      // @ts-ignore
      require(`../../footers/${slash(path)}`)
    )).map((aa) => aa.default);
  } catch (err) {
    throw err;
  }

  footerObjects.forEach((footerObj, index) => {
    const checkFailMsg = checkFooterObject(footerObj);
    if (checkFailMsg) {
      const errStr = strings.FOOTER_OBJECT_INVALID
        .replace('%FILEPATH%', footersManifest[index])
        .replace('%REASON%', checkFailMsg);

      throw new Error(errStr);
    }

    if (typeof footerObj.precedence === 'number' &&
        !Number.isNaN(footerObj.precedence))
    {
      const precedence = footerObj.precedence.toString();
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

export default getFootersList;
