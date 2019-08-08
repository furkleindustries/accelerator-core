import {
  ContainableTypes,
} from './ContainableTypes';
import {
  ContainmentTypes,
} from './ContainmentTypes';
import {
  FindModelArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  ISerializedContainmentRelation,
} from './ISerializedContainmentRelation';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IContainmentRelation<
  Type extends ContainmentTypes,
  Being extends OnticTypes,
> extends IRelation<Type>
{
  readonly children: ReadonlyArray<IModel<Type, Being, ModelType>>;
  readonly parent: Type extends ModelType.Location ?
    IWorld :
    IModel<ContainmentTypes, ContainableTypes, ModelType>;

  readonly addChild: (model: IModel<Type, Being, ModelType>) => void;

  readonly descendants: () => ReadonlyArray<IModel<Type, Being, ModelType>>;

  readonly parents: (
    args: string | FindModelArgs<ModelType, OnticTypes, ModelType>,
  ) => ReadonlyArray<
    IModel<ModelType, OnticTypes, ModelType> | IWorld
  >;

  readonly removeChild: (
    model: IModel<Type, Being, ModelType>,
  ) => void;

  readonly serialize: (
    self: IContainmentRelation<Type, Being>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IContainmentRelation<Type, Being>,
  ) => ISerializedContainmentRelation;
}
