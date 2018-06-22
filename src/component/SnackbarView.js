import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  close : {
    width : theme.spacing.unit * 4,
    height : theme.spacing.unit * 4
  }
});

class SnackbarView extends React.Component {
  constructor(props) {
    super(props);

    const {openSnack, snackMessage} = props;
    this.state = {
      openSnack : openSnack,
      snackMessage : snackMessage
    };
  }

  componentWillReceiveProps(nextProps) {
    const {openSnack, snackMessage} = nextProps;
    this.setState({openSnack : openSnack, snackMessage});
  }

  handleClick = () => {
    // this.setState({openSnack : true});
    this.props.handleSnack(false);
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.handleSnack(false);
    // this.setState({openSnack : false});
  };

  render() {
    const {classes, anchorOrigin} = this.props;
    const {openSnack, snackMessage} = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={openSnack}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{'aria-describedby' : 'message-id'}}
          message={<span id="message-id">{snackMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SnackbarView.propTypes = {
  classes : PropTypes.object.isRequired,
  anchorOrigin : PropTypes.object.isRequired,
  snackMessage : PropTypes.string.isRequired,
  handleSnack : PropTypes.func.isRequired
};

export default withStyles(styles)(SnackbarView);
