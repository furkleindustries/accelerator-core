import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';

export interface IContainmentRelation<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> extends IRelation<Type> {
  readonly children: Readonly<Record<string, IModel<Type, Being, Knowledge>>>;
  readonly parent: IModel<ModelType, ModelType, ModelType> | IWorld;
  readonly addChild: (model: string | IModel<Exclude<Type, ModelType.Portal>, Being, Knowledge>) => void;

  readonly ancestors: (
    args: 'world' | string | FindModelArgs<ModelType, ModelType, ModelType>,
  ) => ReadonlyArray<IWorld | IModel<ModelType, ModelType, ModelType>>;

  readonly descendants: () => ReadonlyArray<IModel<Type, Being, Knowledge>>;
  readonly findAllParents: (
    args: 'world' | string | FindModelArgs<ModelType, ModelType, ModelType>,
  ) => ReadonlyArray<IWorld | IModel<ModelType, ModelType, ModelType>>;

  readonly findParent: (
    args: 'world' | string | FindModelArgs<ModelType, ModelType, ModelType>,
  ) => IWorld | IModel<ModelType, ModelType, ModelType> | null;    

  readonly parents: () => ReadonlyArray<
    IModel<ModelType, ModelType, ModelType> | IWorld
  >;

  readonly removeChild: (
    model: string |
      IModel<Exclude<Type, ModelType.Portal>, Being, Knowledge>,
  ) => void;
}
