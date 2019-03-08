import {
  getOptionsList,
} from '../../options/getOptionsList';
import {
  IOptionsDispatchProps,
} from './IOptionsDispatchProps'
import {
  IOptionsOwnProps,
} from './IOptionsOwnProps';
import {
  OptionsList,
} from '../OptionsList/OptionsList';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  updateOptionValue,
} from './updateOptionValue';

import * as React from 'react';

export const Options: React.FunctionComponent<
  IOptionsOwnProps & IOptionsDispatchProps
> = ({ dispatch }) => {
  const updateOptionValueBound = updateOptionValue.bind(null, dispatch);
  return (
    <OptionsList>
      {getOptionsList().map(({
        content: OptionComponentOrList,
        propName,
      }) => {
        if (Array.isArray(OptionComponentOrList)) {
          return (
            <OptionsList propName={propName}>
              {OptionComponentOrList.map((child) => React.cloneElement(
                child,
                { updateOptionValue: updateOptionValueBound },
              ))}
            </OptionsList>
          );
        }

        return (
          <OptionComponentOrList
            propName={propName}
            updateOptionValue={updateOptionValueBound}
          />
        );
      })}
    </OptionsList>
  );
};

export const mapDispatchToProps: MapDispatchToProps<
  IOptionsDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const StoryOptionsConnected = connect(
  null,
  mapDispatchToProps,
)(Options);
