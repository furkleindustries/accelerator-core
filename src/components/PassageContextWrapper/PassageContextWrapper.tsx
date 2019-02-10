import {
  getFootersContext,
} from '../context/getFootersContext';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../context/getPluginsContext';
import {
  getSoundManagerContext,
} from '../context/getSoundManagerContext';
import {
  getHeadersContext,
} from '../context/getHeadersContext';
import {
  IPassageContextWrapperDispatchProps,
} from './IPassageContextWrapperDispatchProps';
import {
  PassageContentsContainerConnected,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders/PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters/PassageFooters';
import {
  navigate,
} from '../../state/navigate';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Tag,
} from '../../tags/Tag';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_NOT_FOUND:
    'No passage could be found in the passages map with the name %NAME%.',
};

const { Consumer: FootersContextConsumer } = getFootersContext();
const { Consumer: HeadersContextConsumer } = getHeadersContext();
const {
  Consumer: PassagesMapContextConsumer,
} = getPassagesMapAndStartPassageNameContext();

const {
  Consumer: PluginsContextConsumer,
} = getPluginsContext();

const { Consumer: SoundManagerContextConsumer } = getSoundManagerContext();
      
export class PassageContextWrapper extends React.PureComponent<
  IPassageContextWrapperDispatchProps
> {
  constructor(props: any) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }

  render() {
    return (
      <FootersContextConsumer>
        {({ footers }) => (
          <HeadersContextConsumer>
            {({ headers }) => (
              <PassagesMapContextConsumer>
                {({ passagesMap }) => (
                  <PluginsContextConsumer>
                    {({ plugins }) => (
                      <SoundManagerContextConsumer>
                        {({ soundManager }) => {
                          const passageProps = {
                            passagesMap,
                            soundManager,
                            navigateTo: this.navigateTo,
                          };

                          return <>
                            {
                              /* Weird bug where react-redux is arguing with the types
                              * since the last major version. Remember to file against
                              * https://github.com/reduxjs/react-redux */
                              // @ts-ignore
                              <PassageHeadersConnected
                                headers={headers}
                                {...passageProps}
                              />
                            }

                            <PassageContentsContainerConnected
                              plugins={plugins}
                              {...passageProps}
                            />

                            {
                              /* See above re: react-redux bug. */
                              // @ts-ignore
                              <PassageFootersConnected
                                footers={footers}
                                {...passageProps}
                              />
                            }
                          </>;
                        }}
                      </SoundManagerContextConsumer>
                    )}
                  </PluginsContextConsumer>
                )}
              </PassagesMapContextConsumer>
            )}
          </HeadersContextConsumer>
        )}
      </FootersContextConsumer>
    )
  }

  private navigateTo(passageName: string, tags?: Tag[]) {
    const { dispatch } = this.props;

    const {
      passagesMap: { [passageName]: passage },
    } = this.context;

    assert(
      passage,
      strings.PASSAGE_NOT_FOUND,
    );

    navigate({
      dispatch,
      passage,
      linkTags: tags || [],
    });
  }
}

export const mapDispatchToProps: MapDispatchToProps<
  IPassageContextWrapperDispatchProps,
  null
> = (dispatch) => ({ dispatch });

export const PassageContextWrapperConnected = connect(
  null,
  mapDispatchToProps,
)(PassageContextWrapper);
