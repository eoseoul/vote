import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import {withAlert} from 'react-alert';

import VoteProxyView from './VoteProxyView';

import {getGState, getAccount, getProducers, vote as voteAction, resetEOSError} from '../redux/actions/eos';
import {getAccountApi} from '../utils/eos';

const getAccountTrigger = getAccount.sagaTrigger;
const getProducersTrigger = getProducers.sagaTrigger;
const voteTrigger = voteAction.sagaTrigger;
const getGStateTrigger = getGState.sagaTrigger;

const proxyName = window.STATS_CONFIG.proxyName;

class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked : false,
      proxyAccount : {}
    };

    this.handleProxy = this.handleProxy.bind(this);
    this.bAlert = false;
  }

  componentWillMount() {
    const {identity, history} = this.props;
    if (_.isEmpty(identity) && _.isEmpty(identity.accounts)) {
      history.push('/voteproxylogin');
    }
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.identity.accounts)) {
      const name = this.getAccountName(this.props.identity);
      const req = {
        params : {name : name}
      };
      this.props.getAccountTrigger(req);
      this.props.getProducersTrigger({});
      this.props.getGStateTrigger({});

      getAccountApi(proxyName)
        .then((account) => {
          this.setState({proxyAccount : account});
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {history, identity, account, forceUpdateAccount, alert, error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      const message = error.eosMessage || error.error_msg;
      alert.show(message);
      this.props.resetEOSError();
      return;
    }
    if (_.isEmpty(identity) && _.isEmpty(identity.accounts)) {
      history.push('/voteproxylogin');
      return;
    }
    if (forceUpdateAccount.is === true) {
      const name = this.getAccountName(this.props.identity);
      const req = {
        params : {name : name}
      };
      this.props.getAccountTrigger(req);
      this.props.getProducersTrigger({});
    }

    if (!_.isEmpty(account.voter_info) && account.voter_info.proxy === proxyName) {
      this.setState({checked : true});
    } else {
      this.setState({checked : false});
    }
  }

  handleProxy(e, checked) {
    const eosAccount = this.getAccountName(this.props.identity);
    let req = null;
    if (checked === true) {
      req = {
        params : {vote : {voter : eosAccount, proxy : proxyName, producers : []}}
      };
    } else {
      req = {
        params : {vote : {voter : eosAccount, proxy : '', producers : []}}
      };
    }
    // this.setState({checked : false});
    // console.log(checked);
    this.props.voteTrigger(req);

    this.bAlert = true;
  }

  getAccountName(identity) {
    if (_.isEmpty(identity.accounts)) {
      return '';
    }
    return identity.accounts[0].name;
  }

  getProxyProducers(_producers, proxyAccount) {
    if (_.isEmpty(proxyAccount)) {
      return [];
    }
    const proxyProducers = proxyAccount.voter_info.producers;
    const producers = [];
    _.forEach(proxyProducers, (name) => {
      const producer = _.find(_producers, {owner : name});
      if (!_.isEmpty(producer)) {
        producers.push(producer);
      }
    });
    return _.sortBy(producers, (producer) => producer.ranking);
  }

  render() {
    const {account, identity, producers, totalVoteWeight, gState} = this.props;
    const {proxyAccount, checked} = this.state;
    if (_.isEmpty(account) || _.isEmpty(identity) || _.isEmpty(proxyAccount)) {
      return <div/>;
    }
    const eosAccount = this.getAccountName(identity);
    const proxyProducers = this.getProxyProducers(producers, proxyAccount);
    return (
      <VoteProxyView
        history={this.props.history}
        gState={gState}
        producers={proxyProducers}
        totalVoteWeight={totalVoteWeight}
        eosAccount={eosAccount}
        handleProxy={this.handleProxy}
        proxyAccount={proxyAccount}
        checked={checked}
      />
    );
  }
}

Vote.propTypes = {
  account : PropTypes.object,
  identity : PropTypes.object,
  producers : PropTypes.array,
  error : PropTypes.object,
  history : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    account : state.eos.account,
    forceUpdateAccount : state.eos.forceUpdateAccount,
    identity : state.eos.identity,
    producers : state.eos.producers,
    gState : state.eos.gState,
    totalVoteWeight : state.eos.totalVoteWeight,
    error : state.eos.error
  };
}

export default connect(mapStateToProps, {getGStateTrigger, getAccountTrigger, getProducersTrigger, voteTrigger, resetEOSError})(withAlert(Vote));
