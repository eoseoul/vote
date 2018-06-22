import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import {PrivateKey} from 'eosjs-ecc';

import {withAlert} from 'react-alert';

import VoteSignupView from './VoteSignupView';

import {getAccountApi} from '../utils/eos';

import {loginScatter, logoutScatter, getInfo, newAccount, resetEOSError, resetEOSState} from '../redux/actions/eos';

const loginScatterTrigger = loginScatter.sagaTrigger;
const logoutScatterTrigger = logoutScatter.sagaTrigger;
const getInfoTrigger = getInfo.sagaTrigger;
const newAccountTrigger = newAccount.sagaTrigger;

const eosHost = window.STATS_CONFIG.eosHost;
const eosHttpPort = window.STATS_CONFIG.eosHttpPort;
const eosProtocol = window.STATS_CONFIG.eosProtocol;
const chainId = window.STATS_CONFIG.chainId;

class VoteSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreate : false,
      account : {name : '', publicKey : '', privateKey : ''},
      anchorOrigin : {vertical : 'top', horizontal : 'right'},
      openSnack : false,
      snackMessage : '',
      chainInfo : {},
      isExist : false
    };
    this.handleClickOpenCreate = this.handleClickOpenCreate.bind(this);
    this.handleClickCloseCreate = this.handleClickCloseCreate.bind(this);

    this.handleLoginScatter = this.handleLoginScatter.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleGenerateKey = this.handleGenerateKey.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckName = this.handleCheckName.bind(this);

    this.handleSuggestNetwork = this.handleSuggestNetwork.bind(this);
    this.handleSnack = this.handleSnack.bind(this);

    this.bAlert = false;
  }

  componentDidMount() {
    this.props.logoutScatterTrigger({});
    // this.props.getInfoTrigger({});
  }

  componentWillReceiveProps(nextProps) {
    const {history, identity, alert, error, newAccountTr} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      const message = error.eosMessage || error.error_msg;
      this.props.resetEOSError();
      alert.show(message);
      return;
    }

    if (!_.isEmpty(newAccountTr) && !_.isEmpty(this.state.account.name)) {
      this.setState({
        snackMessage : `${this.state.account.name} is created`, openSnack : true,
        account : {name : '', publicKey : '', privateKey : ''}
      });
    }
    if (!_.isEmpty(identity) && !_.isEmpty(identity.accounts)) {
      history.push('/vote');
    }
  }

  handleClickOpenCreate() {
    this.setState({
      openCreate : true,
      account : {name : '', publicKey : '', privateKey : ''},
      openSnack : false
    });
  }

  handleClickCloseCreate() {
    this.setState({
      openCreate : false,
      account : {name : '', publicKey : '', privateKey : ''},
      openSnack : false
    });
  }

  handleNewAccount() {
    const {account} = this.state;
    if (_.isEmpty(account.name) || _.isEmpty(account.publicKey) || _.isEmpty(account.privateKey)) {
      return;
    }
    const req = {
      params : {name : account.name, publicKey : account.publicKey}
    };
    this.bAlert = true;
    this.setState({
      openCreate : false,
      account : {name : account.name, publicKey : '', privateKey : ''}
    });

    this.props.newAccountTrigger(req);
  }

  handleLoginScatter() {
    if (_.isEmpty(window.scatter)) {
      this.props.alert.show('You don\'t seem to have Scatter!');
      return;
    }

    const req = {
      params : {
        requiredFields : {
          accounts : [{blockchain : 'eos', host : eosHost, port : eosHttpPort, chainId : chainId}]
        }
      }
    };
    this.props.loginScatterTrigger(req);
  }

  handleGenerateKey() {
    const {account} = this.state;
    let privateWif;
    PrivateKey.randomKey()
      .then((privateKey) => {
        privateWif = privateKey.toWif();
        // Convert to a public key
        const pubKey = PrivateKey.fromWif(privateWif).toPublic().toString();
        account.publicKey = pubKey;
        account.privateKey = privateWif;
        this.setState({account});
      });
  }

  handleChange(e) {
    const {account} = this.state;
    account[e.target.name] = e.target.value;
    this.setState({account});
  }

  handleCheckName(name) {
    const self = this;
    getAccountApi(name)
      .then((account) => {
        if (!_.isEmpty(account)) {
          self.setState({isExist : true});
        } else {
          self.setState({isExist : false});
        }
      })
      .catch((err) => {
        self.setState({isExist : false});
      });
  }

  handleSuggestNetwork() {
    const network = {
      blockchain : 'eos',
      host : eosHost,
      port : eosHttpPort,
      chainId : chainId
    };
    window.scatter.suggestNetwork(network).then((result) => {
      this.props.alert.show('Network successfully registered.');
    });
  }

  handleSnack(openSnack) {
    this.setState({openSnack : openSnack});
  }

  render() {
    const {account, openCreate, openSnack, snackMessage, anchorOrigin, isExist} = this.state;
    return (
      <VoteSignupView
        openCreate={openCreate}
        handleClickOpenCreate={this.handleClickOpenCreate}
        handleClickCloseCreate={this.handleClickCloseCreate}
        handleNewAccount={this.handleNewAccount}
        handleGenerateKey={this.handleGenerateKey}
        handleChange={this.handleChange}
        handleLoginScatter={this.handleLoginScatter}
        handleCheckName={this.handleCheckName}
        handleSuggestNetwork={this.handleSuggestNetwork}
        account={account}
        isExist={isExist}
        anchorOrigin={anchorOrigin}
        openSnack={openSnack}
        handleSnack={this.handleSnack}
        snackMessage={snackMessage}
        chainId={chainId}
        eosHost={eosHost}
        eosHttpPort={eosHttpPort}
        eosProtocol={eosProtocol}
      />
    );
  }
}

VoteSignup.propTypes = {
  identity : PropTypes.object,
  producers : PropTypes.array,
  history : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    identity : state.eos.identity,
    chainInfo : state.eos.chainInfo,
    error : state.eos.error,
    newAccountTr : state.eos.newAccountTr
  };
}

export default connect(mapStateToProps, {loginScatterTrigger, logoutScatterTrigger, newAccountTrigger, getInfoTrigger, resetEOSError, resetEOSState})(withAlert(VoteSignup));
