import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  IPassageProps,
} from './IPassageProps';

import {
  registry,
} from '../../passages/passages-manifest';

type RegistryType = typeof registry;

export interface IPassage extends IContentfulAsset<IPassageProps> {
  readonly name: keyof RegistryType;
}
