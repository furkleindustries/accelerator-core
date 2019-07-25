import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
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
  RelationBase,
} from './RelationBase';
import { FindModelArgs } from '../models/FindModelArgs';

export class AwarenessRelation<
  Type extends EpistemicTypes,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> extends RelationBase<Type>
  implements IAwarenessRelation<Type, Being, Knowledge>
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

  public readonly clone = () => {
    const copy: IAwarenessRelation<Type, Being, Knowledge> = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
    );

    // @ts-ignore
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

  public readonly find = <
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowledge>,
  ): IModel<Type, Being, Knowledge> | null => {

  };

  public readonly findAll = <
    Being extends BeingNoThoughtsBase,
    Knowledge extends ModelType,
  >(
    args: Exclude<FindModelArgs<Type, Being, Knowledge>, string>,
  ): ReadonlyArray<IModel<Type, Being, Knowledge>> => {

  };

  public readonly findAllGenerator = ((
    self: IAwarenessRelation<Type, Being, Knowledge>,
  ) => function* findAllGenerator<
    Being extends BeingNoThoughtsBase,
    Knowing extends ModelType,
  >(
    args: FindModelArgs<Type, Being, Knowing>,
  )/*: IterableIterator<IModel<Type, Being, Knowing>> */ {
      
  })(this);

  public readonly removePerception = (
    perception: IModel<Type, Being, Knowledge>,
  ) => {
    let index = 0;
    for (; index < this.perceives.length; index += 1) {
      if (this.perceives[index].name === perception.name) {
        break;
      }
    }

    if (index < this.perceives.length) {
      this.__perceives = this.__perceives
        .slice(0, index)
        .concat(this.__perceives.slice(index + 1));
    }
  };
}