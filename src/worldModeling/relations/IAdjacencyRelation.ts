import {
  BaseAdjacencies,
} from '../models/BaseAdjacencies';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ModelType,
} from '../models/ModelType';

export interface IAdjacencyRelation<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IRelation<Type> {
  readonly neighbors: Readonly<Map<BaseAdjacencies, any>>;
  readonly addNeighbor: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly removeNeighbor: (
    tag: string | IModel<Type, Being, Knowledge>,
  ) => void;
}
