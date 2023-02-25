import {
  MediaPreloadStrategies,
} from './MediaPreloadStrategies';

export interface MediaPreloadDefinition {
  readonly name: string;
  readonly url: string;
  readonly preloadStrategy?: MediaPreloadStrategies;
}
