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
import {
  IVisibilityTree,
} from './IVisibilityTree';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';

import * as React from 'react';

export class BreadcrumbTrail extends React.PureComponent<
  IBreadcrumbTrailOwnProps,
  IBreadcrumbTrailState
> {
  private readonly assembleVisibilityTree = (children: ReactNodeWithoutNullOrUndefined): IVisibilityTree => ({
    children: React.Children.map(children, (child) => {
      return {
        children: React.isValidElement<any>(child) && child.props.children ?
          React.Children.map(child.props.children, this.assembleVisibilityTree) :
          [],
  
        visible: true,
      };
    }),

    visible: true,
  });

  public readonly state: IBreadcrumbTrailState = {
    trail: [
      { name: this.props.name || 'Start' },
    ],

    visibilityTree: this.assembleVisibilityTree(this.props.children),
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
          /** Don't show the current breadcrumb. */
          (trail.length > 1 ? trail.slice(0, 1) : []).map((crumb, key) => (
            <Breadcrumb
              crumb={crumb}
              key={key}
              onClick={this.clickBreadcrumb.bind(this, key)}
            />
          ))
        }</nav>

        <ListComponent
          getBreadcrumbProps={this.getBreadcrumbProps}
          root={true}
          treeSelector={[ 0 ]}
        >
          {children}
        </ListComponent>
      </div>
    );
  }; 

  private readonly addBreadcrumb = (crumb: IBreadcrumbItem) => this.setState({
    trail: this.state.trail.concat([ crumb ]),
  });

  private readonly clickBreadcrumb = (index: number) => {
    debugger;
    this.setState({
      trail: this.state.trail.slice(0, index + 1),
      visibilityTree: this.trimVisibilityTree(this.state.visibilityTree, index),
    });
  };

  private readonly getBreadcrumbProps = () => ({
    addBreadcrumb: this.addBreadcrumb,
    breadcrumbTrail: this.state.trail,
    removeBreadcrumb: this.removeBreadcrumb,
    visibilityTree: this.state.visibilityTree,
  });

  private readonly removeBreadcrumb = () => {
    this.setState({
      trail: this.state.trail.slice(0, this.state.trail.length - 1),
    });
  };

  private readonly trimVisibilityTree = (
    visibilityTree: IVisibilityTree,
    heightToRetain: number,
  ): IVisibilityTree => ({
    children: visibilityTree.children.map((child) => (
      this.trimVisibilityTree(child, heightToRetain - 1)
    )),

    visible: heightToRetain <= 0 || visibilityTree.visible,
  });
}
