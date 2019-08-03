import {
  BaseAdjacencies,
} from '../ontology/BaseAdjacencies';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
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
  readonly neighbors: Readonly<
    Map<BaseAdjacencies, ReadonlyArray<IModel<Type, Being, ModelType>>>
  >;

  readonly addNeighbor: <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ) => void;

  readonly removeNeighbor: <T extends BaseAdjacencies = BaseAdjacencies>(
    adjacency: T,
    model: IModel<Type, Being, ModelType>,
  ) => void;
}
