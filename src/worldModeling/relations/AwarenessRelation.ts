import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  FindModelArgs,
} from '../querying/FindModelArgs';
import {
  IAwarenessRelation,
} from './IAwarenessRelation';
import {
  IModel,
} from '../models/IModel';
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
  Being extends OnticTypes,
  Knowledge extends ModelType,
> extends RelationBase<Type>
  implements IAwarenessRelation<Type, Knowledge>
{
  private __perceives: ReadonlyArray<
    IModel<Type, Being, Knowledge>
  > = Object.freeze([]);

  public get perceives() {
    return this.__perceives;
  }

  public readonly addPerception = (
    perception: IModel<Type, Being, Knowledge>,
  ) => void (this.__perceives = this.__perceives.concat([ perception ]));

  public readonly clone = (): IAwarenessRelation<Type, Knowledge> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    copy.__perceives = Object.freeze(this.perceives.slice());

    return copy;
  };

  public readonly destroy = () => {
    this.tags.forEach(this.removeTag);
    this.perceives.forEach(this.removePerception);

    ((self: any) => {
      delete self.__perceives;
      delete self.perceives;
      delete self.__tags;
      delete self.tags;
    })(this);
  };

  public readonly findAllGenerator = ((
    self: IAwarenessRelation<Type, Knowledge>,
  ) => function* findAllGenerator<
    Being extends OnticTypes,
    Knowledge extends ModelType,
  >(
    args: '*' | FindModelArgs<Type, Being, Knowledge>,
  )/*: IterableIterator<IModel<Type, Being, Knowledge>> */ {
      
  })(this);

  public readonly removePerception = (
    { name }: IModel<Type, Being, Knowledge>,
  ) => {
    const index = this.perceives.findIndex((item) => item.name === name);

    if (index >= 0) {
      this.__perceives = this.perceives
        .slice(0, index)
        .concat(this.perceives.slice(index + 1));
    }
  };
}