import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open : false
    };

    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {open} = nextProps;
    this.setState({open});
  }

  handleConfirm() {
    this.setState({open : false});
    this.props.handleConfirm();
  }

  render() {
    // const {title}  = this.props;
    const {open} = this.state;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Agreement</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Scatter is supported on both Google Chrome and Firefox, but EOSeoul recommends only to use Google Chrome for the voting. <br/>
              {<a href='http://eosportal.io/help#setting-up-scatter' target="_blank" rel="noopener noreferrer"> How to set up and use Scatter </a>} <br/>
              <br/>
              <Typography variant="title" gutterBottom> How to validate in Chrome </Typography>
              <br/>
              <ul>
                <li style={{listStyle : 'circle', padding : '0 5px'}}> Navigate to <strong> chrome://extensions/ </strong> in your browser. </li>
                <li style={{listStyle : 'circle', padding : '0 5px'}}> Copy and paste that URL into the URL bar.</li>
                <li style={{listStyle : 'circle', padding : '0 5px'}}> On the top right side of the Extensions Page, you should be able to see a button for "Developer Mode". Switch it on. </li>
                <li style={{listStyle : 'circle', padding : '0 5px'}}> Find the Scatter extension among your installed extensions </li>
                <li style={{listStyle : 'circle', padding : '0 5px'}}> There will be an ID property there. Make sure that it is exactly equal to: <strong>ammjpmhgckkpcamddpolhchgomcojkle </strong></li>
              </ul>
              <br/>
              EOSeoul takes no responsibilities for the execution and the results of the execution of this code. EOSeoul Voting Portal is provided as is, under MIT Licence. <br/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirm} color="primary" autoFocus> I agree and continue </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
