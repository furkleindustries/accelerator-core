import {
  BaseAdjacencies,
} from '../ontology/BaseAdjacencies';
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
import { ContainmentTypes } from './ContainmentTypes';

export interface IAdjacencyRelation<
  Type extends OnticTypes,
  Being extends OnticTypes,
> extends IRelation<Type>
{
  readonly modelType: Type;

  readonly neighbors: Readonly<
    Map<BaseAdjacencies, ReadonlyArray<IModel<Type, Being, ModelType>>>
  >;

  readonly addNeighbor: <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ) => void;

  readonly clone: (
    self: IAdjacencyRelation<Type, Being>,
  ) => IAdjacencyRelation<Type, Being>;

  readonly destroy: (self: IAdjacencyRelation<Type, Being>) => void;

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
  ) => ReadonlyArray<IModel<ContainmentTypes, Being, ModelType>>;

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
    self: IAdjacencyRelation<Type, Being>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IAdjacencyRelation<Type, Being>,
  ) => ISerializedAdjacencyRelation;
}
