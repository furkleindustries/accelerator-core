import classNames from 'classnames';
import {
  warn,
} from 'colorful-logging';
import {
  IPassageRendererOwnProps,
} from '../src/renderers/IPassageRendererOwnProps';
import {
  PassageContainer,
} from '../src/components/PassageContainer';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../src/typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  SkipToContentLinkDestination,
} from '../src/components/SkipToContentLinkDestination';

import * as React from 'react';

import styles from '../passages/_global-styles/built-ins.less';

export class ScrollRenderer extends React.PureComponent<IPassageRendererOwnProps> {
  private elementBuffer: ReactNodeWithoutNullOrUndefined[] = [];
  private lastPassageTime: number;
  private unsubscribe: () => void;

  public readonly render = () => {
    const {
      context: {
        store: { getState },
      },
    } = this.props;

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
            {this.elementBuffer.slice(0, this.elementBuffer.length - 1).map((child, index) => {
              const doRewind = () => this.doRewind(index);
              return (
                <div
                  className={classNames(styles.pastScrollPassage, 'pastScrollPassage')}
                  key={index}
                  onClick={doRewind}
                >
                  {child}
                </div>
              );
            })}

            <SkipToContentLinkDestination />
          </>}

        <div className={classNames(
          styles.currentScrollPassage,
          'currentScrollPassage',
        )}>
          {this.elementBuffer[this.elementBuffer.length - 1]}
        </div>
      </>
    );
  };

  private readonly getPassageContainer = (ref: React.RefObject<HTMLSpanElement>) => {
    const {
      config,
      context: {
        footers,
        headers,
        passagesMap,
        store: {
          dispatch,
          getState,
        },
        
        soundManager,
      },

      passageFunctions,
    } = this.props;

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
        config={config}
        dispatch={dispatch}
        footers={footers}
        headers={headers}
        key={this.elementBuffer.length}
        lastLinkTags={lastLinkTags}
        passageObject={passagesMap[passageName]}
        ref={ref}
        soundManager={soundManager}
        storyState={storyState}
        {...passageFunctions}
      />
    );
  };

  public readonly componentDidMount = () => (
    this.unsubscribe = this.props.context.store.subscribe(this.subscription)
  );

  public readonly componentWillUnmount = () => this.unsubscribe();

  private readonly maintainBuffer = (
    buffer: ReactNodeWithoutNullOrUndefined[],
  ) => buffer.slice(Math.max(buffer.length - 10, 0), buffer.length);

  private readonly subscription = () => {
    const {
      context: {
        store: { getState },
      },
    } = this.props;

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

  private readonly doRewind = (index: number) => {
    const {
      passageFunctions: { rewind },
    } = this.props;

    let counter = 0;
    rewind(() => (counter += 1) < index);
  };
}
