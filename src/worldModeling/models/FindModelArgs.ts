import {
  IModel,
} from './IModel';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export type IFindModelArg<T extends ModelType> =
  string | Array<string | ModelType | IModel<T>>;

export type FindModelArgs<T extends ModelType> =
  IFindBaseArgs<T> &
    IFindAdjacencyArgs<T> &
    IFindAwarenessArgs<T> &
    IFindContainmentArgs<T> &
    IFindThoughtArgs<T>;

export interface IFindBaseArgs<T extends ModelType> {
  readonly name?: string;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
  readonly type?: T;
}

export interface IFindAdjacencyArgs<T extends ModelType> {
  readonly adjacencies?: IFindModelArg<T>;
  readonly paths?: IFindModelArg<T>;
}

export interface IFindAwarenessArgs<T extends ModelType> {
  readonly awareOf?: IFindModelArg<T>;
  readonly connections?: IFindModelArg<T>;
}

export interface IFindContainmentArgs<T extends ModelType> {
  readonly ancestors?: IFindModelArg<T>;
  readonly children?: IFindModelArg<T>;
  readonly descendants?: IFindModelArg<T>;
  readonly parent?: IFindModelArg<T>;
}

export interface IFindThoughtArgs<T extends ModelType> {
  readonly links?: IFindModelArg<T>;
  readonly thoughts?: IFindModelArg<T>;
}
