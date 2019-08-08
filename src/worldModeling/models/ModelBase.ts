import {
  addTag,
} from '../../tags/addTag';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  getStructuredTags,
} from '../../tags/getStructuredTags';
import {
  getTag,
} from '../../tags/getTag';
import {
  FindModelArgs,
} from '../querying/FindModelArgs';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  IModel,
} from './IModel';
import {
  IModelConstructorArgs,
} from './IModelConstructorArgs';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ISerializedModel,
} from './ISerializedModel';
import {
  ITag,
} from '../../tags/ITag';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';
import {
  assert,
  assertValid,
} from 'ts-assertions';
import {
  TypedModelInterfaces,
} from './TypedModelInterfaces';

export abstract class ModelBase<
  Type extends ModelType,
  Being extends OnticTypes = never,
  Knowledge extends ModelType = never,
  ModelInterface extends IModel<any, any, any> = TypedModelInterfaces<Being, Knowledge>[Type],
> implements IModel<Type, Being, Knowledge>
{
  public abstract readonly being: Type extends OnticTypes ?
    IOntology<Type, Being> :
    null;

  public abstract readonly knowledge: Type extends EpistemicTypes ?
    IEpistemology<Type, Knowledge> :
    null;

  private readonly __name: string;
  public get name() {
    return this.__name;
  }

  private __tags: ReadonlyArray<ITag> = Object.freeze<ITag>([]);
  public get tags() {
    return this.__tags;
  }

  protected readonly __type: Type;
  public get type() {
    return this.__type;
  }

  private readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(
    world: IWorld,
    args: IModelConstructorArgs<Type, Being, Knowledge>,
  ) {
    this.__world = assertValid(
      world,
      'The world argument was not provided to the ModelBase constructor.',
    );

    assert(
      args,
      'The args argument was not provided to the ModelBase constructor.',
    );

    const {
      name,
      tags,
      type,
    } = args;

    assert(
      name && typeof name === 'string',
      'The name property of the argument provided to the ModelBase ' +
        'constructor was not a string with content.',
    );

    assert(
      Object.values(ModelType).includes(type),
      'The type property of the argument provided to the ModelBase ' +
        'constructor was not a valid ModelType.',
    );

    this.__name = name;
    this.__type = type;

    if (tags) {
      this.__tags = this.tags.concat(getStructuredTags(tags));
    }

    this.initialize(this);
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(addTag(this.tags, tag)))
  );

  public readonly clone = (
    world: IWorld = this.world,
    name: string = this.name,
  ) => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    copy.__being = this.being ? this.being.clone() : this.being;
    copy.__name = name;
    copy.__knowledge = this.knowledge ?
      this.knowledge.clone() :
      this.knowledge;

    copy.__tags = this.tags.slice();

    copy.__type = this.type;

    copy.__world = world;

    return copy;
  };

  public readonly destroy = ((self: any) => () => {
    this.finalize(this);

    if (this.being) {
      this.being.destroy();
    }

    if (this.knowledge) {
      this.knowledge.destroy();
    }

    this.tags.forEach(this.removeTag);

    delete self.__being;
    delete self.being;
    delete self.__knowledge;
    delete self.knowledge;
    delete self.__tags;
    delete self.tags;
    delete self.__type;
    delete self.type;
    delete self.__world;
    delete self.world;
  })(this);

  public readonly finalize = (self: IModel<Type, Being, Knowledge>) => {
    if (self.being && typeof self.being.finalize === 'function') {
      self.being.finalize(
        // @ts-ignore
        self.being,
      );
    }

    if (self.knowledge && typeof self.knowledge.finalize === 'function') {
      self.knowledge.finalize(
        self.knowledge as IEpistemology<EpistemicTypes, Knowledge>,
      );
    }
  };

  public readonly initialize = (self: IModel<Type, Being, Knowledge>) => {
    if (self.being && typeof self.being.initialize === 'function') {
      self.being.initialize(
        // @ts-ignore
        self.being,
      );
    }

    if (self.knowledge && typeof self.knowledge.initialize === 'function') {
      self.knowledge.initialize(
        self.knowledge as IEpistemology<EpistemicTypes, Knowledge>,
      );
    }
  };

  public readonly find = <
    Type extends ModelType,
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: string | FindModelArgs<Type, Being, Knowledge>,
  ) => this.findAllGenerator(
    typeof args === 'string' ?
      { name: args } :
      args,
  ).next().value || null;

  public readonly findAll = <
    Type extends ModelType,
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(args: '*' | FindModelArgs<Type, Being, Knowledge>) => {
    const ret = [];
    for (const model of this.findAllGenerator(args)) {
      ret.push(model);
    }

    return ret;
  };

  public readonly getTag = (toSearch: string | ITag) => (
    getTag(this.tags, toSearch)
  );

  public readonly removeTag = (tag: string | ITag) => (
    void (this.__tags = Object.freeze(removeTag(this.tags, tag)))
  );

  public readonly serialize = (
    self: ModelInterface,
    spaces: number = 0,
  ) => JSON.stringify(self.serializeToObject(self), null, spaces);

  public readonly serializeToObject = (
    self: ModelInterface,
  ): ISerializedModel => ({
    being: self.being ? self.being.serializeToObject(self.being) : null,
    knowledge: self.knowledge ? self.knowledge.serializeToObject(self.knowledge) : null,
    name: self.name,
    tags: [ ...self.tags ],
    type: self.type,
  });

  public abstract readonly findAllGenerator: <
    Type extends ModelType,
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' | FindModelArgs<Type, Being, Knowledge>,
  ) => IterableIterator<ModelInterface>;
}
