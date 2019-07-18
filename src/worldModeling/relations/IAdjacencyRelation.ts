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

export interface IAdjacencyRelation<T extends ModelType> extends IRelation<T> {
  readonly neighbors: Readonly<Map<BaseAdjacencies, any>>;
  readonly addNeighbor: (model: string | IModel<T>) => void;
  readonly removeNeighbor: (tag: string | IModel<T>) => void;
}
