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
  FindModelArgs,
} from './FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  isModelType,
} from '../typeGuards/isModelType';
import {
  IWorld,
} from '../world/IWorld';
import {
  linksFilter,
} from './linksFilter';
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
import {
  WorldType,
} from '../world/WorldType';

export const filterOntology = <
  Type extends ModelType,
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

  args: Array<string | ModelType | IWorld | IModel<Type, Being, Knowledge>>,
): boolean => {
  for (const arg of args) {
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
    } else if (arg.type === WorldType) {
      return worldFilter(obj, arg);
    } else if (isModelType(arg)) {
      return modelTypeFilter(obj, arg);
    } else {
      if (key === 'adjacent' && adjacentFilter(obj, arg.name)) {
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
    }
  }

  return false;
};
