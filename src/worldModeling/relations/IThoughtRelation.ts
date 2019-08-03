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

export interface IThoughtRelation<
  Type extends ModelType,
  Knowledge extends ModelType,
> extends IRelation<Type> {
  readonly knows: ReadonlyArray<IModel<Type, OnticTypes, Knowledge>>;
  readonly wants: ReadonlyArray<IModel<Type, OnticTypes, Knowledge>>;

  readonly addKnowledge: (
    model: IModel<Type, OnticTypes, Knowledge>,
  ) => void;

  readonly removeKnowledge: (
    model: IModel<Type, OnticTypes, Knowledge>,
  ) => void;

  readonly addWant: (
    model: IModel<Type, OnticTypes, Knowledge>,
  ) => void;

  readonly removeWant: (
    model: IModel<Type, OnticTypes, Knowledge>,
  ) => void;
}
