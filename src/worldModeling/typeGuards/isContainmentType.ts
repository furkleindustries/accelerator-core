import {
  isContainableType,
} from './isContainableType';
import {
  isContainingType,
} from './isContainingType';
import {
  ContainmentTypes,
} from '../relations/ContainmentTypes';

export const isContainmentType = (maybe: any): maybe is ContainmentTypes => {
  return isContainableType(maybe) || isContainingType(maybe);
};
