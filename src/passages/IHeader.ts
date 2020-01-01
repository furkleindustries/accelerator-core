import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  IPassageProps,
} from './IPassageProps';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

export interface IHeader
  extends
    IContentfulAsset<IPassageProps>,
    IPrecedenceWeighted
{
}
