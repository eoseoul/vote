import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import {withAlert} from 'react-alert';

import VoteLoginView from './VoteLoginView';

import {loginScatter, logoutScatter, resetEOSError} from '../redux/actions/eos';

const loginScatterTrigger = loginScatter.sagaTrigger;
const logoutScatterTrigger = logoutScatter.sagaTrigger;

class VoteLogin extends Component {
  constructor(props) {
    super(props);

    this.handleLoginScatter = this.handleLoginScatter.bind(this);
    this.handleMoveSignup = this.handleMoveSignup.bind(this);

    this.bAlert = false;
  }

  componentDidMount() {
    this.props.logoutScatterTrigger({});
  }

  componentWillReceiveProps(nextProps) {
    const {history, identity, alert, error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      const message = error.eosMessage || error.error_msg;
      this.props.resetEOSError();
      alert.show(message);
      return;
    }
    if (!_.isEmpty(identity) && !_.isEmpty(identity.accounts)) {
      history.push('/vote');
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

  render() {
    return (
      <VoteLoginView
        history={this.props.history}
        handleLoginScatter={this.handleLoginScatter}
        handleMoveSignup={this.handleMoveSignup}
      />
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
