import {
  getOptionsList,
} from '../../options/getOptionsList';
import {
  IOptionsOwnProps,
} from './IOptionsOwnProps';
import {
  OptionsList,
} from '../OptionsList/OptionsList';

import * as React from 'react';

export const Options: React.FunctionComponent<IOptionsOwnProps> = () => (
  <OptionsList>
    {getOptionsList()}
  </OptionsList>
);
