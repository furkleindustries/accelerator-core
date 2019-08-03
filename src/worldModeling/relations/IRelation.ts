import {
  FindModelArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  ITag,
} from '../../tags/ITag';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IRelation<Type extends ModelType> {
  readonly modelType: ModelType;
  readonly tags: ReadonlyArray<ITag>;
  readonly world: IWorld;

  readonly addTag: (tag: ITag) => void;
  readonly clone: () => any;
  readonly destroy: () => void;

  readonly find: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: string | FindModelArgs<Type, Being, Knowledge>,
  ) => IModel<Type, Being, Knowledge> | null;

  readonly findAll: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' | FindModelArgs<Type, Being, Knowledge>,
  ) => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly findAllGenerator: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' | FindModelArgs<Type, Being, Knowledge>,
  ) => IterableIterator<IModel<Type, Being, Knowledge>>;

  readonly removeTag: (tag: ITag) => void;
}
