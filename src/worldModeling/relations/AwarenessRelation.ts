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

  public readonly clone = (): IAwarenessRelation<Type, Knowledge> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    copy.__perceives = Object.freeze(this.perceptions.slice());

    return copy;
  };

  public readonly destroy = () => {
    this.tags.forEach(this.removeTag);
    this.perceptions.forEach(this.removePerception);

    ((self: any) => {
      delete self.__perceives;
      delete self.perceives;
      delete self.__tags;
      delete self.tags;
    })(this);
  };

  public readonly find: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: string |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<EpistemicTypes & OnticTypes, Being>,
  ) => IModel<OnticTypes, Being, Knowledge> | null;

  public readonly findAll: <
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<EpistemicTypes & OnticTypes, Being>,
  ) => ReadonlyArray<IModel<OnticTypes, Being, Knowledge>>;

  public readonly findAllGenerator = ((
    self: IAwarenessRelation<Type, Knowledge>,
  ) => function* findAllGenerator<
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' |
      IFindBaseArgs<OnticTypes> &
        FindAwarenessArgs<EpistemicTypes & OnticTypes, Being>,
  ): IterableIterator<IModel<OnticTypes, Being, Knowledge>> {
    if (args === '*') {
      for (const perception of self.perceptions) {
        yield perception as IModel<OnticTypes, Being, any>;
      }
    }

    yield* findAllGenerate<OnticTypes, Being, Knowledge>(
      self.perceptions as IModel<OnticTypes, Being, any>[],
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