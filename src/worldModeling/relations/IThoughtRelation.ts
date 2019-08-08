import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ISerializedThoughtRelation,
} from './ISerializedThoughtRelation';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IThoughtRelation<
  Type extends ModelType,
  Knowledge extends ModelType,
> extends IRelation<Type>
{
  readonly knowledge: ReadonlyArray<IModel<Type, OnticTypes, Knowledge>>;
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

  readonly serializeToObject: (
    self: IThoughtRelation<Type, Knowledge>,
  ) => ISerializedThoughtRelation;
}
