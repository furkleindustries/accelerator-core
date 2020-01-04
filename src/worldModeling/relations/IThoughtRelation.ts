import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  IFindBaseArgs,
  FindThoughtArgs,
} from '../querying/FindModelArgs';
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
  Type extends EpistemicTypes | ModelType.Thought,
  Knowledge extends ModelType,
> extends IRelation<Type>
{
  readonly knowledge: readonly IModel<ModelType, OnticTypes, Knowledge>[];
  readonly modelType: Type;
  readonly wants: readonly IModel<ModelType, OnticTypes, Knowledge>[];

  readonly addKnowledge: (
    model: IModel<ModelType, OnticTypes, Knowledge>,
  ) => void;

  readonly addWant: (
    model: IModel<ModelType, OnticTypes, Knowledge>,
  ) => void;
  
  readonly find: <K extends Knowledge>(
    args: string |
      IFindBaseArgs<ModelType> & FindThoughtArgs<ModelType.Actor, K>,
  ) => IModel<ModelType, OnticTypes, K> | null;

  readonly findAll: <K extends Knowledge>(
    args: '*' |
      IFindBaseArgs<ModelType> & FindThoughtArgs<ModelType.Actor, K>,
  ) => readonly IModel<ModelType, OnticTypes, K>[];

  readonly findAllGenerator: <K extends Knowledge>(
    args: '*' |
      IFindBaseArgs<ModelType> & FindThoughtArgs<ModelType.Actor, K>,
  ) => IterableIterator<IModel<ModelType, OnticTypes, K>>;

  readonly removeKnowledge: (
    model: IModel<Type, OnticTypes, Knowledge>,
  ) => void;

  readonly removeWant: (
    model: IModel<ModelType, OnticTypes, Knowledge>,
  ) => void;

  readonly serializeToObject: (
    self: IThoughtRelation<Type, Knowledge>,
  ) => ISerializedThoughtRelation;
}
