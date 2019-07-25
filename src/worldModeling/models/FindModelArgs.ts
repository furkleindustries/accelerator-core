import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
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
  ITag,
} from '../../tags/ITag';

export type FindModelArg<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> =
  string |
    Array<string | ModelType | IModel<Type, Being, Knowledge>>;

export type FindModelArgs<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> =
  IFindBaseArgs<Type> &
    IFindAdjacencyArgs<Type, Being, Knowledge> &
    IFindAwarenessArgs<Type, Being, Knowledge> &
    IFindContainmentArgs<Type, Being, Knowledge> &
    IFindThoughtArgs<Type, Being, Knowledge>;

export interface IFindBaseArgs<Type extends ModelType> {
  readonly andOrBehavior?: 'and' | 'or';
  readonly name?: string;
  readonly tags?: ITag[] | ReadonlyArray<ITag>;
  readonly type?: Type;
}

export interface IFindAdjacencyArgs<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly adjacent?: FindModelArg<Type, Being, Knowledge>;
  readonly connected?: FindModelArg<Type, Being, Knowledge>;
}

export interface IFindAwarenessArgs<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly awareOf?: FindModelArg<Type, Being, Knowledge>;
  readonly inAwarenessGraph?: FindModelArg<Type, Being, Knowledge>;
}

export interface IFindContainmentArgs<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly ancestors?: FindModelArg<Type, Being, Knowledge>;
  readonly children?: FindModelArg<Type, Being, Knowledge>;
  readonly descendants?: FindModelArg<Type, Being, Knowledge>;
  readonly parent?: string | IModel<Type, Being, Knowledge> | IWorld;
}

export interface IFindThoughtArgs<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly links?: FindModelArg<Type, Being, Knowledge>;
  readonly thoughts?: FindModelArg<Type, Being, Knowledge>;
  readonly wants?: FindModelArg<Type, Being, Knowledge>;
}
