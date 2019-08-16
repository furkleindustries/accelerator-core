import {
  adjacentFilter,
} from './adjacentFilter';
import {
  ancestorsFilter,
} from './ancestorsFilter';
import {
  childrenFilter,
} from './childrenFilter';
import {
  connectedFilter,
} from './connectedFilter';
import {
  descendantsFilter,
} from './descendantsFilter';
import {
  FilterArrayArg,
} from './FilterArrayArg';
import {
  FindModelArgs,
} from './FindModelArgs';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  isFindAdjacencyArg,
} from '../typeGuards/isFindAdjacencyArg';
import {
  isModel,
} from '../typeGuards/isModel';
import {
  isModelType,
} from '../typeGuards/isModelType';
import {
  isWorld,
} from '../typeGuards/isWorld';
import {
  IWorld,
} from '../world/IWorld';
import {
  linksFilter,
} from './linksFilter';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ModelType,
} from '../models/ModelType';
import {
  modelTypeFilter,
} from './modelTypeFilter';
import {
  NoThought,
} from '../models/NoThought';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  parentFilter,
} from './parentFilter';
import {
  worldFilter,
} from './worldFilter';

export const filterOntology = <
  Type extends OnticTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
>(
  obj: IOntology<NoThought<ModelType>, Being>,
  key: keyof Pick<
    FindModelArgs<Type, Being, Knowledge>,
    'adjacent' |
      'ancestors' |
      'children' |
      'connected' |
      'descendants' |
      'links' |
      'parent'
  >,

  args: MaybeReadonlyArray<FilterArrayArg<Type, Being, Knowledge>> | IWorld,
): boolean => {
  if (isWorld(args)) {
    return worldFilter(obj, args);
  }

  for (const arg of args as Exclude<typeof args, IWorld>) {
    if (typeof arg === 'string') {
      if (key === 'adjacent' && adjacentFilter(obj, arg)) {
        return true;
      } else if (key === 'ancestors' && ancestorsFilter(obj, arg)) {
        return true;
      } else if (key === 'children' && childrenFilter(obj, arg)) {
        return true;
      } else if (key === 'connected' && connectedFilter(obj, arg)) {
        return true;
      } else if (key === 'descendants' && descendantsFilter(obj, arg)) {
        return true;
      } else if (key === 'links' && linksFilter(obj, arg)) {
        return true;
      } else if (key === 'parent' && parentFilter(obj, arg)) {
        return true;
      } else {
        throw new Error('Key argument not recognized in filterEpistemology.');
      }
    } else if (isModelType(arg)) {
      return modelTypeFilter(obj, arg);
    } else if (isWorld(arg)) {
      return worldFilter(obj, arg);
    } else if (isModel(arg)) {
      if (key === 'adjacent' &&
        isFindAdjacencyArg(arg) &&
        adjacentFilter(obj, arg))
      {
        return true;
      } else if (key === 'ancestors' && ancestorsFilter(obj, arg.name)) {
        return true;
      } else if (key === 'children' && childrenFilter(obj, arg.name)) {
        return true;
      } else if (key === 'connected' && connectedFilter(obj, arg.name)) {
        return true;
      } else if (key === 'descendants' && descendantsFilter(obj, arg.name)) {
        return true;
      } else if (key === 'links' && linksFilter(obj, arg.name)) {
        return true;
      } else if (key === 'parent' && parentFilter(obj, arg.name)) {
        return true;
      } else {
        throw new Error('Key argument not recognized in filterEpistemology.');
      }
    } else {
      throw new Error('Argument to filterOntology not recognized.');
    }
  }

  return false;
};
