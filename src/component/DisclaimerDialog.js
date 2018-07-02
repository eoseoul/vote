import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {Link} from 'react-router-dom';
import styles from '../styles/disclaimer.module.css';

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open : props.open,
      popupDisable : true
    };
    this.onChange = this.onChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {open} = nextProps;
    this.setState({open});
  }

  onChange(e) {
    this.setState({popupDisable : e.target.checked});
  }

  handleConfirm() {
    this.setState({open : false});
    this.props.handleConfirm(this.state.popupDisable);
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={styles.dialog_title}>Agreement</DialogTitle>
          <DialogContent className={styles.dialog_content}>
            Scatter is supported on both Google Chrome and Firefox, but EOSeoul recommends only to use Google Chrome for the voting. <br/>
            {<a className={styles.dialog_anchor} href='http://eosportal.io/help#setting-up-scatter' target="_blank" rel="noopener noreferrer"> How to set up and use Scatter </a>} <br/>
            <br/>
            <h3> How to validate in Chrome </h3>
            <br/>
            <ul>
              <li style={{listStyle : 'circle'}}> Navigate to <strong> chrome://extensions/ </strong> in your browser. </li>
              <li style={{listStyle : 'circle'}}> Copy and paste that URL into the URL bar.</li>
              <li style={{listStyle : 'circle'}}> On the top right side of the Extensions Page, you should be able to see a button for "Developer Mode". Switch it on. </li>
              <li style={{listStyle : 'circle'}}> Find the Scatter extension among your installed extensions </li>
              <li style={{listStyle : 'circle'}}> There will be an ID property there. Make sure that it is exactly equal to: <strong>ammjpmhgckkpcamddpolhchgomcojkle </strong></li>
            </ul>
            <br/>
            EOSeoul takes no responsibilities for the execution and the results of the execution of this code. EOSeoul Voting Portal is provided as is, under MIT Licence. <br/>
            <Divider />
            <Divider />
            <Typography variant="caption" gutterBottom>
              By voting you are accepting the {<Link to="/governance"> EOS Governance. </Link>} Make sure you have read it. <br/>
            </Typography>
          </DialogContent>
          <DialogActions>
            <FormControlLabel control={<Checkbox checked={this.state.popupDisable} value="" onChange={this.onChange} color="default" />} label="disable pop-up for 24 hours" />
            <Button onClick={this.handleConfirm} color="primary" autoFocus> I agree and continue </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
