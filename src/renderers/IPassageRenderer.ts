import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
import {
  IPassageProps,
} from '../passages/IPassageProps';
 import {
  Omit,
} from '../typeAliases/Omit';
import {
  ReactElement,
  ReactFragment,
} from 'react';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageRenderer {
  readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  render(...args: any[]): ReactElement<IPassageProps> | ReactFragment;
  navigateTo(passageName: string, tags?: Tag[]): void;
}
