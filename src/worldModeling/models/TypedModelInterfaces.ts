import {
  IActorModel,
} from './IActorModel';
import {
  ILocationModel,
} from './ILocationModel';
import {
  IPortalModel,
} from './IPortalModel';
import {
  IObjectModel,
} from './IObjectModel';
import {
  IThoughtModel,
} from './IThoughtModel';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export type TypedModelInterfaces<
  Being extends OnticTypes = never,
  Knowledge extends ModelType = never,
> = {
  readonly [ModelType.Actor]: IActorModel<Being, Knowledge>,
  readonly [ModelType.Location]: ILocationModel<Being>,
  readonly [ModelType.Object]: IObjectModel<Being>,
  readonly [ModelType.Portal]: IPortalModel<Being>,
  readonly [ModelType.Thought]: IThoughtModel,
};
