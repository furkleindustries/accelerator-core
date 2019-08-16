import {
  BaseAdjacencies, getDirection,
} from '../ontology/BaseAdjacencies';

export const isAdjacency = <T extends BaseAdjacencies = BaseAdjacencies>(
  maybe: any,
): maybe is T => Boolean(getDirection(maybe));
