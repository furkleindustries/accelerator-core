import {
  ActorModel,
} from '../models/ActorModel';
import {
  addTag,
} from '../../tags/addTag';
import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
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
  getTag,
} from '../../tags/getTag';
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
import {
  WorldType,
} from './WorldType';

export class World implements IWorld {
  private readonly __being: null;
  public get being() {
    return this.__being;
  }

  private readonly __knowledge: IEpistemology<
    ModelType.Thought,
    never,
    ModelType
  > = new Epistemology(this);

  public get knowledge() {
    return this.__knowledge;
  }

  private __models: Readonly<
    Record<string, IModel<ModelType, BeingNoThoughtsBase, ModelType>>
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

  private readonly __type = WorldType;
  public get type() {
    return this.__type;
  }

  public readonly addTag = (tag: string | Tag) => (
    void (this.__tags = Object.freeze([ ...addTag(this.tags, tag) ]))
  );

  public readonly removeTag = (tag: string | Tag) => (
    void (this.__tags = Object.freeze([ ...removeTag(this.tags, tag) ]))
  );

  constructor(
    name: string,
    models?: Record<
      string,
      IModel<ModelType, BeingNoThoughtsBase, ModelType>
    >,

    initializer?: (self: IWorld) => void,
    finalizer?: (self: IWorld) => void,
  ) {
    this.__name = assertValid(name);
    if (models && typeof models === 'object') {
      this.__models = models;
    }

    if (typeof initializer === 'function') {
      this.initialize = initializer;
    }

    if (typeof finalizer === 'function') {
      this.finalize = finalizer;
    }
  }

  public readonly addModel = <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    modelArgs: IModelConstructorArgs<Type, Being, Knowledge>,
    ctor?: new (
      world: IWorld,
      args: IModelConstructorArgs<Type, Being, Knowledge>,
    ) => IModel<Type, Being, Knowledge>,
  ) => {
    this.validateModelArgs<Type, Being, Knowledge>(modelArgs);

    let temp: IModel<any, Being, Knowledge>;
    if (typeof ctor === 'function') {
      temp = new ctor(this, modelArgs);
    } else if (modelArgs.type === ModelType.Actor) {
      temp = new ActorModel<Being, Knowledge>(
        this,
        modelArgs as IModelConstructorArgs<ModelType.Actor, Being, Knowledge>,
      );
    } else if (modelArgs.type === ModelType.Location) {
      temp = new LocationModel(this, modelArgs); 
    } else if (modelArgs.type === ModelType.Object) {
      temp = new ObjectModel(this, modelArgs);
    } else if (modelArgs.type === ModelType.Portal) {
      temp = new PortalModel(this, modelArgs);
    } else if (modelArgs.type === ModelType.Thought) {
      temp = new ThoughtModel(this, modelArgs);
    } else {
      throw new Error('Type argument not recognized in World.addModel.');
    }

    this.__models = {
      ...this.models,
      [modelArgs.name]: temp,
    };

    return temp as IModel<Type, Being, Knowledge>;
  };

  public readonly getTag = (toSearch: string | Tag) => (
    getTag(this.tags, toSearch)
  );

  public readonly initialize = (self: IWorld) => {
    if (self.knowledge) {
      self.knowledge.initialize(self.knowledge);
    }

    this.children().forEach((child) => child.initialize(child));
  };

  public readonly finalize = (self: IWorld) => {
    if (self.knowledge) {
      self.knowledge.finalize(self.knowledge);
    }

    this.children().forEach((child) => child.finalize(child));
  };

  public readonly removeModel = (
    model: string | IModel<ModelType, BeingNoThoughtsBase, ModelType>,
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
    this.finalize(this);

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
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: string | FindModelArgs<Type, Being, Knowledge>,
  ) => this.findAllGenerator(
    typeof args === 'string' ? { name: args } : args
  ).next().value || null;

  public readonly findAll = <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
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
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  > (args: '*' | FindModelArgs<Type, Being, Knowledge>) {
    assert(args, 'The args argument to World.findAllGenerator was not valid.');
    yield* findAllGenerate<Type, Being, Knowledge>(self, args);
  })(this);

  public readonly validateModelArgs = <
    Type extends ModelType,
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(args: any): args is IModelConstructorArgs<Type, Being, Knowledge> => {
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

    return true;
  }
}
