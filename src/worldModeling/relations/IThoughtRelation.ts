import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ModelType,
} from '../models/ModelType';

export interface IThoughtRelation<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IRelation<Type> {
  readonly knows: Readonly<Record<string, IModel<Type, Being, Knowledge>>>;
  readonly wants: Readonly<Record<string, IModel<Type, Being, Knowledge>>>;

  readonly addKnowledge: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly removeKnowledge: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly addWant: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly removeWant: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;
}
