import {
  ActorModel,
} from '../models/ActorModel';
import {
  addTag,
} from '../../tags/addTag';
import {
  Epistemology,
} from '../epistemology/Epistemology';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  findAllGenerate,
} from '../querying/findAllGenerate';
import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IModelConstructorArgs,
} from '../models/IModelConstructorArgs';
import {
  IWorld,
} from './IWorld';
import {
  LocationModel,
} from '../models/LocationModel';
import {
  ModelType,
} from '../models/ModelType';
import {
  ObjectModel,
} from '../models/ObjectModel';
import {
  PortalModel,
} from '../models/PortalModel';
import {
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';
import {
  ThoughtModel,
} from '../models/ThoughtModel';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export class World implements IWorld {
  private readonly __being: null;
  public get being() {
    return this.__being;
  }

  private readonly __knowledge: IEpistemology<
    ModelType,
    ModelType,
    ModelType
  > = new Epistemology();

  public get knowledge() {
    return this.__knowledge;
  }

  private __models: Readonly<
    Record<string, IModel<ModelType, ModelType, ModelType>>
  > = Object.freeze({});

  public get models() {
    return this.__models;
  };
  
  private readonly __name: string;
  public get name() {
    return this.__name;
  }

  private __tags: ReadonlyArray<string | Tag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  }

  public readonly addTag = (tag: string | Tag) => (
    void (this.__tags = Object.freeze([ ...addTag(this.tags, tag) ]))
  );

  public readonly removeTag = (tag: string | Tag) => (
    void (this.__tags = Object.freeze([ ...removeTag(this.tags, tag) ]))
  );

  constructor(
    name: string,
    models?: Record<string, IModel<ModelType, ModelType, ModelType>>,
  ) {
    this.__name = assertValid(name);
    if (models && typeof models === 'object') {
      this.__models = models;
    }
  }

  public readonly addModel = <
    Type extends ModelType,
    Being extends ModelType,
    Knowledge extends ModelType,
  >(
    args: IModelConstructorArgs<Type, Being, Knowledge>,
    ctor?: new (
      world: IWorld,
      args: IModelConstructorArgs<Type, Being, Knowledge>,
    ) => IModel<Type, Being, Knowledge>,
  ) => {
    assert(args, 'There were no arguments passed to World.addModel.');

    assert(
      args.name,
      'There was no name property in the argument array passed to ' +
        'World.addModel.',
    );

    assert(
      !(args.name in this.models),
      'There was already a model with the provided name in the models map.', 
    )

    assert(
      args.type,
      'There was no type property in the arguments array passed to ' +
        'World.addModel.',
    );

    let temp: IModel<any, Being, Knowledge>;
    if (typeof ctor === 'function') {
      temp = new ctor(this, args);
    } else if (args.type === ModelType.Actor) {
      temp = new ActorModel<ModelType.Actor, Being, Knowledge>(
        this,
        args as IModelConstructorArgs<ModelType.Actor, Being, Knowledge>,
      );
    } else if (args.type === ModelType.Location) {
      temp = new LocationModel(this, args); 
    } else if (args.type === ModelType.Object) {
      temp = new ObjectModel(this, args);
    } else if (args.type === ModelType.Portal) {
      temp = new PortalModel(this, args);
    } else if (args.type === ModelType.Thought) {
      temp = new ThoughtModel(this, args);
    } else {
      throw new Error('Type argument not recognized in World.addModel.');
    }

    this.__models = {
      ...this.models,
      [args.name]: temp,
    };

    return temp as IModel<Type, Being, Knowledge>;
  };

  public readonly removeModel = (
    model: string | IModel<ModelType, ModelType, ModelType>,
  ) => {
    if (typeof model === 'string') {
      const copy = { ...this.__models };
      delete copy[model];
      this.__models = Object.freeze(copy);
    } else {
      const copy = { ...this.__models };
      delete copy[model.name];
      this.__models = Object.freeze(copy);
    }
  };

  public readonly children = () => Object.values(this.models);

  public readonly clone = (name: string): IWorld => {
    const world: IWorld = new World(name);
    Object.keys(this.models).forEach((key) => {
      const {
        name,
        ...model
      } = this.models[key];
      world.addModel({
        name,
        ...model,
      })
    });

    return world;
  };


  public readonly descendants = () => this.findAll('*');

  public readonly destroy = () => {
    this.descendants().forEach((desc) => {
      desc.destroy();
      this.removeModel(desc);
    });

    // @ts-ignore
    delete this.__being;
    // @ts-ignore
    delete this.being;
    // @ts-ignore
    delete this.__models;
    // @ts-ignore
    delete this.models;
    // @ts-ignore
    delete this.__knowledge;
    // @ts-ignore
    delete this.knowledge;
    delete this.__tags;
    // @ts-ignore
    delete this.tags;
  };

  public readonly find = <
    Type extends ModelType,
    Being extends ModelType,
    Knowledge extends ModelType,
  >(
    args: string | FindModelArgs<Type, Being, Knowledge>,
  ) => this.findAllGenerator(
    typeof args === 'string' ? { name: args } : args
  ).next().value || null;

  public readonly findAll = <
    Type extends ModelType,
    Being extends ModelType,
    Knowledge extends ModelType,
  >(args: '*' | FindModelArgs<Type, Being, Knowledge>) => {
    const ret = [];
    const gen = this.findAllGenerator(args);
    while (true) {
      const {
        done,
        value,
      } = gen.next();

      if (done) {
        break;
      }

      ret.push(value);
    }

    return ret;
  };

  public readonly findAllGenerator = ((self: IWorld) => function*<
    Type extends ModelType,
    Being extends ModelType,
    Knowledge extends ModelType,
  > (args: '*' | FindModelArgs<Type, Being, Knowledge>) {
    assert(args, 'The args argument to World.findAllGenerator was not valid.');
    yield* findAllGenerate<Type, Being, Knowledge>(self, args);
  })(this);
}
