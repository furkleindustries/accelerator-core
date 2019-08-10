import {
  BaseAdjacencies,
} from '../ontology/BaseAdjacencies';
import {
  FindAdjacencyArgs,
  IFindBaseArgs,
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

  readonly find: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: string |
      IFindBaseArgs<Type> & FindAdjacencyArgs<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge> | null;

  readonly findAll: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<Type> & FindAdjacencyArgs<Type, Being, Knowledge>,
  ) => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly findAllGenerator: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<Type> & FindAdjacencyArgs<Type, Being, Knowledge>,
  ) => IterableIterator<IModel<Type, Being, Knowledge>>;

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
