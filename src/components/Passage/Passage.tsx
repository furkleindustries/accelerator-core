
import {
  PassageContentsContainerConnected,
} from '../PassageContentsContainer/PassageContentsContainer';
import {
  PassageHeadersConnected,
} from '../PassageHeaders/PassageHeaders';
import {
  PassageFootersConnected,
} from '../PassageFooters/PassageFooters';

import * as React from 'react';

        <>
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