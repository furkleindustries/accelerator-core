import {
  MediaPreloadStrategies,
} from '../configuration/MediaPreloadStrategies';

export interface ICreatePreloadTagParameters {
  readonly name: string;
  readonly preloadType: MediaPreloadStrategies;
  readonly mediaType: 'image' | 'sound' | 'video';
  readonly url: string;
}
