import {
  MediaPreloadStrategies,
} from '../../configuration/MediaPreloadStrategies';

export const getAudioPreloadHintElement = (
  url: string,
  soundName: string,
  groupName = 'default',
  preloadHint = MediaPreloadStrategies.PreloadFull,
) => {
  const audioElem = document.createElement('audio');
  audioElem.autoplay = false;
  audioElem.controls = false;
  audioElem.hidden = true;
  audioElem.preload = preloadHint === MediaPreloadStrategies.PreloadFull ?
    'auto' :
    'metadata';

  audioElem.src = url;
  audioElem.dataset.name = `${soundName}_${groupName}`;

  return audioElem;
};
