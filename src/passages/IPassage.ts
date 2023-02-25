import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  PassageNames,
} from './IPassagesMap';
import {
  IPassageProps,
} from './IPassageProps';

export interface IPassage extends IContentfulAsset<IPassageProps> {
  readonly name: PassageNames;
}
