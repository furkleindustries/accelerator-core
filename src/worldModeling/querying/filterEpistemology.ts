import {
  awareOfFilter,
} from './awareOfFilter';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  FindModelArg,
  FindModelArgs,
} from './FindModelArgs';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  inAwarenessGraphFilter,
} from './inAwarenessGraphFilter';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  thoughtsFilter,
} from './thoughtsFilter';
import {
  wantsFilter,
} from './wantsFilter';

export const filterEpistemology = <
  Type extends EpistemicTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
>(
  obj: IEpistemology<EpistemicTypes, Knowledge>,
  key: keyof Pick<
    FindModelArgs<Type, Being, Knowledge>,
    'awareOf' |
      'inAwarenessGraph' |
      'thoughts' |
      'wants'
  >,

  args: FindModelArg<Type, Being, Knowledge>,
): boolean => {
  for (const arg of args) {
    if (typeof arg === 'string') {
      if (key === 'awareOf' && !awareOfFilter(obj, arg)) {
        return false;
      } else if (key === 'inAwarenessGraph' &&
        !inAwarenessGraphFilter(obj, arg))
      {
        return false;
      } else if (key === 'thoughts' && !thoughtsFilter(obj, arg)) {
        return false;
      } else if (key === 'wants' && !wantsFilter(obj, arg)) {
        return false;
      } else {
        throw new Error('Key argument not recognized in filterEpistemology.');
      }
    } else {
      if (key === 'awareOf' && !awareOfFilter(obj, arg)) {
        return false;
      } else if (key === 'inAwarenessGraph' &&
        !inAwarenessGraphFilter(obj, arg.name))
      {
        return false;
      } else if (key === 'thoughts' && !thoughtsFilter(obj, arg.name)) {
        return false;
      } else if (key === 'wants' && !wantsFilter(obj, arg.name)) {
        return false;
      } else {
        throw new Error('Key argument not recognized in filterEpistemology.');
      }
    }
  }

  return true;
};
