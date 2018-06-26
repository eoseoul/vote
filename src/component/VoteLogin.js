import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';
import moment from 'moment';

import {withAlert} from 'react-alert';

import VoteLoginView from './VoteLoginView';
import DisclaimerDialog from './DisclaimerDialog';

import {loginScatter, logoutScatter, resetEOSError} from '../redux/actions/eos';

const loginScatterTrigger = loginScatter.sagaTrigger;
const logoutScatterTrigger = logoutScatter.sagaTrigger;

class VoteLogin extends Component {
  constructor(props) {
    super(props);

    // localStorage.removeItem('popupDisable');
    this.state = {
      open : this.checkDisplayPopup()
    };

    this.handleLoginScatter = this.handleLoginScatter.bind(this);
    this.handleMoveSignup = this.handleMoveSignup.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);

    this.bAlert = false;
  }

  componentDidMount() {
    this.props.logoutScatterTrigger({});
  }

  componentWillReceiveProps(nextProps) {
    const {history, redirect, identity, alert, error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      const message = error.eosMessage || error.error_msg;
      this.props.resetEOSError();
      alert.show(message);
      return;
    }
    if (!_.isEmpty(identity) && !_.isEmpty(identity.accounts)) {
      history.push(redirect);
    }
  }

  handleLoginScatter() {
    if (_.isEmpty(window.scatter)) {
      this.props.alert.show('You don\'t seem to have Scatter!');
      this.props.history.push('/votesignup');
      return;
    }

    const eosHost = window.STATS_CONFIG.eosHost;
    const eosHttpPort = window.STATS_CONFIG.eosHttpPort;
    const chainId = window.STATS_CONFIG.chainId;
    const req = {
      params : {
        requiredFields : {
          accounts : [{blockchain : 'eos', host : eosHost, port : eosHttpPort, chainId : chainId}]
        }
      }
    };
    this.props.loginScatterTrigger(req);
  }

  handleMoveSignup() {
    this.props.history.push('/votesignup');
  }

  handleConfirm(popupDisable) {
    this.setState({open : false});
    if (popupDisable) {
      this.updateDisplayPopupDate();
    }
  }

  checkDisplayPopup() {
    const popupDisable = localStorage.getItem('popupDisable');
    if (_.isEmpty(popupDisable)) {
      return true;
    }
    const diff = moment(popupDisable).diff(moment(), 'h');
    if (diff < 0) {
      return true;
    }
    return false;
  }

  updateDisplayPopupDate() {
    localStorage.setItem('popupDisable', moment().add(24, 'hours').format());
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <VoteLoginView
          history={this.props.history}
          handleLoginScatter={this.handleLoginScatter}
          handleMoveSignup={this.handleMoveSignup}
        />
        <DisclaimerDialog open={open} handleConfirm={this.handleConfirm}/>
      </div>
    );
  }
}

VoteLogin.propTypes = {
  identity : PropTypes.object,
  producers : PropTypes.array,
  history : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    identity : state.eos.identity,
    error : state.eos.error
  };
}

export default connect(mapStateToProps, {loginScatterTrigger, logoutScatterTrigger, resetEOSError})(withAlert(VoteLogin));
