import {
  AwareTypes,
} from './AwareTypes';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  findAllGenerate,
} from '../querying/findAllGenerate';
import {
  FindAwarenessArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  IAwarenessRelation,
} from './IAwarenessRelation';
import {
  IModel,
} from '../models/IModel';
import {
  ISerializedAwarenessRelation,
} from './ISerializedAwarenessRelation';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  RelationBase,
} from './RelationBase';

export class AwarenessRelation<
  Type extends EpistemicTypes & OnticTypes,
  Knowledge extends ModelType,
> extends RelationBase<Type>
  implements IAwarenessRelation<Type, Knowledge>
{
  protected readonly __modelType: Type;
  public get modelType() {
    return this.__modelType;
  }

  private __perceptions: ReadonlyArray<
    IModel<Type, OnticTypes, Knowledge>
  > = Object.freeze([]);

  public get perceptions() {
    return this.__perceptions;
  }

  public readonly addPerception = (
    perception: IModel<Type, OnticTypes, Knowledge>,
  ) => void (this.__perceptions = this.__perceptions.concat([ perception ]));

  public readonly clone = (
    self: IAwarenessRelation<Type, Knowledge>,
  ): IAwarenessRelation<Type, Knowledge> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(self)),
      self,
    );

    self.perceptions.forEach(copy.addPerception);

    return copy;
  };

  public readonly destroy = (
    self: IAwarenessRelation<Type, Knowledge>,
  ) => {
    this.tags.forEach(self.removeTag);
    this.perceptions.forEach(self.removePerception);

    ((self: any) => {
      delete self.__perceives;
      delete self.perceives;
      delete self.__tags;
      delete self.tags;
    })(this);
  };

  public readonly find: (
    args: string |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<AwareTypes, OnticTypes>,
  ) => IModel<OnticTypes, OnticTypes, Knowledge> | null;

  public readonly findAll: (
    args: '*' |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<AwareTypes, OnticTypes>,
  ) => ReadonlyArray<IModel<OnticTypes, OnticTypes, Knowledge>>;

  public readonly findAllGenerator = ((
    self: IAwarenessRelation<Type, Knowledge>,
  ) => function* (
    args: '*' |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<AwareTypes, OnticTypes>,
  ): IterableIterator<IModel<OnticTypes, OnticTypes, Knowledge>> {
    yield* findAllGenerate<OnticTypes, OnticTypes, Knowledge>(
      self.perceptions,
      args,
    );
  })(this);

  public readonly removePerception = (
    { name }: IModel<Type, OnticTypes, Knowledge>,
  ) => {
    const index = this.perceptions.findIndex((item) => item.name === name);

    if (index >= 0) {
      this.__perceptions = this.perceptions
        .slice(0, index)
        .concat(this.perceptions.slice(index + 1));
    }
  };

  public readonly serializeToObject = (
    self: IAwarenessRelation<Type, Knowledge>,
  ): ISerializedAwarenessRelation => ({
    modelType: this.modelType,
    perceptions: self.perceptions.map(({ name }) => name),
    tags: [ ...self.tags ],
  });
}