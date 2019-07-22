import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  FindModelArg,
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
  NoStrings,
} from '../../typeAliases/NoStrings';
import {
  Tag,
} from '../../tags/Tag';

export interface IQueryArguments<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly adjacent?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly ancestors?: Array<string | IModel<Type, Being, Knowledge> | IWorld>;
  readonly awareOf?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly children?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly connected?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly descendants?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly inAwarenessGraph?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly links?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly name?: string;
  readonly parent?: string | IModel<Type, Being, Knowledge> | IWorld;
  readonly tags?: Array<Tag | string>;
  readonly thoughts?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly type?: Type;
  readonly wants?:  NoStrings<FindModelArg<Type, Being, Knowledge>>;
}
