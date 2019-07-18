import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ModelType,
} from '../models/ModelType';

export interface IThoughtRelation<T extends ModelType> extends IRelation<T> {
  readonly knows: Readonly<Record<string, IModel<T>>>;
  readonly wants: Readonly<Record<string, IModel<T>>>;
  readonly addKnowledge: (model: string | IModel<T>) => void;
  readonly removeKnowledge: (model: string | IModel<T>) => void;
  readonly addWant: (model: string | IModel<T>) => void;
  readonly removeWant: (model: string | IModel<T>) => void;
}
