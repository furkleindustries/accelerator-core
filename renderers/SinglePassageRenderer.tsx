import {
  AbstractPassageRenderer,
} from '../src/renderers/AbstractPassageRenderer';
import {
  IAcceleratorConfigNormalized,
} from '../src/configuration/IAcceleratorConfigNormalized';
import {
  IContext,
} from '../src/context/IContext';
import {
  IPassageFunctions,
} from '../src/passages/IPassageFunctions';
import {
  Passage,
} from '../src/components/Passage/Passage';
import {
  Omit,
} from '../src/typeAliases/Omit';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class SinglePassageRenderer extends AbstractPassageRenderer {
  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
    passageFuncs: IPassageFunctions,
  ) {
    super(config, context, passageFuncs);
  }

  public readonly render = () => (
    <Passage
      footers={this.context.footers}
      headers={this.context.headers}
      passagesMap={this.context.passagesMap}
      plugins={this.context.plugins}
      soundManager={this.context.soundManager}
      {...this.passageFunctions}
    />
  );
};
