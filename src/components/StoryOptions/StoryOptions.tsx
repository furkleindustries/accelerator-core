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
      }, key) => (
        Array.isArray(OptionComponentOrList)) ?
          <StoryOptionsList
            key={key}
            optionPropName={optionPropName}
          >
            {OptionComponentOrList.map((child, key) => React.cloneElement(
              child,
              {
                key: (child.props as any).key || key,
                updateOptionValue: updateOptionValueBound,
              },
            ))}
          </StoryOptionsList> :
          <OptionComponentOrList
            key={key}
            optionPropName={optionPropName}
            updateOptionValue={updateOptionValueBound}
          />
      )}
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
