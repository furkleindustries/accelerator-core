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
  findAllGenerate,
} from '../querying/findAllGenerate';
import {
  FindContainmentArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  IContainmentRelation,
} from './IContainmentRelation';
import {
  ISerializedContainmentRelation,
} from './ISerializedContainmentRelation';
import {
  IModel,
} from '../models/IModel';
import {
  isContainingType,
} from '../typeGuards/isContainingType';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  RelationBase,
} from './RelationBase';

export class ContainmentRelation<
  Type extends ContainmentTypes,
  Being extends ContainableTypes,
> extends RelationBase<Type>
  implements IContainmentRelation<Type, Being>
{
  protected __parent: Type extends ModelType.Location ?
    IWorld :
    IModel<ContainingTypes, ContainableTypes, ModelType>;

  get parent() {
    return this.__parent;
  }

  public readonly clone = (
    self: IContainmentRelation<Type, Being>,
  ): IContainmentRelation<Type, Being> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(self)),
      self,
    );

    copy.__parent = self.parent;
    copy.finalize = typeof self.finalize === 'function' ? self.finalize : null;

    copy.initialize = typeof self.initialize === 'function' ?
      self.initialize :
      null;

    if (isContainingType(self.modelType)) {
      self.children!.forEach(copy.addChild);
    }

    self.tags.forEach(copy.addTag);

    copy.world = self.world;

    return copy;
  };

  public readonly destroy = (
    self: IContainmentRelation<Type, Being>,
  ) => {
    if (typeof self.finalize === 'function') {
      self.finalize(self);
    }

    if (isContainingType(self.modelType)) {
      self.children!.forEach(self.removeChild!);
    }

    self.tags.forEach(self.removeTag);

    ((self: any) => {
      delete self.__children;
      delete self.children;
      delete self.finalize;
      delete self.initialize;
      delete self.__parent;
      delete self.parent;
      delete self.__tags;
      delete self.tags;
    })(self);
  };

  public readonly find: (
    args: string |
      IFindBaseArgs<ContainableTypes> & FindContainmentArgs<ContainableTypes, Being>,
  ) => IModel<ContainableTypes, Being, ModelType> | null;

  public readonly findAll: (
    args: '*' |
      IFindBaseArgs<ContainableTypes> & FindContainmentArgs<ContainableTypes, Being>,
  ) => ReadonlyArray<IModel<ContainableTypes, Being, ModelType>>;

  public readonly findAllGenerator = ((
    self: IContainmentRelation<Type, Being>,
  ) => function* (
    args: '*' |
      IFindBaseArgs<ContainableTypes> &
        FindContainmentArgs<ContainableTypes, Being>,
  ): IterableIterator<IModel<ContainableTypes, Being, ModelType>>
  {
    if (self.children) {
      yield* findAllGenerate<ContainableTypes, Being, ModelType>(
        [ ...self.children! ],
        args,
      );
    }
  })(this);

  public readonly parents: (
    args: string |
      IFindBaseArgs<ContainingTypes> &
        FindContainmentArgs<ContainingTypes, ContainableTypes>,
  ) => ReadonlyArray<IModel<ContainingTypes, ContainableTypes, ModelType> | IWorld>;

  public readonly serialize: (
    self: IContainmentRelation<Type, Being>,
    spaces?: number,
  ) => string;

  public readonly serializeToObject: (
    self: IContainmentRelation<Type, Being>,
  ) => ISerializedContainmentRelation;

  protected readonly __children: Type extends ContainingTypes ?
    ReadonlyArray<IModel<ContainableTypes, Being, ModelType>> :
    null;

  public get children() {
    return this.__children;
  }

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