import {
  FindAdjacencyArg,
} from './FindModelArgs';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from '../models/ModelType';
import {
  NoThought,
} from '../models/NoThought';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export const adjacentFilter = <
  Type extends OnticTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
>(
  ontology: IOntology<NoThought<ModelType>, OnticTypes>,
  arg: string | FindAdjacencyArg<Type, Being, Knowledge>,
): boolean => Boolean(ontology.adjacency.find(arg));
