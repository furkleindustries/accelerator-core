import {
  IWorld,
} from '../world/IWorld';
import {
  WorldType,
} from '../world/WorldType';

export const isWorld = (maybe: any): maybe is IWorld => (
  maybe.type === WorldType
);
