import {
  Backdrop,
} from '../Backdrop';
import classNames from 'classnames';
import {
  Fade,
} from '../Fade';
import {
  IDialogOwnProps,
} from './IDialogOwnProps';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {
  v4,
} from 'uuid';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Dialog: React.FC<IDialogOwnProps> = (props) => {
  const {
    BackdropComponent = Backdrop,
    children,
    className,
    dialogActions: propDialogActions,
    includeTitle,
    PaperProps = {},
    TransitionComponent = Fade,
    ...rest
  } = props;

  const id = `accelerator-dialog-${v4()}`;
  let title = null;

  if (includeTitle) {
    if (typeof includeTitle === 'string') {
      title = (
        <MuiDialogTitle
          id={id}
          role="group"
        >
          {includeTitle}
        </MuiDialogTitle>
      );
    } else {
      title = (
        <MuiDialogTitle
          id={id}
          key={0}

          {...includeTitle}
        />
      );
    }
  }

  let actions = null;
  if (propDialogActions) {
    actions = propDialogActions;
  }

  return (
    <MuiDialog
      {...rest}

      className={classNames(
        builtIns['dialog'],
        'dialog',
        className,
      )}

      aria-labelledby={id}
      BackdropComponent={BackdropComponent}
      PaperProps={{
        tabIndex: -1,
        ...PaperProps,
      }}

      TransitionComponent={TransitionComponent}
    >
      {title}

      <MuiDialogContent
        className={classNames(
          builtIns['dialog-content'],
          'dialog-content',
        )}

        role="group"
      >
        {children}
      </MuiDialogContent>

      {actions ?
        <MuiDialogActions
          className={classNames(
            builtIns['dialog-actions'],
            'dialog-actions',
          )}

          role="group"
        >
          {actions}
        </MuiDialogActions> :
        null}
    </MuiDialog>
  );
};
