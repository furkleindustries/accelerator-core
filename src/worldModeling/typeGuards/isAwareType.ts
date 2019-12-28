import {
  AwareTypes,
} from '../relations/AwareTypes';
import {
  isEpistemicType,
} from './isEpistemicType';
import {
  isOnticType,
} from './isOnticType';

export const isAwareType = (maybe: any): maybe is AwareTypes => (
  isEpistemicType(maybe) && isOnticType(maybe)
);
