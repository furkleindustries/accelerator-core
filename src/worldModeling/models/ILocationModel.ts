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

export interface ILocationModel<
  Being extends BeingNoThoughtsBase,
  Knowledge extends never,
> extends IModel<ModelType.Location, Being, never>
{
  readonly being: IOntology<
    ModelType.Location,
    Being,
    Knowledge
  >;

  readonly knowledge: null;
  readonly type: ModelType.Location;
}
