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
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  IFindBaseArgs,
} from '../querying/FindModelArgs';
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

export abstract class ModelBase<
  Type extends ModelType,
  Being extends OnticTypes = any,
  Knowledge extends ModelType = any,
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

    this.initialize(this as any);
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(addTag(this.tags, tag)))
  );

  public readonly clone = (
    self: IModel<Type, Being, Knowledge>,
  ): IModel<Type, Being, Knowledge> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(self)),
      self,
    );

    copy.__being = self.being ? self.being.clone(self.being as any) : null;
    copy.__name = self.name;
    copy.__knowledge = self.knowledge ?
      self.knowledge.clone(self.knowledge!) :
      null;

    copy.__tags = self.tags.slice();

    copy.__type = self.type;

    copy.__world = self.world;

    return copy;
  };

  public readonly destroy = (self: IModel<Type, Being, Knowledge>): void => {
    ((self: any) => {
      self.finalize(self);

      if (self.being) {
        self.being.destroy(self.being);
      }

      if (self.knowledge) {
        self.knowledge.destroy(self.knowledge);
      }

      self.tags.forEach(self.removeTag);

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
    })(self);
  };

  public readonly finalize = (self: IModel<Type, Being, Knowledge>): void => {
    if (self.being && typeof self.being.finalize === 'function') {
      self.being.finalize(self.being as any);
    }

    if (self.knowledge && typeof self.knowledge.finalize === 'function') {
      self.knowledge.finalize(self.knowledge!);
    }
  };

  public readonly find = (
    args: string | IFindBaseArgs<ModelType>,
  ): IModel<ModelType, Being, Knowledge> | null => this.findAllGenerator(
    typeof args === 'string' ?
      { name: args } :
      args,
  ).next().value || null;

  public readonly findAll = (
    args: '*' | IFindBaseArgs<ModelType>,
  ): ReadonlyArray<IModel<ModelType, Being, Knowledge>> => {
    const ret = [];
    for (const model of this.findAllGenerator(args)) {
      ret.push(model);
    }

    return ret;
  };

  public abstract readonly findAllGenerator: (
    args: '*' | IFindBaseArgs<ModelType>,
  ) => IterableIterator<IModel<ModelType, Being, Knowledge>>;

  public readonly getTag = (toSearch: Tag) => (
    getTag(this.tags, toSearch)
  );

  public readonly initialize = (self: IModel<Type, Being, Knowledge>): void => {
    if (self.being && typeof self.being.initialize === 'function') {
      self.being.initialize(self.being as any);
    }

    if (self.knowledge && typeof self.knowledge.initialize === 'function') {
      self.knowledge.initialize(self.knowledge!);
    }
  };

  public readonly removeTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(removeTag(this.tags, tag)))
  );

  public readonly serialize = (
    self: IModel<Type, Being, Knowledge>,    
    spaces: number = 0,
  ) => JSON.stringify(self.serializeToObject(self), null, spaces);

  public readonly serializeToObject = (
    self: IModel<Type, Being, Knowledge>,
  ): ISerializedModel => ({
    being: self.being ? self.being.serializeToObject(self.being as any) : null,
    knowledge: self.knowledge ?
      self.knowledge.serializeToObject(self.knowledge!) :
      null,

    name: self.name,
    tags: [ ...self.tags ],
    type: self.type,
  });
}
