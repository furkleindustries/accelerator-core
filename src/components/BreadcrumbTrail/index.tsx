import {
  Breadcrumb,
} from '../Breadcrumb';
import classNames from 'classnames';
import {
  warn,
} from 'colorful-logging';
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
import {
  TreeSelector,
} from './TreeSelector';

import * as React from 'react';

export class BreadcrumbTrail extends React.PureComponent<
  IBreadcrumbTrailOwnProps,
  IBreadcrumbTrailState
> {
  private readonly assembleVisibilityTree = (
    children: ReactNodeWithoutNullOrUndefined,
    index: number,
  ): IVisibilityTree => ({
    children: React.Children.map(children, (child) => {
      let treeChildren: readonly IVisibilityTree[] = [];
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

  private readonly treeSelector: TreeSelector = [ 0 ];

  public readonly render = () => {
    const {
      className,
      children,
      listComponent: ListComponent,
    } = this.props;

    const { trail } = this.state;

    return (
      <div className={classNames('breadcrumbTrailContainer', className)}>
        <nav className={classNames('breadcrumbNavigator')}>{
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
          treeSelector={this.treeSelector}
        >
          {children({
            getBreadcrumbProps: this.getBreadcrumbProps,
            treeSelector: this.treeSelector,
            visibilityTree: this.state.visibilityTree,
          })}
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
    treeSelector: readonly number[],
    updatedProps: Partial<IVisibilityTree>,
  ) => {
    const updatedVizTree = { ...this.state.visibilityTree };
    let last = updatedVizTree;
    let treeToSet = updatedVizTree;
    for (const item of treeSelector) {
      treeToSet.children = (treeToSet.children as IVisibilityTree[]).map(
        (child) => ({ ...child })
      );

      treeToSet = treeToSet.children[item];
      if (!treeToSet) {
        last.children = last.children.slice(0, item).concat([
          {
            children: [],
            open: false,
            visible: false,
          },
        ]).concat(last.children.slice(item + 1));

        treeToSet = last.children[item];
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
      children: (tree.children as IVisibilityTree[]).map((tree) => (
        this.trimVisibilityTree(tree, trimIndex, depthIndex + 1)
      )),

      open,
      visible,
    };
  };
}
