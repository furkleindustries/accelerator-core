import {
  ICreatePreloadTagParameters,
} from './ICreatePreloadTagParameters';

export const createPreloadHint = ({
  mediaType,
  name,
  preloadType,
  url,
}: ICreatePreloadTagParameters) => ({
  key: `preloadhint-${preloadType}-${mediaType}-${name}`,
  value: url,
});
