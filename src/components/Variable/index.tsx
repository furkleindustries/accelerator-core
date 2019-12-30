import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  IVariableProps,
} from './IVariableProps';

import * as React from 'react';
import { Print } from '../Print';

export const Variable: React.FunctionComponent<IVariableProps> = ({
  name,
  doError,
}) => (
  <AppContextConsumerWrapper>
    {({ store }) => {
      const {
        history: {
          present: { storyState },
        },
      } = store.getState();

      if (!(name in storyState)) {
        if (!doError) {
          return null;
        }

        throw new Error(
          `The key ${name} did not exist in the present story state.`
        );
      }

      return <Print>{storyState[name]}</Print>;
    }}
  </AppContextConsumerWrapper>
);
