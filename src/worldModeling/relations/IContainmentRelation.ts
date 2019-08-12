import {
  ContainableTypes,
} from './ContainableTypes';
import {
  ContainingTypes,
} from './ContainingTypes';
import {
  ContainmentTypes,
} from './ContainmentTypes';
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

export interface IContainmentRelation<
  Type extends ContainmentTypes,
  Being extends ContainmentTypes,
> extends IRelation<Type>
{
  readonly parent: Type extends ModelType.Location ?
    IWorld :
    IModel<ContainingTypes, ContainableTypes, ModelType>;

  readonly find: (
    args: string |
      IFindBaseArgs<ContainableTypes> &
        FindContainmentArgs<ContainableTypes, Being & ModelType.Portal>,
  ) => IModel<ContainableTypes, Being, ModelType> | null;

  readonly findAll: (
    args: '*' |
      IFindBaseArgs<ContainableTypes> &
        FindContainmentArgs<ContainableTypes, Being & ModelType.Portal>,
  ) => ReadonlyArray<IModel<ContainableTypes, Being, ModelType>>;

  readonly findAllGenerator: (
    args: '*' |
      IFindBaseArgs<ContainableTypes> &
        FindContainmentArgs<ContainableTypes, Being & ModelType.Portal>,
  ) => IterableIterator<IModel<ContainableTypes, Being, ModelType>>;

  readonly parents: (
    args: string |
      IFindBaseArgs<ContainingTypes> &
        FindContainmentArgs<ContainingTypes, ContainableTypes>,
  ) => ReadonlyArray<IModel<ContainingTypes, ContainableTypes, ModelType> | IWorld>;

  readonly serialize: (
    self: IContainmentRelation<Type, Being>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IContainmentRelation<Type, Being>,
  ) => ISerializedContainmentRelation;

  /* The following properties are not usable for models which are themselves
   * contained but which may not contain other models. */
  readonly children: Type extends ContainingTypes ?
    ReadonlyArray<IModel<ContainableTypes, Being, ModelType>> :
    null;

  readonly addChild: Type extends ContainingTypes ?
    (model: IModel<ContainableTypes, Being, ModelType>) => void :
    null;

  readonly descendants: Type extends ContainingTypes ?
    () => ReadonlyArray<IModel<ContainableTypes, Being, ModelType>> :
    null;

  readonly removeChild: Type extends ContainingTypes ?
    (model: IModel<ContainableTypes, Being, ModelType>) => void :
    null;
}
