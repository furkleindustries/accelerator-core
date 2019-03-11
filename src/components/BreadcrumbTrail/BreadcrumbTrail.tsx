import {
  Breadcrumb,
} from '../Breadcrumb/Breadcrumb';
import classnames from 'classnames';
import {
  IBreadcrumbItem,
} from '../Breadcrumb/IBreadcrumbItem';
import {
  IBreadcrumbTrailOwnProps,
} from './IBreadcrumbTrailOwnProps';
import {
  IBreadcrumbTrailState,
} from './IBreadcrumbTrailState';

import * as React from 'react';

export class BreadcrumbTrail extends React.PureComponent<
  IBreadcrumbTrailOwnProps,
  IBreadcrumbTrailState
> {
  public readonly state: IBreadcrumbTrailState = {
    trail: [
      { name: this.props.name || 'Start' },
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
          addBreadcrumb={this.addBreadcrumb}
          breadcrumbTrail={trail}
          removeBreadcrumb={this.removeBreadcrumb}
        >
          {children}
        </ListComponent>
      </div>
    );
  }; 

  private readonly addBreadcrumb = (crumb: IBreadcrumbItem) => this.setState({
    trail: this.state.trail.concat([ crumb ]),
  }); 

  private readonly clickBreadcrumb = (index: number) => this.setState({
    trail: this.state.trail.slice(0, index + 1),
  });

  private readonly removeBreadcrumb = () => this.setState({
    trail: this.state.trail.slice(0, this.state.trail.length - 1),
  });
}
