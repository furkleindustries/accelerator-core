import {
  IModel,
} from './IModel';
import {
  ModelType,
} from './ModelType';

export interface IThoughtModel<
  Type extends ModelType.Thought,
> extends IModel<Type, ModelType, ModelType>
{
  readonly being: null;
  readonly knowledge: null;
  readonly type: Type;
}
