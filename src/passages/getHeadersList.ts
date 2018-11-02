import {
  checkHeaderObject,
} from './checkHeaderObject';
import {
  IHeader,
} from './IHeader';

// @ts-ignore
import headersManifest from '../../passages/headers-manifest.json';

// tslint:disable
// @ts-ignore
const slash = require('slash');
// tslint:enable

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

  if (!Array.isArray(headersManifest)) {
    throw new Error(strings.HEADERS_MANIFEST_INVALID);
  }

  const headersPrecedenceMap: { [key: string]: IHeader[], } & { none: IHeader[], } = {
    none: [],
  };

  let headerObjects: IHeader[];
  try {
    headerObjects = headersManifest.map((path) => (
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
      require(`../../passages/${slash(path)}`)
    )).map((aa) => aa.default);
  } catch (err) {
    throw err;
  }

  headerObjects.forEach((HeaderObj, index) => {
    const checkFailMsg = checkHeaderObject(HeaderObj);
    if (checkFailMsg) {
      const errStr = strings.HEADER_OBJECT_INVALID
        .replace('%FILEPATH%', headersManifest[index])
        .replace('%REASON%', checkFailMsg);

      throw new Error(errStr);
    }

    if (typeof HeaderObj.precedence === 'number' &&
        !Number.isNaN(HeaderObj.precedence))
    {
      const precedence = HeaderObj.precedence.toString();
      if (!headersPrecedenceMap[precedence]) {
        headersPrecedenceMap[precedence] = [];
      }

      headersPrecedenceMap[precedence].push(HeaderObj);
    } else {
      headersPrecedenceMap.none.push(HeaderObj);
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
