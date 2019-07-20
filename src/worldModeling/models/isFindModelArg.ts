import {
  FindModelArgs,
} from './FindModelArgs';
import {
  ModelType,
} from './ModelType';

export const isFindModelArg = <
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
>(
  maybe: any,
): maybe is FindModelArgs<Type, Being, Knowledge> => (
  maybe && (typeof maybe === 'string' || Array.isArray(maybe))
);
