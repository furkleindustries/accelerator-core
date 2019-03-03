import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../context/IContext';
import {
  IPassageFunctions,
} from '../passages/IPassageFunctions';
import {
  IPassageProps,
} from '../passages/IPassageProps';
import {
  IPassageRenderer,
} from './IPassageRenderer';
import {
  ReactElement,
  ReactFragment,
} from 'react';
import {
  Omit,
} from '../typeAliases/Omit';
import {
  assertValid,
} from 'ts-assertions';

export abstract class AbstractPassageRenderer implements IPassageRenderer {
  public readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  public readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  public readonly passageFunctions: IPassageFunctions;

  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
    passageFuncs: IPassageFunctions,
  ) {
    this.config = assertValid(
      config,
    );

    this.context = assertValid(
      context,
    );

    this.passageFunctions = assertValid(
      passageFuncs,
    );
  }

  abstract render(): ReactElement<IPassageProps> | ReactFragment;
}
