import {
  getAudioPreloadHintElement,
} from './getAudioPreloadHintElement';
import {
  getImagePreloadHintElement,
} from './getImagePreloadHintElement';
import {
  getVideoPreloadHintElement,
} from './getVideoPreloadHintElement';
import {
  MediaPreloadStrategies,
} from '../../configuration/MediaPreloadStrategies';
import {
  IPlugin,
} from '../../../bundles/pluginsBundle';
import {
  addTag,
} from '../../../bundles/tagsBundle';

type StructuredSplit = [
  'preloadhint' | string | undefined,
  MediaPreloadStrategies | string | undefined,
  'image' | 'sound' | string | undefined,
  string | undefined,
  string | undefined,
];

type Splitted = Array<string | undefined> & StructuredSplit;

export class MediaPreloaderPlugin implements IPlugin {
  public readonly afterPassageChange: IPlugin['afterPassageChange'] = ({
    passageObject: { tags = [] },
  }) => (
    requestAnimationFrame(() => {
      const elementsToAdd: HTMLElement[] = [];
      tags.forEach((tag) => {
        const [
          {
            key,
            value,
          },
        ] = addTag(tag);

        if (!key || !value) {
          return;
        }

        const url = value.toString();
        const split = key.split('-').filter(Boolean) as Splitted;
        const directive = split[0] as string | undefined;
        const strategy = split[1] as MediaPreloadStrategies | undefined;
        const mediaType = split[2] as 'image' | 'media' | 'sound' | 'video' | undefined;
        const baseId = split.slice(3).join('-');

        if (directive === 'preloadhint') {
          if (strategy === MediaPreloadStrategies.PreloadFull ||
            strategy === MediaPreloadStrategies.Preconnect)
          {
            if (mediaType === 'image') {
              // Batch document queries for efficiency. Querying multiple times takes
              // more time.
              const selectorOne = `link[rel="${strategy}"][as="image"][data-name="${baseId}"]`;
              const selectorTwo = `link[rel="${strategy}"][as="media"][data-name="${baseId}"]`;

              const fullSelector = [
                selectorOne,
                selectorTwo,
              ].join(', ');

              const preloadHintAlreadyExists = this.preloadHintAlreadyExists(fullSelector);
              if (!preloadHintAlreadyExists) {
                elementsToAdd.push(getImagePreloadHintElement(
                  url,
                  baseId,
                  strategy,
                ));
              }
            } else if (mediaType === 'sound') {
              const soundName = split.slice(3, -1).join('-');
              const groupName = split[split.length - 1];

              if (soundName && groupName) {
                // Batch together for efficiency. Querying doc multiple times
                // takes more time.
                const nameId = `${soundName}_${groupName}`;
                const selectorOne = `link[rel="${strategy}"][as="audio"][data-name="${nameId}"]`;
                const selectorTwo = `link[rel="${strategy}"][as="media"][data-name="${nameId}"]`;
                const selectorThree = `audio[preload][data-name="${nameId}"]`;

                const fullSelector = [
                  selectorOne,
                  selectorTwo,
                  selectorThree,
                ].join(', ');

                const preloadHintAlreadyExists = this.preloadHintAlreadyExists(fullSelector);
                if (!preloadHintAlreadyExists) {
                  elementsToAdd.push(getAudioPreloadHintElement(
                    url,
                    soundName,
                    groupName,
                    strategy,
                  ));
                }
              }
            } else if (mediaType === 'video') {
              if (baseId) {
                // Batch together for efficiency. Querying doc multiple times
                // takes more time.
                const selectorOne = `link[rel="${strategy}"][as="video"][data-name="${baseId}"]`;
                const selectorTwo = `link[rel="${strategy}"][as="media"][data-name="${baseId}"]`;
                const selectorThree = `video[preload][data-name="${baseId}"]`;

                const fullSelector = [
                  selectorOne,
                  selectorTwo,
                  selectorThree,
                ].join(', ');
    
                const preloadHintAlreadyExists = this.preloadHintAlreadyExists(fullSelector);

                if (!preloadHintAlreadyExists) {
                  elementsToAdd.push(getVideoPreloadHintElement(
                    url,
                    baseId,
                    strategy,
                  ));
                }
              }
            }
          }
        }
      });

      if (elementsToAdd.length) {
        document.head.append(...elementsToAdd);
      }
    })
  );

  public readonly preloadHintAlreadyExists = (selector: string) => (
    Boolean(document.head.querySelector(selector))
  );
}
