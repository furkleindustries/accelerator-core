import {
  InkMutatorObject,
} from '../src/mutators/InkMutatorObject';
import {
  default as ReactJsxParser,
// @ts-ignore
} from 'react-jsx-parser';

import * as React from 'react';

const mutatorObject: InkMutatorObject = {
  name: 'ink-jsx-mutator',
  precedence: 0,
  content: ({ currentNode }) => {
    // No clue why this works, or if it's even fixing anything, but it works.
    const { getTagNameToComponentMap } = require(
      '../src/functions/getTagNameToComponentMap',
    );

    const wrapper: React.ReactElement | null = React.isValidElement(currentNode) ?
      currentNode :
      null;

    const tagNameToComponentMap: {
      readonly [key: string]: React.ComponentType;
    } = getTagNameToComponentMap();

    const components = {
      ...tagNameToComponentMap,
      ...Object.values(tagNameToComponentMap).reduce((obj, component) => {
        obj[component.name] = component;
        return obj;
      }, {}),
    };

    const children = wrapper ?
      React.Children.toArray(wrapper.props.children)
        .concat([ currentNode ])
        .join('\n') :
      String(currentNode);

    const parser = (
      <ReactJsxParser
        components={components}
        jsx={children}
      />
    );

    return (
      wrapper ?
        React.cloneElement(
          wrapper,
          wrapper.props,
          parser,
        ) :
        parser
    );
  },
};

export default mutatorObject;
