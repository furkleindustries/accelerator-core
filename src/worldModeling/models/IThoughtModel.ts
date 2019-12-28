import {
  IModel,
} from './IModel';
import {
  ModelType,
} from './ModelType';

export interface IThoughtModel extends IModel<ModelType.Thought> {
  readonly being: null;
  readonly knowledge: null;
  readonly type: ModelType.Thought;
}
