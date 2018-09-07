import React, { SFC } from 'react';

import { Modal } from '@material-ui/core';
import classNames from 'classnames';

import { createStyled } from '../createStyled';

const Styled = createStyled(theme => ({
  modalRoot: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '100%',
    alignSelf: 'center',
    margin: theme.spacing.unit * 2,
  },
}));

export const FloatingModal: SFC<any> = ({ children, classes, ...other }) => (
  <Styled>
    {styledProps => (
      <Modal
        classes={{
          root: classNames(styledProps.classes.modalRoot, classes.root),
        }}
        {...other}
      >
        <div className={classNames(styledProps.classes.modalPaper, classes.paper)}>
          {children}
        </div>
      </Modal>
    )}
  </Styled>
);
