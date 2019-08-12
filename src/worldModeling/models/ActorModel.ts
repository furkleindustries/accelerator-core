/**
 * @todo Fix all the dang `as any` casts.
 */

import {
  ActorModelOptionalFunctionNames,
} from './ActorModelOptionalFunctionNames';
import {
  Epistemology,
} from '../epistemology/Epistemology';
import {
  FindModelArgs,
} from '../querying/FindModelArgs';
import {
  IActorModel,
} from './IActorModel';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  ILocationModel,
} from './ILocationModel';
import {
  IModel,
} from './IModel';
import {
  IModelConstructorArgs,
} from './IModelConstructorArgs';
import {
  IObjectModel,
} from './IObjectModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  isModel,
} from '../typeGuards/isModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelBase,
} from './ModelBase';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Ontology,
} from '../ontology/Ontology';
import {
  assertValid,
} from 'ts-assertions';

export class ActorModel<
  Being extends OnticTypes,
  Knowledge extends ModelType,
> extends ModelBase<ModelType.Actor, Being, Knowledge>
  implements IActorModel<Being, Knowledge>
{
  protected readonly __being: IOntology<ModelType.Actor, Being>;
  public get being() {
    return this.__being;
  }

  protected readonly __knowledge: IEpistemology<ModelType.Actor, Knowledge>;
  public get knowledge() {
    return this.__knowledge;
  }

  public get type(): ModelType.Actor {
    return ModelType.Actor;
  }

  constructor(
    world: IWorld,
    args: IModelConstructorArgs<ModelType.Actor, Being, Knowledge>,
  ) {
    super(world, args);

    this.__being = new Ontology<ModelType.Actor, Being>(
      this.world,
      { modelType: this.type },
    );

    this.__knowledge = new Epistemology<ModelType.Actor, Knowledge>(
      this.world,
      { modelType: this.type },
    );

    const actorFuncs = args.actorFuncs;
    if (actorFuncs) {
      Object.keys(actorFuncs).forEach((key) => {
        const isActorFunc = Array.prototype.includes.call(
          ActorModelOptionalFunctionNames,
          key,
        );

        const val = actorFuncs[key];
        if (isActorFunc && typeof val === 'function') {
          this[key] = val;
        }
      });
    }
  }

  public readonly drop = (
    self: IActorModel<Being, Knowledge>,
    target: IObjectModel<Being>,
  ): void => {
    let targetModel: typeof target;
    if (isModel(target)) {
      targetModel = target;
    } else {
      targetModel = assertValid<typeof target>(self.world.find(target));
    }

    self.being.containment!.parent.being!.containment.addChild(targetModel as any);
  };

  public readonly findAllGenerator = ((self: IActorModel<Being, Knowledge>) => function* (
    args: '*' | FindModelArgs<ModelType, Being, Knowledge>,
  ): IterableIterator<IModel<ModelType, Being, Knowledge>>
  {
    yield* self.being.findAllGenerator(args as any) as any;
    yield* self.knowledge.findAllGenerator(args) as any;
  })(this);
 
  public readonly move = (
    self: IActorModel<Being, Knowledge>,
    destination: ILocationModel<Being>,
  ): void => {
    const parent = self.being.containment.parent;
    if (parent.being) {
      parent.being.containment.removeChild(self as any);
    }

    destination.being.containment.addChild(self as any);
  };

  readonly observe = (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ): void => self.knowledge.awareness.addPerception(target as any);

  readonly take = (
    self: IActorModel<Being, Knowledge>,
    target: IObjectModel<Being>,
  ) => {
    target.being.containment.parent.being!.containment.removeChild(self as any);
    target.being.containment.addChild(self as any);
  };

  readonly unobserve = (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ): void => self.knowledge.awareness.removePerception(target as any);

  readonly unwant = (
    self: IActorModel<Being, Knowledge>,
    target: IModel<ModelType, Being, Knowledge>,
  ): void => self.knowledge.thoughts.removeWant(target as any);

  readonly want = (
    self: IActorModel<Being, Knowledge>,
    target: IModel<ModelType, Being, Knowledge>,
  ): void => self.knowledge.thoughts.addWant(target as any);

  readonly act?: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => void;

  readonly canAct?: (self: IActorModel<Being, Knowledge>) => boolean;

  readonly canActOn?: (
    self: IActorModel<Being, Knowledge>,
    target: IModel<OnticTypes, Being, Knowledge>,
  ) => boolean;

  readonly getActionTargets?: (self: IActorModel<Being, Knowledge>) => ReadonlyArray<
    IModel<OnticTypes, Being, Knowledge>
  >;

  readonly selectActionTarget?: (
    self: IActorModel<Being, Knowledge>,
    targets: IModel<OnticTypes, Being, Knowledge> |
      ReadonlyArray<IModel<OnticTypes, Being, Knowledge>>,
  ) => IModel<OnticTypes, Being, Knowledge>;

  readonly willAct?: (self: IActorModel<Being, Knowledge>) => boolean;
}
