import {
  checkPassageObject,
} from './checkPassageObject';
import {
  createCurrentPassageNameAction,
} from '../actions/creators/createCurrentPassageNameAction';
import {
  createPassagesAction,
} from '../actions/creators/createPassagesAction';
import {
  createStartPassageNameAction,
} from '../actions/creators/createStartPassageNameAction';
import {
  IPassage,
} from '../passages/IPassage';
import {
  Store,
} from 'redux';

export const strings = {
  MULTIPLE_DEFAULT_PASSAGES:
  'At least two passages had the tag "start". Only one tag is allowed. ' +
  'The passages found with this error were named %1% and %2%.',
  
  MULTIPLE_PASSAGES_WITH_SAME_NAME:
  'At least two passages had the name %NAME%. The name property of every ' +
  'passage must be unique.',

  NO_START_PASSAGE:
    'There was no passage in the passages/ folder with the "start" tag. One ' +
    'and only one passage must have the start tag.',

  PASSAGES_MANIFEST_EMPTY:
    'The passages-manifest.json file contained an empty array, indicating ' +
    'that no passages have been authored in passages/.',

  PASSAGES_MANIFEST_INVALID:
    'The passages-manifest.json file was not parseable into an array.',

  PASSAGE_OBJECT_INVALID:
    'One of the passage objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

export const populateStoreWithPassages = (store: Store, passagesManifest: string[]) => {
  if (!Array.isArray(passagesManifest)) {
    throw new Error(strings.PASSAGES_MANIFEST_INVALID);
  } else if (!passagesManifest.length) {
    throw new Error(strings.PASSAGES_MANIFEST_EMPTY);
  }

  let passageObjects: IPassage[];
  try {
    passageObjects = passagesManifest.map((path) => (
      /* Give webpack hints about where we're importing. If you don't do this,
       * webpack will bundle a lot of stuff you don't care about and show you a
       * confusing error about "Critical dependencies.""
       * 
       * I had a much nicer async/import() setup here but rendering after a
       * promise resolves was not working at all, and it's doubtful anyone is
       * going to try to kitbash this into an SSR setup, so the client-side
       * difference is effectively nil. */
      // @ts-ignore
      require(`../../passages/${path}`)
    )).map((aa) => aa.default);
  } catch (err) {
    throw err;
  }

  const passageMap = {};
  let startPassage: IPassage | null = null;
  passageObjects.forEach((passageObj, index) => {
    const checkFailMsg = checkPassageObject(passageObj);
    if (checkFailMsg) {
      const errStr = strings.PASSAGE_OBJECT_INVALID
        .replace('%FILEPATH%', passagesManifest[index])
        .replace('%REASON%', checkFailMsg);

      throw new Error(errStr);
    }

    if (passageObj.name in passageMap) {
      const errStr = strings.PASSAGE_OBJECT_INVALID
        .replace('%NAME%', passageObj.name);

      throw new Error(errStr);
    }

    if (passageObj.tags && passageObj.tags.indexOf('start') !== -1) {
      if (startPassage) {
        const errStr = strings.MULTIPLE_DEFAULT_PASSAGES
          .replace('%1%', startPassage.name)
          .replace('%2%', passageObj.name);

        throw new Error(errStr);
      }

      startPassage = passageObj;
    }

    passageMap[passageObj.name] = passageObj;
  });

  if (!startPassage) {
    throw new Error(strings.NO_START_PASSAGE);
  }

  store.dispatch(createPassagesAction(passageMap));
  store.dispatch(createStartPassageNameAction(startPassage!.name));
  store.dispatch(createCurrentPassageNameAction(startPassage!.name));
};

export default populateStoreWithPassages;
