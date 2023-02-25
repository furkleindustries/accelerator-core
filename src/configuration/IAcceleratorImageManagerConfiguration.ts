import {
  ImagePreloadMap,
} from './ImagePreloadMap';
import {
  MediaPreloadStrategies,
} from './MediaPreloadStrategies';

export interface IAcceleratorImageManagerConfiguration {
  readonly defaultPreloadStrategies?: MediaPreloadStrategies;
  readonly imagesToPreload?: ImagePreloadMap;
}
