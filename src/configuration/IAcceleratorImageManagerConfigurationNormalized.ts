import {
  ImagePreloadMap,
} from './ImagePreloadMap';
import {
  MediaPreloadStrategies,
} from './MediaPreloadStrategies';

export interface IAcceleratorImageManagerConfigurationNormalized {
  readonly defaultPreloadStrategy: MediaPreloadStrategies;
  readonly imagesToPreload: ImagePreloadMap;
}
