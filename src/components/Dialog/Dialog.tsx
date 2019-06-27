import classnames from 'classnames';
import {
  IDialogOwnProps,
} from './IDialogOwnProps';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import * as React from 'react';

import styles from './Dialog.less';

export const Dialog: React.FunctionComponent<IDialogOwnProps> = (props) => {
  const {
    children,
    className: propClassName,
    dialogActions: propDialogActions,
    includeTitle,
  } = props;

  let title = null;
  const id = `accelerator-dialog-${String(Math.random()).slice(2)}`;
  if (includeTitle) {
    if (typeof includeTitle === 'string') {
      title = <MuiDialogTitle id={id}>{includeTitle}</MuiDialogTitle>;
    } else {
      title = <MuiDialogTitle
        id={id}
        key={0}
        {...includeTitle}
      />;
    }
  }

  let actions = null;
  if (propDialogActions) {
    actions = propDialogActions;
  }

  const copiedProps = { ...props };

  [
    'children',
    'dialogActions',
    'includeTitle',
  ].forEach((key) => delete copiedProps[key]);

  const className = classnames(
    'dialog',
    styles.dialog,
    propClassName,
  );

  return (
    <MuiDialog {...{
      ...copiedProps,
      className,
      'aria-labelledby': id,
    }}>
      {title}
      <MuiDialogContent>{children}</MuiDialogContent>
      {actions ? <MuiDialogActions>{actions}</MuiDialogActions> : null}
    </MuiDialog>
  );
};
