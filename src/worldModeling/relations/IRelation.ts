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

export interface IRelation<
  Type extends ModelType,
> {
  readonly modelType: ModelType;
  readonly tags: readonly ITag[];
  readonly world: IWorld;

  readonly addTag: (tag: ITag) => void;
  readonly clone: (self: T) => T;
  readonly destroy: (self: T) => void;

  readonly find: (
    args: string | IFindBaseArgs<ModelType>,
  ) => IModel<ModelType, OnticTypes, ModelType> | null;

  readonly findAll: (
    args: '*' | IFindBaseArgs<ModelType>,
  ) => readonly IModel<ModelType, OnticTypes, ModelType>[];

  readonly findAllGenerator: (
    args: '*' | IFindBaseArgs<ModelType>,
  ) => IterableIterator<IModel<ModelType, OnticTypes, ModelType>>;

  readonly removeTag: (tag: ITag) => void;
  readonly serialize: (self: T, spaces?: number) => string;
  readonly serializeToObject: (self: T) => Readonly<Record<string, any>>;

  readonly finalize?: (self: T) => void;
  readonly initialize?: (self: T) => void;
}
