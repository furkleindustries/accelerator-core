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
} from '../querying/FindModelArgs';
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
  ITag,
} from '../../tags/ITag';
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
import { OnticTypes } from '../ontology/OnticTypes';

export class World implements IWorld {
  private readonly __being: null;
  public get being() {
    return this.__being;
  }

  private readonly __knowledge: IEpistemology<
    ModelType.Thought,
    BeingNoThoughtsBase,
    ModelType
  > = new Epistemology(this, { modelType: ModelType.Thought });

  public get knowledge() {
    return this.__knowledge;
  }

  private __models: Readonly<
    Record<string, IModel<ModelType, BeingNoThoughtsBase, ModelType>>
  > = Object.freeze({});

  public get models() {
    return this.__models;
  }
  
  private readonly __name: string;
  public get name() {
    return this.__name;
  }

  private __tags: ReadonlyArray<string | ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  }

  private readonly __type = WorldType;
  public get type() {
    return this.__type;
  }

  public readonly addTag = (tag: string | ITag) => (
    void (this.__tags = Object.freeze([ ...addTag(this.tags, tag) ]))
  );

  public readonly removeTag = (tag: string | ITag) => (
    void (this.__tags = Object.freeze([ ...removeTag(this.tags, tag) ]))
  );

  constructor(
    name: string,
    models?: Record<
      string,
      IModel<ModelType, BeingNoThoughtsBase, ModelType>
    >,

    initialize?: (self: IWorld) => void,
    finalize?: (self: IWorld) => void,
    tags?: Array<string | ITag> | ReadonlyArray<string | ITag>,
  ) {
    this.__name = assertValid(name);
    if (models && typeof models === 'object') {
      this.__models = models;
    }

    if (typeof initialize === 'function') {
      this.initialize = initialize;
    }

    if (typeof finalize === 'function') {
      this.finalize = finalize;
    }

    if (Array.isArray(tags)) {
      this.__tags = tags;
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

    type _Type<T extends ModelType> = IModelConstructorArgs<T, Being, Knowledge>;
    let temp: IModel<any, Being, Knowledge>;
    if (typeof ctor === 'function') {
      temp = new ctor(this, modelArgs);
    } else if (modelArgs.type === ModelType.Actor) {
      temp = new ActorModel<Being, Knowledge>(
        this,
        modelArgs as IModelConstructorArgs<ModelType.Actor, Being, Knowledge>,
      );
    } else if (modelArgs.type === ModelType.Location) {
      temp = new LocationModel(this, modelArgs as _Type<ModelType.Location>);
    } else if (modelArgs.type === ModelType.Object) {
      temp = new ObjectModel(this, modelArgs as _Type<ModelType.Object>);
    } else if (modelArgs.type === ModelType.Portal) {
      temp = new PortalModel(this, modelArgs as _Type<ModelType.Portal>);
    } else if (modelArgs.type === ModelType.Thought) {
      temp = new ThoughtModel(this, modelArgs as _Type<ModelType.Thought>);
    } else {
      throw new Error('Type argument not recognized in World.addModel.');
    }

    this.__models = Object.freeze({
      ...this.models,
      [modelArgs.name]: temp,
    });

    return temp as IModel<Type, Being, Knowledge>;
  };

  public readonly getTag = (toSearch: string | ITag) => (
    getTag(this.tags, toSearch)
  );

  public readonly initialize = (self: IWorld) => {
    if (self.knowledge && typeof self.knowledge.initialize === 'function') {
      self.knowledge.initialize(self.knowledge);
    }

    this.children().forEach((child) => child.initialize(child));
  };

  public readonly finalize = (self: IWorld) => {
    if (self.knowledge && typeof self.knowledge.finalize === 'function') {
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
    this.descendants().forEach((model) => world.addModel({ ...model }));
    return world;
  };

  public readonly descendants = () => this.findAll('*');

  public readonly destroy = () => {
    this.finalize(this);

    this.descendants().forEach((desc) => {
      desc.destroy();
      this.removeModel(desc);
    });

    this.tags.forEach(this.removeTag);

    ((self: any) => {
      delete self.__being;
      delete self.being;
      delete self.__knowledge;
      delete self.knowledge;
      delete self.__models;
      delete self.models;
      delete self.__tags;
      delete self.tags;
      delete self.__type;
      delete self.type;
    })(this);
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
    Being extends OnticTypes,
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
  };
}
