import {
  AbstractPassageRenderer,
} from '../src/renderers/AbstractPassageRenderer';
import {
  warn,
} from 'colorful-logging';
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
import {
  ReactNodeWithoutNullOrUndefined,
} from '../src/typeAliases/ReactNodeWithoutNullOrUndefined';

import * as React from 'react';

export class ScrollRenderer extends AbstractPassageRenderer {
  private elementBuffer: ReactNodeWithoutNullOrUndefined[] = [];

  private lastPassageTime: number;

  constructor(
    config: Omit<IAcceleratorConfigNormalized, 'rendererName'>,
    context: Omit<IContext, 'PassageRendererConstructor'>,
    passageFuncs: IPassageFunctions,
  ) {
    super(config, context, passageFuncs);
    this.context.store.subscribe(this.subscription);
  }

  public readonly render = () => {
    const ref = React.createRef<HTMLSpanElement>();

    const {
      footers,
      headers,
      passagesMap,
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
        ref={ref}
        soundManager={soundManager}
        {...this.passageFunctions}
      />,
    );

    debugger;
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
      window.scrollTo({ top: ref.current.clientTop });
    } else {
      warn('The ref has not been added and the passage cannot be scrolled.');
    }
  };
}
