import {
  BaseAdjacencies,
} from '../ontology/BaseAdjacencies';
import {
  ContainmentTypes,
} from './ContainmentTypes';
import {
  FindAdjacencyArgs,
  IFindBaseArgs,
  FindAdjacencyArg,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ISerializedAdjacencyRelation,
} from './ISerializedAdjacencyRelation';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IAdjacencyRelation<
  Type extends OnticTypes,
  Being extends OnticTypes,
  T extends IAdjacencyRelation<Type, Being, any>,
> extends IRelation<Type, T>
{
  readonly modelType: Type;

  readonly neighbors: Readonly<
    Map<BaseAdjacencies, readonly IModel<Type, Being, ModelType>[]>
  >;

  readonly addNeighbor: <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ) => void;

  readonly clone: (self: T) => T;
  readonly destroy: (self: T) => void;
  readonly find: (
    args: string |
      FindAdjacencyArg<OnticTypes, OnticTypes, ModelType> |
      (IFindBaseArgs<ContainmentTypes> &
        FindAdjacencyArgs<ContainmentTypes, Being, ModelType>),
  ) => IModel<ContainmentTypes, Being, ModelType> | null;

  readonly findAll: (
    args: '*' |
      FindAdjacencyArg<OnticTypes, OnticTypes, ModelType> |
      (IFindBaseArgs<ContainmentTypes> &
        FindAdjacencyArgs<ContainmentTypes, Being, ModelType>),
  ) => readonly IModel<ContainmentTypes, Being, ModelType>[];

  readonly findAllGenerator: (
    args: '*' |
      FindAdjacencyArg<OnticTypes, OnticTypes, ModelType> |
      IFindBaseArgs<ContainmentTypes> &
        FindAdjacencyArgs<ContainmentTypes, Being, ModelType>,
  ) => IterableIterator<IModel<ContainmentTypes, Being, ModelType>>;

  readonly removeNeighbor: <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ) => void;

  readonly serialize: (
    self: T,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (self: T) => ISerializedAdjacencyRelation;
}
