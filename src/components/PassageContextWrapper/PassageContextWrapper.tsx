import {
  getFootersContext,
} from '../../context/getFootersContext';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
import {
  getSoundManagerContext,
} from '../../context/getSoundManagerContext';
import {
  getHeadersContext,
} from '../../context/getHeadersContext';
import {
  IPassageContextWrapperDispatchProps,
} from './IPassageContextWrapperDispatchProps';
import {
  Passage,
} from '../Passage/Passage';
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
  public render = () => {
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

                          return (
                            <Passage
                              footers={footers}
                              headers={headers}
                              plugins={plugins}
                              {...passageProps}
                            />
                          );
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
  };

  private navigateTo = (passageName: string, tags?: Tag[]) => {
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
  };
}

export const mapDispatchToProps: MapDispatchToProps<
  IPassageContextWrapperDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const PassageContextWrapperConnected = connect(
  null,
  mapDispatchToProps,
)(PassageContextWrapper);
