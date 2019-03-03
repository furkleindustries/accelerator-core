import {
  IAcceleratorConfigNormalized,
} from '../src/configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../src/context/IContext';
import {
  IPassageRenderer,
} from '../src/renderers/IPassageRenderer';
import {
  Passage,
} from '../src/components/Passage/Passage';
import {
  Omit,
} from '../src/typeAliases/Omit';
import {
  Tag,
} from '../src/tags/Tag';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class SinglePassageRenderer implements IPassageRenderer {
  public readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  public readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  public readonly navigateTo: (passageName: string, tags?: Tag[]) => void;

  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
    navigateTo: (passageName: string, tags?: Tag[]) => void,
  ) {
    this.config = assertValid(config);
    this.context = assertValid(context);
    this.navigateTo = assertValid(
      navigateTo,
      '',
      (func) => typeof func === 'function',
    );
  }

  public readonly render = () => (
    <Passage
      footers={this.context.footers}
      headers={this.context.headers}
      passagesMap={this.context.passagesMap}
      plugins={this.context.plugins}
      navigateTo={this.navigateTo}
      soundManager={this.context.soundManager}
    />
  );
};
