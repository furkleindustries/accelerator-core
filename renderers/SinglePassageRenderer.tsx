import {
  navigate,
} from '../src/state/navigate';
import {
  Passage,
} from '../src/components/Passage/Passage';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';
import { Omit } from '../src/typeAliases/Omit';
import { IContext } from '../src/context/IContext';
import { IAcceleratorConfigNormalized } from '../src/configuration/IAcceleratorConfigNormalized';
import { Tag } from '../src/tags/Tag';
import { IPassageRenderer } from '../src/renderers/IPassageRenderer';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class SinglePassageRenderer implements IPassageRenderer {
  public readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  public readonly context: Omit<IContext, 'PassageRendererConstructor'>;

  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
  ) {
    this.config = assertValid(config);
    this.context = assertValid(context);
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

  public readonly navigateTo = (passageName: string, tags: Tag[]) => {
    const {
      passagesMap: { [passageName]: passage },
      store: { dispatch },
    } = this.context;

    assert(
      passage,
      strings.PASSAGE_NOT_FOUND.replace(/%name%/gi, passageName),
    );

    navigate({
      dispatch,
      passage,
      linkTags: tags || [],
    });
  };
};
