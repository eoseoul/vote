import React, {Component} from 'react';

import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FileSaver from 'file-saver';

import SnackbarView from './SnackbarView';
import ConfirmDialog from './ConfirmDialog';

import contentStyles from '../styles/content.module.css';
import styles from '../styles/voteCard.module.css';

class CreateDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameError : false,
      publicKeyError : false,
      privateKeyError : false,
      nameHelper : '',
      publicKeyHelper : '',
      privateKeyHelper : '',
      openConfirm : false,
      titleConfirm : 'Save Account Confirm Dialog',
      messageConfirm : 'Did you save the EOS key in a safe place?'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleSaveKey = this.handleSaveKey.bind(this);

    this.handleCreateConfirmOpen = this.handleCreateConfirmOpen.bind(this);
    this.handleCreateConfirmClose = this.handleCreateConfirmClose.bind(this);

    this.handleCheckName = this.handleCheckName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {account, isExist} = nextProps;
    if (!_.isEmpty(account.name)) {
      let result = /^[a-z1-5]*$/.test(account.name);
      this.setState({nameError : !result, nameHelper : '12345abcdefghijklmnopqrstuvwxyz'});
      if (result === true) {
        result = /^[a-z1-5]{12,12}$/.test(account.name);
        if (result === true) {
          this.setState({nameError : !result, nameHelper : ''});
        } else {
          this.setState({nameError : !result, nameHelper : `Must be 12 characters Current Length=${account.name.length}`});
        }
      }
    }

    if (!_.isEmpty(account.publicKey)) {
      this.setState({publicKeyError : false, publicKeyHelper : ''});
    }

    if (!_.isEmpty(account.privateKey)) {
      this.setState({privateKeyError : false, privateKeyHelper : ''});
    }

    if (isExist === true) {
      this.setState({nameError : true, nameHelper : 'Account already exists in EOS'});
    }
  }

  handleChange(e) {
    if (e.target.name === 'name') {
      let result = /^[a-z1-5]*$/.test(e.target.value);
      this.setState({nameError : !result, nameHelper : '12345abcdefghijklmnopqrstuvwxyz'});
      if (result === true) {
        result = /^[a-z1-5]{12,12}$/.test(e.target.value);
        if (result === true) {
          this.setState({nameError : !result, nameHelper : ''});
        } else {
          this.setState({nameError : !result, nameHelper : `Must be 12 characters Current Length=${e.target.value.length}`});
        }
      }
    } else if (e.target.name === 'publicKey') {
      this.setState({publicKeyError : false, publicKeyHelper : ''});
    } else if (e.target.name === 'privateKey') {
      this.setState({privateKeyError : false, privateKeyHelper : ''});
    }
    this.props.handleChange(e);
  }

  handleClose(e) {
    this.initState();
    this.props.handleClose(e);
  }

  handleNewAccount(e) {
    const {account} = this.props;
    const {nameError, publicKeyError, privateKeyError} = this.state;
    let error = false;
    if (_.isEmpty(account.name)) {
      this.setState({openConfirm : false, nameError : true, nameHelper : 'this field is required'});
      error = true;
    }
    if (_.isEmpty(account.publicKey)) {
      this.setState({openConfirm : false, publicKeyError : true, publicKeyHelper : 'this field is required'});
      error = true;
    }

    if (_.isEmpty(account.privateKey)) {
      this.setState({openConfirm : false, privateKeyError : true, privateKeyHelper : 'this field is required'});
      error = true;
    }
    if (nameError || publicKeyError || privateKeyError || error) {
      return;
    }
    this.props.handleNewAccount();
    this.initState();
  }

  initState() {
    this.setState({
      nameError : false,
      publicKeyError : false,
      privateKeyError : false,
      nameHelper : '',
      publicKeyHelper : '',
      privateKeyHelper : '',
      openConfirm : false
    });
  }

  handleSaveKey() {
    const {account} = this.props;
    const type = 'text/plain';
    const data = `name: ${account.name}\npublic_key : ${account.publicKey}\nprivate_key : ${account.privateKey}`;
    const blob = new Blob([data], {type : type});
    FileSaver.saveAs(blob, 'eoseoul_node_key.txt');
  }

  handleCreateConfirmOpen() {
    this.setState({openConfirm : true});
  }

  handleCreateConfirmClose() {
    this.setState({openConfirm : false});
  }

  handleCheckName() {
    const name = this.props.account.name;
    this.props.handleCheckName(name);
  }

  render() {
    const {open, handleGenerateKey, account} = this.props;
    const {nameError, publicKeyError, privateKeyError, nameHelper, publicKeyHelper, privateKeyHelper, openConfirm, titleConfirm, messageConfirm} = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create EOS Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you do not have an account on EOS, create an account.<br/>
              Do Not Forget to Save Public Key and Private Key
            </DialogContentText>
            <Grid container spacing={16}>
              <Grid item xs={10}>
                <TextField
                  margin="dense"
                  id="name"
                  label="name"
                  name="name"
                  value={account.name || ''}
                  onChange={this.handleChange}
                  placeholder="12345abcdefghijklmnopqrstuvwxyz (account names must be 12 chars long)"
                  fullWidth
                  error={nameError}
                  helperText={nameHelper}
                />
              </Grid>
              <Grid item xs={1}>
                <Button onClick={this.handleCheckName} className={styles.stake__max_button}>check</Button>
              </Grid>
            </Grid>
            <TextField
              margin="dense"
              id="public_key"
              label="publicKey"
              name="publicKey"
              value={account.publicKey}
              onChange={this.handleChange}
              fullWidth
              error={publicKeyError}
              helperText={publicKeyHelper}
            />
            <TextField
              margin="dense"
              id="private_key"
              label="privateKey"
              name="privateKey"
              value={account.privateKey}
              onChange={this.handleChange}
              fullWidth
              error={privateKeyError}
              helperText={privateKeyHelper}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGenerateKey} className={styles.vote__button2}> Create EOS Key </Button>
            <Button onClick={this.handleSaveKey} className={styles.vote__button}> Save EOS Key </Button>
            <Button onClick={this.handleClose} className={styles.vote__button2}> Cancel </Button>
            <Button onClick={this.handleCreateConfirmOpen} className={styles.vote__button}> Create </Button>
          </DialogActions>
        </Dialog>
        <ConfirmDialog open={openConfirm} title={titleConfirm} message={messageConfirm} handleClose={this.handleCreateConfirmClose} handleConfirm={this.handleNewAccount}/>
      </div>
    );
  }
}

