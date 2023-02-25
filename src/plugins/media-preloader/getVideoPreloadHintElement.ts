import {
  MediaPreloadStrategies,
} from '../../configuration/MediaPreloadStrategies';

export const getVideoPreloadHintElement = (
  url: string,
  imageName: string,
  preloadHint = MediaPreloadStrategies.PreloadFull,
) => {
  const link = document.createElement('link');
  link.rel = preloadHint;
  link.href = url;
  link.as = 'image';
  link.dataset.name = imageName;

  return link;
};
