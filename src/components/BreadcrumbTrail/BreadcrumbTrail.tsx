import {
  Breadcrumb,
} from '../Breadcrumb/Breadcrumb';
import classnames from 'classnames';
import {
  IBreadcrumbTrailOwnProps,
} from './IBreadcrumbTrailOwnProps';

import * as React from 'react';

export class BreadcrumbTrail extends React.PureComponent<
  IBreadcrumbTrailOwnProps,
  IBreadcrumbTrailState
> {
  public readonly state = {
    trail: [
      {
        name: this.props.title || this.props.name,
        visible: true, 
      },
    ],
  };

  public readonly render = () => {
    const {
      className,
      children,
      listComponent: ListComponent,
    } = this.props;

    const { trail } = this.state;

    return (
      <div className={classnames('breadcrumbTrailContainer', className)}>
        <nav className={classnames('breadcrumbNavigator')}>{
          /** Don't show the trail unless there's more than one. */
          trail.length > 1 ?
            trail.map((crumb, key) => (
              <Breadcrumb
                crumb={crumb}
                key={key}
                onClick={this.clickBreadcrumb.bind(this, key)}
              />
            )) :
            null
        }</nav>

        <ListComponent
          breadcrumbTrail={trail}
          open={true}
        >
          {children}
        </ListComponent>
      </div>
    );
  };

  public readonly clickBreadcrumb = (index: number) => this.setState({
    trail: this.state.trail.slice(0, index + 1),
  });
}
