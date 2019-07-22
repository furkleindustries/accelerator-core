import {
  IModel,
} from './IModel';
import {
  ModelType,
} from './ModelType';

export interface IThoughtModel<
  Type extends ModelType.Thought,
> extends IModel<Type, never, never>
{
  readonly being: never;
  readonly knowledge: never;
  readonly type: Type;
}
