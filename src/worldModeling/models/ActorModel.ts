import {
  Epistemology,
} from '../epistemology/Epistemology';
import {
  IActorModel,
} from './IActorModel';
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
    args: IModelConstructorArgs<ModelType.Actor, Being>,
  ) {
    super(world, args);

    // @ts-ignore
    this.__being =
      new Ontology(this.world, { modelType: this.type });

    // @ts-ignore
    this.__knowledge =
      new Epistemology(this.world, { modelType: this.type });
  }

  public readonly drop = (
    target: IModel<ModelType.Object, Being, Knowledge>,
    self: this,
  ) => {
    let targetModel: IModel<ModelType.Object, Being, Knowledge>;
    if (isModel(target)) {
      targetModel = target;
    } else {
      targetModel = assertValid<IModel<
        ModelType.Object,
        OnticTypes,
        ModelType
      >>(this.world.find(target));
    }

    this.being.containment!.parent.being.containment.addChild(targetModel);
  };

  public readonly move = (
    destination: IModel<ModelType.Location, Being, Knowledge>,
  ) => {
    this.being.containment.parent.being!.containment.removeChild(this);
    destination.being!.containment.addChild(this);
  };

  readonly take = (
    target: IModel<ModelType.Object, Being, Knowledge>,
    self: this,
  ) => {
    target.being.containment.parent.being!.containment.removeChild(this);
    target.being.containment.addChild(this);
  };

  readonly observe = (
    target: IModel<OnticTypes, Being, Knowledge>,
    self: this,
  ): void => this.knowledge.awareness.addPerception(target);

  readonly unobserve = (
    target: IModel<OnticTypes, Being, Knowledge>,
    self: this,
  ): void => this.knowledge.awareness.removePerception(target);

  readonly unwant = (
    target: IModel<ModelType, Being, Knowledge>,
    self: this,
  ): void => this.knowledge.thoughts.removeWant(target);

  readonly want = (
    target: IModel<ModelType, Being, Knowledge>,
    self: this,
  ): void => this.knowledge.thoughts.addWant(target);

  readonly act?: (
    target: IModel<OnticTypes, Being, Knowledge>,
    self: this,
  ) => void;
}
