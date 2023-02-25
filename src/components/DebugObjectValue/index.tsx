import {
  IDebugObjectValueOwnProps,
} from './IDebugObjectValueOwnProps';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

export const DebugObjectValue: React.FC<IDebugObjectValueOwnProps> = ({
  data,
  handleValueChange,
}) => {
  if (typeof data === 'number') {
    return (
      <Typography
        component="code"
        variant="body2"
      >
        {data}
      </Typography>
    );
  } else if (typeof data === 'string') {
    return (
      <Typography
        component="code"
        variant="body2"
      >
        "{data}"
      </Typography>
    );
  } else if (typeof data === 'boolean') {
    return (
      <Typography
        component="code"
        variant="body2"
      >
        {data ? 'true' : 'false'}
      </Typography>
    );
  } else if (typeof data === 'object') {
    if (data === null) {
      return (
        <Typography
          component="code"
          variant="body2"
        >
          null
        </Typography>
      );
    } else if (Array.isArray(data)) {
      return (
        <Typography
          component="code"
          variant="body2"
        >
          Array({data.length})
        </Typography>
      );
    } else if (!data.constructor) {
      return (
        <Typography
          component="code"
          variant="body2"
        >
          Object
        </Typography>
      );
    }

    return (
      <Typography
        component="code"
        variant="body2"
      >
        {data.constructor.name}
      </Typography>
    );
  }

  return null;
};
