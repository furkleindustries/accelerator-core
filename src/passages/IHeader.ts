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
} from '../../headers/headers-manifest';

type RegistryType = typeof registry;

export type HeaderNames = keyof RegistryType;

export interface IHeader
  extends
    IContentfulAsset<IPassageProps>,
    IPrecedenceWeighted
{
  readonly name: HeaderNames;
}
