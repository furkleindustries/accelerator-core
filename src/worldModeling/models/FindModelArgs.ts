import {
  IModel,
} from './IModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export type IFindModelArg<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> =
  string |
    Array<string | ModelType | IModel<Type, Being, Knowledge>>;

export type FindModelArgs<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> =
  IFindBaseArgs<Type> &
    IFindAdjacencyArgs<Type, Being, Knowledge> &
    IFindAwarenessArgs<Type, Being, Knowledge> &
    IFindContainmentArgs<Type, Being, Knowledge> &
    IFindThoughtArgs<Type, Being, Knowledge>;

export interface IFindBaseArgs<
  Type extends ModelType,
> {
  readonly andOrBehavior?: 'and' | 'or';
  readonly name?: string;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
  readonly type?: Type;
}

export interface IFindAdjacencyArgs<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly adjacent?: IFindModelArg<Type, Being, Knowledge>;
  readonly connected?: IFindModelArg<Type, Being, Knowledge>;
}

export interface IFindAwarenessArgs<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly awareOf?: IFindModelArg<Type, Being, Knowledge>;
  readonly inAwarenessGraph?: IFindModelArg<Type, Being, Knowledge>;
}

export interface IFindContainmentArgs<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly ancestors?: IFindModelArg<Type, Being, Knowledge>;
  readonly children?: IFindModelArg<Type, Being, Knowledge>;
  readonly descendants?: IFindModelArg<Type, Being, Knowledge>;
  readonly parent?: string | IModel<Type, Being, Knowledge> | IWorld;
}

export interface IFindThoughtArgs<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly links?: IFindModelArg<Type, Being, Knowledge>;
  readonly thoughts?: IFindModelArg<Type, Being, Knowledge>;
  readonly wants?: IFindModelArg<Type, Being, Knowledge>;
}
