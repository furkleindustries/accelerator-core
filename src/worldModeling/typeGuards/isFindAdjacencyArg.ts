import {
  FindAdjacencyArg,
} from '../querying/FindModelArgs';
import {
  isFindModelArg,
} from '../querying/isFindModelArg';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export const isFindAdjacencyArg = <
  Type extends OnticTypes,
  Being extends OnticTypes,
  Knowledge extends ModelType,
>(maybe: any): maybe is FindAdjacencyArg<
  Type,
  Being,
  Knowledge
> => Boolean(
  Array.isArray(maybe) &&
    maybe.length === 2 &&
    (typeof maybe[0] === 'string' || isFindAdjacencyArg(maybe[0])) &&
    isFindModelArg(maybe[1])
);
