import {
  DebugObjectName,
} from '../DebugObjectName';
import {
  DebugObjectValue,
} from '../DebugObjectValue';
import {
  IDebugObjectPreviewOwnProps,
} from './IDebugObjectPreviewOwnProps';
import {
  intersperse,
} from './intersperse';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

export const DebugObjectPreview: React.FC<IDebugObjectPreviewOwnProps> = ({
  data,
  depth,
  handleValueChange,
  path,
}) => {
  if (typeof data !== 'object' || data === null) {
    return (
      <DebugObjectValue
        data={data}
        handleValueChange={handleValueChange}
        path={path}
      />
    );
  }

  if (Array.isArray(data)) {
    const maxProperties = 10;
    const previewArray = data
      .slice(0, maxProperties)
      .map((element, index) => (
        <DebugObjectValue
          data={element}
          handleValueChange={handleValueChange}
          key={index}
          path={`${path}.${index}`}
        />
      ));

    if (data.length > maxProperties) {
      previewArray.push(
        <Typography
          component="span"
          key="ellipsis"
          variant="body2"
        >
          ...
        </Typography>,
      );
    }

    return (
      <>
        <Typography
          component="span"
          variant="body2"
        >
          {data.length ?
            `(${data.length})\xa0` :
            ''}
        </Typography>

        <Typography
          component="span"
          variant="body2"
        >
          [{intersperse(previewArray, ', ')}]
        </Typography>
      </>
    );
  } else {
    const maxProperties = 5;
    const propertyNodes = [];
    for (const propertyName in data) {
      if (Object.hasOwnProperty.call(data, propertyName)) {
        let ellipsis: any;
        if (propertyNodes.length === maxProperties - 1 &&
          Object.keys(data).length > maxProperties)
        {
          ellipsis = (
            <Typography
              component="span"
              key="ellipsis"
              variant="body2"
            >
              ...
            </Typography>
          );
        }

        const propertyValue = data[propertyName];
        propertyNodes.push(
          <Typography
            component="span"
            key={propertyName}
            variant="body2"
          >
            <DebugObjectName
              depth={depth + 1}
              nodeName={propertyName || '""'}
            />

            :&nbsp;

            <DebugObjectValue
              data={propertyValue}
              handleValueChange={handleValueChange}
              path={`${path}.${propertyName}`}
            />

            {ellipsis}
          </Typography>
        );

        if (ellipsis) {
          break;
        }
      }
    }

    const objectConstructorName = data.constructor ?
      data.constructor.name :
      'Object';

    return (
      <>
        <Typography
          component="span"
          variant="body2"
        >
          {objectConstructorName === 'Object' ?
            '' :
            `${objectConstructorName} `}
        </Typography>

        <Typography
          component="span"
          variant="body2"
        >
          {`{`}{intersperse(propertyNodes, ', ')}{`}`}
        </Typography>
      </>
    );
  }
};
