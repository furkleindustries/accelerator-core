import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  IVariableProps,
} from './IVariableProps';
import {
  Print,
} from '../Print';

import * as React from 'react';

export const Variable: React.FunctionComponent<IVariableProps> = ({
  name,
  noError,
}) => (
  <AppContextConsumerWrapper>
    {({ store }) => {
      const storyState = store.getState().history.present.storyState;
      if (!(name in storyState)) {
        if (noError) {
          return null;
        }

        throw new Error(
          `The key ${name} did not exist in the present story state.`
        );
      }

      return (
        <Print>{storyState[name]}</Print>
      );
    }}
  </AppContextConsumerWrapper>
);
