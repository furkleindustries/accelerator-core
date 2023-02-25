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

export const Variable: React.FC<IVariableProps> = ({
  name,
  doError,
}) => (
  <AppContextConsumerWrapper>
    {({
      store: { getState },
    }) => {
      const {
        history: {
          present: { storyState },
        },
      } = getState();

      if (!(name in storyState)) {
        if (!doError) {
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
