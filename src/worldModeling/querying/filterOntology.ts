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
} from '../models/FindModelArgs';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  IModel,
} from '../models/IModel';
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
  parentFilter,
} from './parentFilter';
import {
  worldFilter,
} from './worldFilter';

export const filterOntology = <
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
>(
  obj: IOntology<Type, Being, Knowledge>,
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
      if (key === 'adjacent' && !adjacentFilter(obj, arg)) {
        return false;
      } else if (key === 'ancestors' && !ancestorsFilter(obj, arg)) {
        return false;         
      } else if (key === 'children' && !childrenFilter(obj, arg)) {
        return false;    
      } else if (key === 'connected' && !connectedFilter(obj, arg)) {
        return false;
      } else if (key === 'descendants' && !descendantsFilter(obj, arg)) {
        return false;         
      } else if (key === 'links' && !linksFilter(obj, arg)) {
        return false;    
      } else if (key === 'parent' && !parentFilter(obj, arg)) {
        return false;
      } else {
        throw new Error('Key argument not recognized in filterEpistemology.');
      }
    } else if ((arg as IWorld).models) {
      return worldFilter(obj, arg);
    } else if (Object.values(ModelType).includes(arg)) {
      return modelTypeFilter(obj, arg);
    } else {
      if (key === 'adjacent' && !adjacentFilter(obj, arg.name)) {
        return false;
      } else if (key === 'ancestors' && !ancestorsFilter(obj, arg.name)) {
        return false;         
      } else if (key === 'children' && !childrenFilter(obj, arg.name)) {
        return false;    
      } else if (key === 'connected' && !connectedFilter(obj, arg.name)) {
        return false;
      } else if (key === 'descendants' && !descendantsFilter(obj, arg.name)) {
        return false;         
      } else if (key === 'links' && !linksFilter(obj, arg.name)) {
        return false;    
      } else if (key === 'parent' && !parentFilter(obj, arg.name)) {
        return false;
      } else {
        throw new Error('Key argument not recognized in filterEpistemology.');
      }
    }
  }

  return true;
};
