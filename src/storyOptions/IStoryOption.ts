import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';
import {
  IStoryOptionComponentOwnProps,
} from './IStoryOptionComponentOwnProps';

export interface IStoryOption
  extends
    IContentfulAsset<IStoryOptionComponentOwnProps>,
    IPrecedenceWeighted
{}
