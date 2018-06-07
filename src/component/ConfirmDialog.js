import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import _ from 'lodash';

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open : false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {open, message, title} = nextProps;
    this.setState({open, message, title});
  }

  handleClose() {
    this.setState({open : false});
    if (!_.isEmpty(this.props.handleClose)) {
      this.props.handleClose();
    }
  }

  handleConfirm() {
    this.setState({open : false});
    this.props.handleConfirm();
  }

  render() {
    const {title, message} = this.props;
    const {open} = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary"> Close </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus> Confirm </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
