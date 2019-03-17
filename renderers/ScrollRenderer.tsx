import {
  AbstractPassageRenderer,
} from '../src/renderers/AbstractPassageRenderer';
import {
  warn,
} from 'colorful-logging';
import {
  createStoryStateAction,
} from '../src/actions/creators/createStoryStateAction';
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
  PassageContainer,
} from '../src/components/PassageContainer/PassageContainer';
import {
  Omit,
} from '../src/typeAliases/Omit';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../src/typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  SkipToContentLinkDestination,
} from '../src/components/SkipToContentLinkDestination/SkipToContentLinkDestination';

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
    const {
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

    const ref = React.createRef<HTMLSpanElement>();

    this.elementBuffer.push(this.getPassageContainer(ref));    
    this.elementBuffer = this.maintainBuffer(this.elementBuffer);

    this.lastPassageTime = passageTimeCounter;

    /* Don't scroll if it's the first passage. */
    if (this.elementBuffer.length > 1) {
      /* Don't fire the scroll event until rendering is complete. */
      setTimeout(() => this.scrollToNewPassage(ref));
    }

    return (
      <>
        {this.elementBuffer.length === 1 ?
          <SkipToContentLinkDestination /> :
          <>
            {this.elementBuffer.slice(0, this.elementBuffer.length - 1)}

            <SkipToContentLinkDestination />
          </>}

        {this.elementBuffer[this.elementBuffer.length - 1]}
      </>
    );
  };

  private readonly getPassageContainer = (ref: React.RefObject<HTMLSpanElement>) => {
    const {
      footers,
      headers,
      passagesMap,
      store: {
        dispatch,
        getState,
      },

      soundManager,
    } = this.context;

    const {
      history: {
        present: {
          lastLinkTags,
          passageName,
          storyState,
        },
      },
    } = getState();

    return (
      <PassageContainer
        dispatch={dispatch}
        footers={footers}
        headers={headers}
        key={this.elementBuffer.length}
        lastLinkTags={lastLinkTags}
        passageObject={passagesMap[passageName]}
        ref={ref}
        soundManager={soundManager}
        storyState={storyState}
        {...this.passageFunctions}
      />
    );
  };

  private readonly maintainBuffer = (
    buffer: ReactNodeWithoutNullOrUndefined[],
  ) => buffer.slice(Math.max(buffer.length - 10, 0), buffer.length);

  private readonly subscription = () => {
    const {
      store: { getState },
    } = this.context;

    const { storyRequiresFullRerender } = getState();

    if (storyRequiresFullRerender) {
      const ref = React.createRef<HTMLSpanElement>();
      this.elementBuffer = [ this.getPassageContainer(ref) ];
    }
  };

  private readonly scrollToNewPassage = (ref: React.RefObject<HTMLSpanElement>) => {
    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop });
      ref.current.focus();
    } else {
      warn('The ref has not been added and the passage cannot be scrolled.');
    }
  };
}
