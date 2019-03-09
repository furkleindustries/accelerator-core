import {
  getStoryOptionsList,
} from '../../storyOptions/getStoryOptionsList';
import {
  IOptionsDispatchProps,
} from './IStoryOptionsDispatchProps'
import {
  IStoryOptionsOwnProps,
} from './IStoryOptionsOwnProps';
import {
  StoryOptionsList,
} from '../StoryOptionsList/StoryOptionsList';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  updateOptionValue,
} from './updateOptionValue';

import * as React from 'react';

export const StoryOptions: React.FunctionComponent<
  IStoryOptionsOwnProps & IOptionsDispatchProps
> = ({ dispatch }) => {
  const updateOptionValueBound = updateOptionValue.bind(null, dispatch);
  return (
    <StoryOptionsList>
      {getStoryOptionsList().map(({
        content: OptionComponentOrList,
        optionPropName,
      }) => {
        if (Array.isArray(OptionComponentOrList)) {
          return (
            <StoryOptionsList optionPropName={optionPropName}>
              {OptionComponentOrList.map((child) => React.cloneElement(
                child,
                { updateOptionValue: updateOptionValueBound },
              ))}
            </StoryOptionsList>
          );
        }

        return (
          <OptionComponentOrList
            optionPropName={optionPropName}
            updateOptionValue={updateOptionValueBound}
          />
        );
      })}
    </StoryOptionsList>
  );
};

export const mapDispatchToProps: MapDispatchToProps<
  IOptionsDispatchProps,
  {}
> = (dispatch) => ({ dispatch });

export const StoryOptionsConnected = connect(
  null,
  mapDispatchToProps,
)(StoryOptions);
