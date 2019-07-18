import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ModelType,
} from '../models/ModelType';

export interface IAwarenessRelation<T extends ModelType> extends IRelation<T> {
  readonly perceives: Readonly<Record<string, IModel<T>>>;
  readonly addPerception: (model: string | IModel<T>) => void;
  readonly removePerception: (tag: string | IModel<T>) => void;
}
