import {
  IAcceleratorIconsConfiguration,
} from './IAcceleratorIconsConfiguration';
import {
  LanguageDirectionalities,
} from '../typeAliases/LanguageDirectionalities';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  WebAppCategories,
} from '../typeAliases/WebAppCategories';

export interface IAcceleratorStoryMetadataConfiguration {
  readonly appDisplayMode:
    'browser' |
    'fullscreen' |
    'minimal-ui' |
    'standalone';

  readonly appOrientation:
    'any' |
      'landscape' |
      'landscape-primary' |
      'landscape-secondary' |
      'natural' |
      'portrait' |
      'portrait-primary' |
      'portrait-secondary';

  readonly categories: MaybeReadonlyArray<WebAppCategories>;
  readonly description: string;
  readonly ifid: string;
  readonly language: string;
  readonly languageDirectionality: LanguageDirectionalities;
  readonly robots: Array<string | [ string, string ]>;
  readonly scope: string;
  readonly screenshots: MaybeReadonlyArray<string>;
  readonly shortcuts: MaybeReadonlyArray<string>;
  readonly startUrl: string;
  readonly icons: IAcceleratorIconsConfiguration;
  readonly title: string;
}
