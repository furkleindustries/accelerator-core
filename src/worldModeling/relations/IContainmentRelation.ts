import {
  ContainableTypes,
} from './ContainableTypes';
import {
  ContainingTypes,
} from './ContainingTypes';
import {
  IFindBaseArgs,
  FindContainmentArgs,
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
  Type extends (ContainableTypes | ContainingTypes),
  Being extends OnticTypes,
> extends IRelation<Type>
{
  readonly parent: Type extends ModelType.Location ?
    IWorld :
    IModel<ContainingTypes, ContainableTypes, ModelType>;

  readonly find: <Being extends OnticTypes>(
    args: string |
      IFindBaseArgs<ModelType> & FindContainmentArgs<ContainableTypes, Being>,
  ) => IModel<ModelType, Being, ModelType> | null;

  readonly findAll: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<Type> & FindContainmentArgs<ContainableTypes, Being>,
  ) => ReadonlyArray<IModel<ModelType, Being, Knowledge>>;

  readonly findAllGenerator: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<Type> & FindContainmentArgs<ContainableTypes, Being>,
  ) => IterableIterator<IModel<ModelType, Being, Knowledge>>;

  readonly parents: (
    args: string |
      IFindBaseArgs<Type> &
        FindContainmentArgs<ContainableTypes, OnticTypes>,
  ) => ReadonlyArray<IModel<ModelType, OnticTypes, ModelType> | IWorld>;

  readonly serialize: (
    self: IContainmentRelation<Type, Being>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IContainmentRelation<Type, Being>,
  ) => ISerializedContainmentRelation;

  readonly children: Type extends ContainingTypes ?
    ReadonlyArray<IModel<ModelType, Being, ModelType>> :
    null;

  readonly addChild: Type extends ContainingTypes ?
    (model: IModel<ModelType, Being, ModelType>) => void :
    null;

  readonly descendants: Type extends ContainingTypes ?
    () => ReadonlyArray<IModel<ModelType, Being, ModelType>> :
    null;

  readonly removeChild: Type extends ContainingTypes ?
    (model: IModel<Type, Being, ModelType>) => void :
    null;
}
