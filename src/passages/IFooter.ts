import {
  IContentfulAsset,
} from '../interfaces/IContentfulAsset';
import {
  IPassageProps,
} from './IPassageProps';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

import {
  registry,
} from '../../footers/footers-manifest';

type RegistryType = typeof registry;

export type FooterNames = keyof RegistryType;

export interface IFooter
  extends
    IContentfulAsset<IPassageProps>,
    IPrecedenceWeighted
{
  readonly name: FooterNames;
}
