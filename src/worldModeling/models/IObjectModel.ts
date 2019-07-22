import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  IModel,
} from './IModel';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';

export interface IObjectModel<
  Being extends BeingNoThoughtsBase,
> extends IModel<ModelType.Object, Being, never>
{
  readonly being: IOntology<ModelType.Object, Being, never>;
  readonly knowledge: null;
  readonly type: ModelType.Object;
}
