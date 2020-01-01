import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  IPassageProps,
} from './IPassageProps';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

export interface IFooter
  extends
    IContentfulAsset<IPassageProps>,
    IPrecedenceWeighted
{
}
