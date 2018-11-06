import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  createCurrentPassageNameAction,
} from '../actions/creators/createCurrentPassageNameAction';
import {
  createPassageHistoryNewAction,
} from '../actions/creators/createPassageHistoryNewAction';
import {
  createStartPassageNameAction,
} from '../actions/creators/createStartPassageNameAction';
import {
  createStoryStateNewAction,
} from '../actions/creators/createStoryStateNewAction';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
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


  PASSAGES_MANIFEST_EMPTY:
    'The passages-manifest.json file contained an empty array, indicating ' +
    'that no passages have been authored in passages/.',

  PASSAGES_MANIFEST_INVALID:
    'The passages-manifest.json file was not parseable into an array.',

  PASSAGE_OBJECT_INVALID:
    'One of the passage objects, found at %FILEPATH%, was invalid. ' +
    '%REASON%.',
};

export const initializeStore = (store: Store) => {
  const {
    startPassage,
  } = getPassagesMap();

  const name = startPassage.name;
  store.dispatch(createStartPassageNameAction(name));
  store.dispatch(createCurrentPassageNameAction(name));
  store.dispatch(createStoryStateNewAction());
  store.dispatch(createPassageHistoryNewAction(
    {
      name,
      linkTags: [
        BuiltInTags.Start,
      ],
    },
  ));
};
