import {
  Breadcrumb,
} from '../Breadcrumb';
import classNames from 'classnames';
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
  precedenceSortOptions,
} from './precedenceSortOptions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';
import styles from '../../../plugins/menu/index.less';

export class BreadcrumbTrail extends React.PureComponent<
  IBreadcrumbTrailOwnProps,
  IBreadcrumbTrailState
> {
  public readonly state: IBreadcrumbTrailState = {
    trail: [
      {
        name: this.props.name || 'Start',
        path: '$',
      },
    ],
  };

  public readonly render = () => (
    <div
      className={classNames(
        builtIns['breadcrumb-trail-container'],
        styles['breadcrumb-trail-container'],
        'breadcrumb-trail-container',
        this.props.className,
      )}

      role="article"
    >
      <nav
        className={classNames(
          builtIns['breadcrumb-navigator'],
          styles['breadcrumb-navigator'],
          'breadcrumb-navigator',
        )}
      >
        {this.getBreadcrumbTrailComponents()}
      </nav>

      <this.props.ListComponent
        childOptions={precedenceSortOptions(this.props.options)}
        clickOption={this.clickOption}
        crumb={{
          name: 'Root',
          path: '$',
          title: 'Root',
        }}

        root={true}
      />
    </div>
  );

  public readonly getBreadcrumbTrailComponents = () => (
    /* Don't show the current breadcrumb, but do pass the index. */
    this.state.trail.slice(0, -1).map(
      (crumb: IBreadcrumbItem, key: number) => (
        <Breadcrumb
          crumb={crumb}
          index={key}
          key={key}
          onClick={this.clickBreadcrumb}
        />
      ),
    )
  );

  private readonly clickBreadcrumb = () => {
    this.removeBreadcrumb();
    this.closeTree();
  };

  private readonly clickOption = (breadcrumb: IBreadcrumbItem) => {
    this.openTree();
    this.addBreadcrumb(breadcrumb);
  };

  private readonly addBreadcrumb = (breadcrumb: IBreadcrumbItem) => {
    this.setState({ trail: this.state.trail.concat([ { ...breadcrumb } ]) });
  };

  private readonly removeBreadcrumb = () => {
    this.setState({
      trail: this.state.trail.slice(0, -1),
    });
  };

  private readonly openTree = () => {
    const { trail } = this.state;

    this.setState({ trail });
  };

  private readonly closeTree = () => {
    const { trail } = this.state;

    this.setState({ trail });
  };
}
