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
  ReactNodeWithoutNullOrUndefined,
} from '../src/typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Tag,
} from '../src/tags/Tag';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';
import { warn } from 'colorful-logging';

export class ScrollRenderer implements IPassageRenderer {
  public readonly config: Omit<IAcceleratorConfigNormalized, 'rendererName'>;
  public readonly context: Omit<IContext, 'PassageRendererConstructor'>;
  public readonly navigateTo: (passageName: string, tags?: Tag[]) => void;
  public elementBuffer: ReactNodeWithoutNullOrUndefined[] = [];

  private lastPassageTime: number;

  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
    navigateTo: (passageName: string, tags?: Tag[]) => void,
  ) {
    this.config = assertValid(
      config,
    );

    this.context = assertValid(
      context,
    );

    this.navigateTo = assertValid(
      navigateTo,
      '',
      (func) => typeof func === 'function',
    );

    this.context.store.subscribe(this.subscription);
  }

  public readonly render = () => {
    const ref = React.createRef<HTMLSpanElement>();

    const {
      footers,
      headers,
      passagesMap,
      plugins,
      soundManager,
      store: { getState },
    } = this.context;

    const {
      history: {
        present: { passageTimeCounter },
      },
    } = getState();

    if (this.lastPassageTime === passageTimeCounter) {
      /* Do not add a new passage to the scroll if the passage time
       * counter has not progressed since the last render. */
      return this.elementBuffer;
    }

    this.elementBuffer.push(
      <Passage
        footers={footers}
        headers={headers}
        key={this.elementBuffer.length}
        passagesMap={passagesMap}
        plugins={plugins}
        navigateTo={this.navigateTo}
        ref={ref}
        soundManager={soundManager}
      />,
    );

    this.elementBuffer = this.maintainBuffer(this.elementBuffer);

    this.lastPassageTime = passageTimeCounter;

    /* Don't fire the scroll event until rendering is complete. */
    setTimeout(() => this.scrollToNewPassage(ref));

    return this.elementBuffer;
  };

  private readonly maintainBuffer = (
    buffer: ReactNodeWithoutNullOrUndefined[],
  ) => buffer.slice(Math.max(buffer.length - 10, 0), buffer.length);

  private readonly subscription = () => {
    const {
      store: { getState },
    } = this.context;

    if (getState().storyRequiresFullRerender) {
      this.elementBuffer = [];
    }
  };

  private readonly scrollToNewPassage = (ref: React.RefObject<HTMLSpanElement>) => {
    if (ref.current) {
      ref.current.scrollTo();
    } else {
      warn('The ref has not been added and the passage cannot be scrolled.');
    }
  }
}
