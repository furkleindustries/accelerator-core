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
  IPassagesMap,
} from './IPassagesMap';
import {
  assert,
  assertValid,
} from 'ts-assertions';

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
    '%REASON%',
};

assert(Array.isArray(manifest), strings.PASSAGES_MANIFEST_INVALID);
assert(manifest.length, strings.PASSAGES_MANIFEST_EMPTY);

/* Memoize results and return them without computation on repeat calls. */
let passagesMap: IPassagesMap | null = null;
let startPassageName: string | null = null;

export function getPassagesMapAndStartPassageName(): {
  passagesMap: IPassagesMap;
  startPassageName: string;
} {
  
  /* Return the memoized results if they exist. */
  if (passagesMap && startPassageName) {
    return {
      passagesMap,
      startPassageName,
    };
  }
  

  passagesMap = {};

  manifest.forEach(({
    filepath,
    passageObject,
  }) => {
    try {
      checkPassageObject(passageObject);
    } catch (err) {
      const errStr = strings.PASSAGE_OBJECT_INVALID
        .replace('%FILEPATH%', filepath)
        .replace('%REASON%', err);

      throw new Error(errStr);
    }

    const {
      name,
      tags,
    } = passageObject;

    assert(
      !(name in passagesMap!),
      strings.PASSAGE_OBJECT_INVALID
        .replace('%NAME%', passageObject.name),
    );

    if (getTag(tags, BuiltInTags.Start)) {
      /* Throw if a passage with a duplicate name is found. */
      if (startPassageName) {
        throw new Error(
          strings.MULTIPLE_DEFAULT_PASSAGES
            .replace('%1%', startPassageName)
            .replace('%2%', passageObject.name)
        );
      }

      startPassageName = passageObject.name;
    }

    if (!getTag(passageObject.tags, BuiltInTags.NoRender)) {
      /* Do not place NoRender passages in the passage map. */
      passagesMap![name] = passageObject;
    }
  });

  const safeStartPassageName = assertValid<string>(
    startPassageName,
    strings.NO_START_PASSAGE,
  );

  return {
    passagesMap,
    startPassageName: safeStartPassageName,
  };
}