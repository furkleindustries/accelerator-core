import {
  NOf
} from '../NOf/NOf';

import * as React from 'react';

export class OneOf extends React.PureComponent {  
  public render() {
    const {
      children,
    } = this.props;
    
    return (
      <NOf n={1}>
        {[ children, ]}
      </NOf>
    );
  }
}

export default OneOf;