const VoteSignupView = (props) => (
  <div className={contentStyles.content}>
    <Card className = {styles.summary}>
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <div className={styles.vote__head}>
              <div className={styles.vote__head_title}>
                <h2>Create <strong>EOS Account</strong></h2>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              { /*
              <Grid item xs={4} className={styles.vote__list}>
                <dl>
                  <dt>
                    <em>1. </em><p>Create EOS  <strong>Account </strong>(for voting)</p>
                  </dt>
                  <dd><Button variant="outlined" className={styles.button_raised} onClick={props.handleClickOpenCreate}> Create </Button></dd>
                </dl>
              </Grid>
                */
              }
              <Grid item xs={6} className={styles.vote__list}>
                <dl>
                  <dt>
                    <em>1. </em><p>Create Scatter <strong>Wallet</strong></p>
                  </dt>
                  <dd><Button variant="outlined" className={styles.button_raised} href="https://scatter-eos.com/" target="_blank" rel="noopener noreferrer"> open Scatter Website </Button></dd>
                </dl>
              </Grid>
              <Grid item xs={6} className={styles.vote__list}>
                <dl>
                  <dt>
                    <em>2. </em><p>Add <strong>Network</strong></p>
                  </dt>
                  <dd><Button variant="outlined" className={styles.button_raised} onClick={props.handleSuggestNetwork}> add network to scatter </Button></dd>
                </dl>
              </Grid>
              <Grid item xs={6} className={styles.vote__list}>
                <dl>
                  <dt>
                    <em>3. </em><p> Add <strong>Key Pair</strong></p>
                    <em>& </em><p> Add <strong>Identity</strong></p>
                  </dt>
                </dl>
              </Grid>
              <Grid item xs={6} className={styles.vote__list}>
                <dl>
                  <dt>
                    <em>4. </em><p>Login EOS by <strong>Scatter</strong></p>
                  </dt>
                  <dd><Button variant="outlined" className={styles.button_raised} onClick={props.handleLoginScatter}> Login </Button></dd>
                </dl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <div className={styles.vote__head}>
                  <div className={styles.vote__head_title}>
                    <h2>EOS <strong>Network Info</strong> for scatter</h2>
                    {/* <dd><Button variant="outlined" className={styles.button_raised} onClick={props.handleSuggestNetwork}> add network to scatter </Button></dd> */ }
                  </div>
                </div>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={11} className={styles.vote__list2}>
                <dl>
                  <dt><em>1.</em> <p>Domain or IP</p> </dt>
                  <dd>{props.eosHost}</dd>
                  <dt><em>2.</em> <p>Port</p> </dt>
                  <dd>{props.eosHttpPort} </dd>
                  <dt><em>3.</em> <p>Chain ID</p> </dt>
                  <dd>{props.chainId}</dd>
                </dl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CreateDialog
          open={props.openCreate}
          handleNewAccount={props.handleNewAccount}
          handleGenerateKey={props.handleGenerateKey}
          handleClose={props.handleClickCloseCreate}
          handleChange={props.handleChange}
          handleLoginScatter={props.handleLoginScatter}
          account={props.account}
          handleCheckName={props.handleCheckName}
          isExist={props.isExist}
        />
      </CardContent>
      <SnackbarView anchorOrigin={props.anchorOrigin} openSnack={props.openSnack} handleSnack={props.handleSnack} snackMessage={props.snackMessage} />
    </Card>
  </div>
);

export default VoteSignupView;
