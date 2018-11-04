import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  checkPassageObject,
} from './checkPassageObject';
import {
  getTag,
} from './tagsBundle';
import {
  IPassage,
} from './IPassage';
import {
  IPassagesMap,
} from './IPassagesMap';

import manifest from '../../passages/passages-manifest';

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

/* Memoize results and return them without computation on repeat calls. */
let passagesMap: IPassagesMap | null = null;
let startPassage: IPassage | null = null;

interface IReturn {
  passagesMap: IPassagesMap;
  startPassage: IPassage;
};

export const getPassagesMap = (): IReturn => {
  if (passagesMap && startPassage) {
    return {
      passagesMap,
      startPassage,
    };
  }

  if (!Array.isArray(manifest)) {
    throw new Error(strings.PASSAGES_MANIFEST_INVALID);
  } else if (!manifest.length) {
    throw new Error(strings.PASSAGES_MANIFEST_EMPTY);
  }

  passagesMap = {};
  manifest.forEach((passageFileObj) => {
    const passageObj = passageFileObj.passageObject;
    const checkFailMsg = checkPassageObject(passageObj);
    if (checkFailMsg) {
      const errStr = strings.PASSAGE_OBJECT_INVALID
        .replace('%FILEPATH%', passageFileObj.filepath)
        .replace('%REASON%', checkFailMsg);

      throw new Error(errStr);
    }

    if (passageObj.name in passagesMap!) {
      const errStr = strings.PASSAGE_OBJECT_INVALID
        .replace('%NAME%', passageObj.name);

      throw new Error(errStr);
    }

    if (getTag(passageObj.tags, BuiltInTags.Start)) {
      if (startPassage) {
        const errStr = strings.MULTIPLE_DEFAULT_PASSAGES
          .replace('%1%', startPassage.name)
          .replace('%2%', passageObj.name);

        throw new Error(errStr);
      }

      startPassage = passageObj;
    } else if (getTag(passageObj.tags, BuiltInTags.NoRender)) {
      /* Do not place NoRender passages in the passage map. */
      return;
    }

    passagesMap![passageObj.name] = passageObj;
  });

  if (!startPassage) {
    throw new Error(strings.NO_START_PASSAGE);
  }

  return {
    passagesMap,
    startPassage,
  };
};

export default getPassagesMap;
