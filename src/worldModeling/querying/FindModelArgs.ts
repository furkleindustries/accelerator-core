import {
  ContainableTypes,  
} from '../relations/ContainableTypes';
import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
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
  OnticTypes,
} from '../ontology/OnticTypes';

export type FindModelArg<
  Type extends ModelType = ModelType,
  Being extends OnticTypes = OnticTypes,
  Knowledge extends ModelType = ModelType,
> =
  string |
    Array<string | ModelType | IModel<Type, Being, Knowledge>>;

export interface FindModelArgs<
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> extends IFindBaseArgs<Type>
{
  readonly adjacent?: Type extends OnticTypes ?
    FindModelArg<Type, Being, Knowledge> :
    undefined;

  readonly connected?:  Type extends OnticTypes ?
    FindModelArg<Type, Being, Knowledge> :
    undefined;

    
  readonly awareOf?: Type extends EpistemicTypes & OnticTypes ?
    FindModelArg<Type, Being> :
    undefined;

  readonly inAwarenessGraph?: Type extends EpistemicTypes & OnticTypes ?
    FindModelArg<Type, Being> :
    undefined;
    
  readonly ancestors?: Type extends ContainableTypes ?
    FindModelArg<Type, Being, ModelType> :
    undefined;

  readonly children?: Type extends ContainableTypes ?
    FindModelArg<Type, Being, ModelType> :
    undefined;

  readonly descendants?: Type extends ContainableTypes ?
    FindModelArg<Type, Being, ModelType> :
    undefined;

  readonly parent?: Type extends ContainableTypes ?
    string | IModel<Type, Being, ModelType> | IWorld :
    undefined;

  readonly links?: Type extends EpistemicTypes ?
    FindModelArg<Type, Being, Knowledge> :
    undefined;

  readonly thoughts?: Type extends EpistemicTypes ?
    FindModelArg<Type, Being, Knowledge> :
    undefined;

  readonly wants?: Type extends EpistemicTypes ?
    FindModelArg<Type, Being, Knowledge> :
    undefined;
}

export interface IFindBaseArgs<Type extends ModelType> {
  readonly andOrBehavior?: 'and' | 'or';
  readonly name?: string;
  readonly tags?: ITag[] | ReadonlyArray<ITag>;
  readonly type?: Type;
}

export type FindAdjacencyArgs<
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> = Pick<FindModelArgs<Type, Being, Knowledge>, 'adjacent' | 'connected'>;

export type FindAwarenessArgs<
  Type extends EpistemicTypes & OnticTypes,
  Being extends OnticTypes,
> = Pick<
  FindModelArgs<Type, Being, ModelType>,
  'awareOf' | 'inAwarenessGraph'
>;

export type FindContainmentArgs<
  Type extends ContainableTypes,
  Being extends OnticTypes,
> = Pick<
  FindModelArgs<Type, Being, ModelType>,
  'ancestors' | 'children' | 'descendants' | 'parent'
>;

export type FindThoughtArgs<
  Type extends ModelType,
  Knowledge extends ModelType,
> = Pick<
  FindModelArgs<Type, OnticTypes, Knowledge>,
  'links' | 'thoughts' | 'wants'
>;

export type FindEpistemicArgs<
  Type extends EpistemicTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> = FindAwarenessArgs<Type, Being> &
  FindThoughtArgs<Type, Knowledge>;

export type FindOnticArgs<
  Type extends OnticTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> = FindAdjacencyArgs<Type, Being, Knowledge> &
  (Type extends ContainableTypes ? FindContainmentArgs<Type, Being> : {});

