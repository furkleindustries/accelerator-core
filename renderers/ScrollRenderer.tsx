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
  navigate,
} from '../src/state/navigate';
import {
  Passage,
} from '../src/components/Passage/Passage';
import {
  Omit,
} from '../src/typeAliases/Omit';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../src/typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Tag,
} from '../src/tags/Tag';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage named %NAME% could be found within the passages map.',
};

export class ScrollRenderer implements IPassageRenderer {
  public readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  public readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  public elementBuffer: ReactNodeWithoutNullOrUndefined[] = [];

  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
  ) {
    this.config = assertValid(
      config,
    );

    this.context = assertValid(
      context,
    );

    this.context.store.subscribe(this.subscription);
  }

  public readonly render = () => {
    this.elementBuffer.push(
      <Passage
        footers={this.context.footers}
        headers={this.context.headers}
        passagesMap={this.context.passagesMap}
        plugins={this.context.plugins}
        navigateTo={this.navigateTo}
        soundManager={this.context.soundManager}
      />,
    );

    this.elementBuffer = this.maintainBuffer(this.elementBuffer);
    return this.elementBuffer;
  };

  private readonly maintainBuffer = (
    buffer: ReactNodeWithoutNullOrUndefined[],
  ) => buffer.slice(Math.max(buffer.length - 10, 0), buffer.length);

  private readonly navigateTo = (passageName: string, tags: Tag[]) => {
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

  private readonly subscription = () => {
    const {
      store: { getState },
    } = this.context;

    if (getState().storyRequiresFullRerender) {
      this.elementBuffer = [];
    }
  };
};
