import {
  Breadcrumb,
} from '../Breadcrumb/Breadcrumb';
import classnames from 'classnames';
import {
  IBreadcrumbItem,
} from './IBreadcrumbItem';
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
import { warn } from 'colorful-logging';

export class BreadcrumbTrail extends React.PureComponent<
  IBreadcrumbTrailOwnProps,
  IBreadcrumbTrailState
> {
  private readonly assembleVisibilityTree = (
    children: ReactNodeWithoutNullOrUndefined,
    index: number,
  ): IVisibilityTree => ({
    children: React.Children.map(children, (child) => {
      let treeChildren: ReadonlyArray<IVisibilityTree> = [];
      if (React.isValidElement(child)) {
        if (Array.isArray((child as any).props.children)) {
          treeChildren = React.Children.map(
            (child as any).props.children,
            (child) => this.assembleVisibilityTree(child, index + 1),
          );
        } else if (typeof (child as any).props.collectVisibilityTree === 'function') {
          treeChildren = (child as any).props.collectVisibilityTree();
        }
      }

      const tree: IVisibilityTree = {
        children: Object.freeze(treeChildren),
        open: false,
        visible: index + 1 <= 1,
      };

      return Object.freeze(tree);
    }),

    open: true,
    visible: index <= 1,
  });

  public readonly state: IBreadcrumbTrailState = {
    trail: [
      { name: this.props.name || 'Start' },
    ],

    visibilityTree: this.assembleVisibilityTree(this.props.children, 0),
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

  private readonly addBreadcrumb = (crumb: IBreadcrumbItem) => {
    this.setState({ trail: this.state.trail.concat([ crumb ]) });
    if (crumb.treeSelector) {
      this.setVisibilityTreePropsAt(
        crumb.treeSelector.slice(0, crumb.treeSelector.length - 1),
        { open: true },
      );
    }
  };

  private readonly clickBreadcrumb = (index: number) => this.setState({
    trail: this.state.trail.slice(0, index + 1),
    visibilityTree: this.trimVisibilityTree(
      this.state.visibilityTree,
      index,
    ),
  });

  private readonly getBreadcrumbProps = () => ({
    addBreadcrumb: this.addBreadcrumb,
    breadcrumbTrail: this.state.trail,
    removeBreadcrumb: this.removeBreadcrumb,
    visibilityTree: this.state.visibilityTree,
  });

  private readonly removeBreadcrumb = () => this.setState({
    trail: this.state.trail.slice(0, this.state.trail.length - 1),
    visibilityTree: this.trimVisibilityTree(
      this.state.visibilityTree,
      Math.max(0, this.state.trail.length - 2),
    ),
  });

  private readonly setVisibilityTreePropsAt = (
    treeSelector: ReadonlyArray<number>,
    updatedProps: Partial<IVisibilityTree>,
  ) => {
    const updatedVizTree = { ...this.state.visibilityTree };
    let last = updatedVizTree;
    let treeToSet = updatedVizTree;
    for (let ii = 0; ii < treeSelector.length; ii += 1) {
      treeToSet.children = treeToSet.children.map((child) => ({ ...child }));

      treeToSet = treeToSet.children[treeSelector[ii]];
      if (!treeToSet) {
        last.children = last.children.slice(0, treeSelector[ii]).concat([
          {
            children: [],
            open: false,
            visible: false,
          },
        ]).concat(last.children.slice(treeSelector[ii] + 1));

        treeToSet = last.children[treeSelector[ii]];
        if (!treeToSet) {
          warn('Tree selector could not be resolved to mutate menu breadcrumb trail.');
          return;
        }
      }

      last = treeToSet;
    }

    Object.keys(updatedProps).forEach((key) => (
      treeToSet[key] = updatedProps[key]
    ));

    this.setState({ visibilityTree: updatedVizTree });
  };

  private readonly trimVisibilityTree = (
    tree: IVisibilityTree,
    trimIndex: number,
    depthIndex = 0,
  ): IVisibilityTree => {
    let open;
    let visible;
    if (trimIndex === 0) {
      open = depthIndex === 0;
      visible = depthIndex <= 1;
    } else {
      if (depthIndex < trimIndex) {
        open = tree.open;
      } else {
        open = false;
      }

      visible = depthIndex < trimIndex && tree.visible;
    }

    return {
      children: tree.children.map((tree) => (
        this.trimVisibilityTree(tree, trimIndex, depthIndex + 1)
      )),

      open,
      visible,
    };
  };
}
