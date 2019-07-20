import {
  IFindModelArg,
} from '../models/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IQueryArguments<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly adjacent?: Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
  readonly ancestors?: Array<string | IModel<Type, Being, Knowledge> | IWorld>;
  readonly awareOf?: Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
  readonly children?: Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
  readonly connected?: Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
  readonly descendants?: Exclude<
    IFindModelArg<Type, Being, Knowledge>,
    string
  >;

  readonly inAwarenessGraph?: Exclude<
    IFindModelArg<Type, Being, Knowledge>,
    string
  >;

  readonly links?: Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
  readonly name?: string;
  readonly parent?: string | IModel<Type, Being, Knowledge> | IWorld;
  readonly tags?: Array<Tag | string>;
  readonly thoughts?: Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
  readonly type?: Type;
  readonly wants?:  Exclude<IFindModelArg<Type, Being, Knowledge>, string>;
}