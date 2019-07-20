import {
  addTag,
} from '../../tags/addTag';
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
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from './ModelType';
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
  Being extends ModelType,
  Knowledge extends ModelType,
> implements IModel<Type, Being, Knowledge>
{
  protected abstract readonly __being: IOntology<Type, Being, Knowledge> | null;
  public get being() {
    return this.__being;
  }

  protected abstract readonly __knowledge: IEpistemology<Type, Being, Knowledge> | null;
  public get knowledge() {
    return this.__knowledge;
  }

  private readonly __name: string;
  public get name() {
    return this.__name;
  }

  private __tags: ReadonlyArray<string | Tag> = Object.freeze<string | Tag>(
    [],
  );

  public get tags() {
    return this.__tags;
  }

  private readonly __type: Type;
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
    this.__world = assertValid(world);

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
      this.__tags = this.tags.concat(tags);
    }

    this.initialize(this);
  }

  public readonly addTag = (tag: string | Tag) => (
    void (this.__tags = Object.freeze(addTag(this.tags, tag)))
  );

  public readonly clone = (
    world: IWorld = this.world,
    name: string = this.name,
  ): IModel<Type, Being, Knowledge> => {
    const copy: IModel<Type, Being, Knowledge> = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    // @ts-ignore
    copy.__being = this.being ? this.being.clone() : this.being;
    // @ts-ignore
    copy.__name = name;
    // @ts-ignore
    copy.__knowledge = this.knowledge ?
      this.knowledge.clone() :
      this.knowledge;

    // @ts-ignore
    copy.__tags = this.tags.slice();

    // @ts-ignore
    copy.__type = this.type;

    // @ts-ignore
    copy.__world = world;

    return copy;
  };

  public readonly destroy = () => {
    this.finalize(this);

    if (this.being) {
      this.being.destroy();
      // @ts-ignore
      this.__being = null;
    }

    if (this.knowledge) {
      this.knowledge.destroy();
      // @ts-ignore
      delete this.__knowledge;
      // @ts-ignore
      delete this.knowledge;
    }

    this.tags.forEach(this.removeTag);
    delete this.__tags;
    // @ts-ignore
    delete this.tags;

    // @ts-ignore
    delete this.__type;
    // @ts-ignore
    delete this.type;

    // @ts-ignore
    delete this.__world;
    // @ts-ignore
    delete this.world;
  };

  public readonly initialize = (self: IModel<Type, Being, Knowledge>) => {
    if (this.being) {
      this.being.initialize(this.being);
    }
  };

  public readonly finalize = (self: IModel<Type, Being, Knowledge>) => {
    if (this.knowledge) {
      this.knowledge.finalize(this.knowledge);
    }
  };

  public readonly removeTag = (tag: string | Tag) => (
    void (this.__tags = Object.freeze(removeTag(this.tags, tag)))
  );
}
