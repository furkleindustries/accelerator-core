import {
  FindAdjacencyArg,
  FindModelArg,
} from './FindModelArgs';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  NoThought,
} from '../models/NoThought';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export type FilterArrayArg<
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> = FindModelArg<Type, Being, Knowledge> |
  FindAdjacencyArg<NoThought<Type>, Being, Knowledge> |
  IWorld;
