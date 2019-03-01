import {
  IAcceleratorConfigNormalized,
} from '../src/configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../src/context/IContext';
import {
  IPassageProps,
} from '../src/passages/IPassageProps';
import {
  IPassageRenderer,
} from '../src/renderers/IPassageRenderer';
import {
  Omit,
} from '../src/typeAliases/Omit';
import {
  ReactElement,
} from 'react';

export class SinglePassageRenderer implements IPassageRenderer {
  readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  render(...args: any[]): ReactElement<IPassageProps>;
}
