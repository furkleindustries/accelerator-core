import {
  IModel,
} from './IModel';
import {
  IOntology,
} from './IOntology';
import {
  ModelType,
} from './ModelType';

export interface IPortalModel<B extends ModelType> extends IModel<ModelType, B> {
  readonly being: IOntology<B>;
  readonly knowing: null;
  readonly type: ModelType.Portal;
  readonly transport: (model: string | IModel<ModelType, B>) => void;
}
