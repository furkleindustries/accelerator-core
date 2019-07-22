import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  ContainableTypes,
} from './ContainableTypes';
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
  Type extends ContainableTypes,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> extends IRelation<Type> {
  readonly children: Readonly<Record<string, IModel<Type, Being, Knowledge>>>;
  readonly parent: Type extends ModelType.Location ?
    IWorld :
    IModel<ModelType, BeingNoThoughtsBase, ModelType>;

  readonly addChild: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;

  readonly ancestors: (
    args: 'world' |
      string |
      FindModelArgs<ModelType, BeingNoThoughtsBase, ModelType>,
  ) => ReadonlyArray<
    IWorld | IModel<ModelType, BeingNoThoughtsBase, ModelType>
  >;

  readonly descendants: () => ReadonlyArray<IModel<Type, Being, Knowledge>>;

  readonly findAllParents: (
    args: 'world' |
      string |
      FindModelArgs<ModelType, BeingNoThoughtsBase, ModelType>,
  ) => ReadonlyArray<
    IWorld | IModel<ModelType, BeingNoThoughtsBase, ModelType>
  >;

  readonly findParent: (
    args: 'world' |
      string |
      FindModelArgs<ModelType, BeingNoThoughtsBase, ModelType>,
  ) => IWorld |
    IModel<ModelType, BeingNoThoughtsBase, ModelType> |
    null;

  readonly parents: () => ReadonlyArray<
    IModel<ModelType, BeingNoThoughtsBase, ModelType> | IWorld
  >;

  readonly removeChild: (
    model: string | IModel<Type, Being, Knowledge>,
  ) => void;
}
