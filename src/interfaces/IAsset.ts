import {
  ITaggable,
} from './ITaggable';

export interface IAsset extends ITaggable {
  readonly name: string;
}
