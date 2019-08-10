import {
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  ITag,
} from '../../tags/ITag';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IRelation<Type extends ModelType> {
  readonly modelType: ModelType;
  readonly tags: ReadonlyArray<ITag>;
  readonly world: IWorld;

  readonly addTag: (tag: ITag) => void;
  readonly clone: (self: IRelation<Type>) => any;
  readonly destroy: (self: IRelation<Type>) => void;

  readonly find: (
    args: string | IFindBaseArgs<ModelType>,
  ) => IModel<ModelType, OnticTypes, ModelType> | null;

  readonly findAll: (
    args: '*' | IFindBaseArgs<ModelType>,
  ) => ReadonlyArray<IModel<ModelType, OnticTypes, ModelType>>;

  readonly findAllGenerator: (
    args: '*' | IFindBaseArgs<ModelType>,
  ) => IterableIterator<IModel<ModelType, OnticTypes, ModelType>>;

  readonly removeTag: (tag: ITag) => void;
  readonly serialize: (self: IRelation<Type>, spaces?: number) => string;
  readonly serializeToObject: (
    self: IRelation<Type>,
  ) => Readonly<Record<string, any>>;
}
