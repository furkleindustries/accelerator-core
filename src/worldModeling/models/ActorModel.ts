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
import {
  TypedModelInterfaces,
} from './TypedModelInterfaces';

export class ActorModel<
  Being extends OnticTypes,
  Knowledge extends ModelType,
> extends ModelBase<ModelType.Actor, Being, Knowledge>
  implements IActorModel<Being, Knowledge>
{
  protected readonly __being: IOntology<
    ModelType.Actor,
    Being
  >;

  public get being() {
    return this.__being;
  }

  protected readonly __knowledge: IEpistemology<
    ModelType.Actor,
    Knowledge
  >;

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

    self.being.containment!.parent.being!.containment.addChild(targetModel);
  };

  public readonly findAllGenerator = ((self: IActorModel<Being, Knowledge>) => function* <
    B extends Being,
    K extends Knowledge,
  >(args: '*' | FindModelArgs<ModelType, B, K>)
  {
    if (args === '*') {
      /* Output all the basic relations. */
      const beingGen = self.being.findAllGenerator<any, any>(args)
    }
  })(this);
 
  public readonly move = (
    self: IActorModel<Being, Knowledge>,
    destination: ILocationModel<Being>,
  ): void => {
    const parent = self.being.containment.parent;
    if (parent.being) {
      parent.being.containment.removeChild(self);
    }

    destination.being.containment.addChild(self);
  };

  readonly observe = <
    Type extends OnticTypes,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ): void => self.knowledge.awareness.addPerception(target);

  readonly take = (
    self: IActorModel<Being, Knowledge>,
    target: IObjectModel<Being>,
  ) => {
    target.being.containment.parent.being!.containment.removeChild(self);
    target.being.containment.addChild(self);
  };

  readonly unobserve = <
    Type extends OnticTypes,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ): void => self.knowledge.awareness.removePerception(target);

  readonly unwant = <
    Type extends ModelType,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ): void => self.knowledge.thoughts.removeWant(target);

  readonly want = <
    Type extends ModelType,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
  ): void => self.knowledge.thoughts.addWant(target);

  readonly act?: <
    Type extends ModelType,
    ModelInterface extends IModel<ModelType, OnticTypes, ModelType> = (
      Type extends keyof TypedModelInterfaces ?
        TypedModelInterfaces<Being, Knowledge>[Type] :
        IModel<Type, Being, Knowledge>
    ),
  >(
    self: IActorModel<Being, Knowledge>,
    target: ModelInterface,
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
