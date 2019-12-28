import {
  FindAdjacencyArg,
  FindModelArg,
} from './FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  ITag,
} from '../../tags/ITag';
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
  NoThought,
} from '../models/NoThought';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IQueryArguments<
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> {
  readonly adjacent?: FindAdjacencyArg<NoThought<Type>, Being, Knowledge>;
  readonly ancestors?: Array<string | IModel<Type, Being, Knowledge> | IWorld>;
  readonly awareOf?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly children?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly connected?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly descendants?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly inAwarenessGraph?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly links?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly name?: string;
  readonly parent?: string | IModel<Type, Being, Knowledge> | IWorld;
  readonly tags?: Array<ITag | string>;
  readonly thoughts?: NoStrings<FindModelArg<Type, Being, Knowledge>>;
  readonly type?: Type;
  readonly wants?:  NoStrings<FindModelArg<Type, Being, Knowledge>>;
}
