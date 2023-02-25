import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  checkPassageAsset,
} from './checkPassageAsset';
import {
  getTag,
} from '../tags/getTag';
import {
  IPassagesMap,
} from './IPassagesMap';
import {
  default as manifest,
} from '../../passages/passages-manifest';
import {
  assert,
} from 'ts-assertions';

export const strings = {
  MULTIPLE_PASSAGES_WITH_SAME_NAME:
    'At least two passages had the name %NAME%. The name property of every ' +
      'passage must be unique.',

  PASSAGES_MANIFEST_EMPTY:
    'The passages-manifest.json file contained an empty array, indicating ' +
      'that no passages have been authored in `passages/`.',

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

export const getPassagesMap = (): IPassagesMap => {
  const localStartPassageMap = passagesMap;

  /* Return the memoized results if they exist. */
  if (localStartPassageMap) {
    return { ...localStartPassageMap };
  }

  const passagesMapObj = {} as IPassagesMap;

  manifest.forEach(({
    asset,
    filepath,
  }) => {
    const baseErrorStr = strings.PASSAGE_OBJECT_INVALID
      .replace('%FILEPATH%', filepath);

    try {
      checkPassageAsset(asset);
    } catch (err) {
      const errStr = baseErrorStr.replace('%REASON%', err);
      throw new Error(errStr);
    }

    const {
      name,
      tags,
    } = asset;

    assert(
      !(name in passagesMapObj),
      baseErrorStr.replace(
        '%REASON%',
        'Passage was not found in the passages map.',
      ),
    );

    if (!getTag(tags, BuiltInTags.NoRender)) {
      /* Do not place NoRender passages in the passage map. */
      passagesMapObj[name] = asset;
    }
  });

  passagesMap = passagesMapObj;

  return { ...passagesMap };
};
