import {
  FindModelArgs,
} from './FindModelArgs';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export const isFindModelArg = <
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
>(
  maybe: any,
): maybe is FindModelArgs<Type, Being, Knowledge> => (
  maybe && (typeof maybe === 'string' || Array.isArray(maybe))
);
