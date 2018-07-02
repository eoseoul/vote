import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';
import numeral from 'numeral';

import {withAlert} from 'react-alert';

import VoteView from './VoteView';

import {getGState, getAccount, getProducers, vote as voteAction, resetEOSError} from '../redux/actions/eos';

import {toCoin, plusCoin, minusCoin, stake2vote} from '../utils/format';

const getAccountTrigger = getAccount.sagaTrigger;
const getProducersTrigger = getProducers.sagaTrigger;
const voteTrigger = voteAction.sagaTrigger;
const getGStateTrigger = getGState.sagaTrigger;

const symbol = window.STATS_CONFIG.symbol;

class Vote extends Component {
  constructor(props) {
    super(props);

    this.votedProducers = [];
    this.selectedProducers = [];

    this.handleSelected = this.handleSelected.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleVoteUpdate = this.handleVoteUpdate.bind(this);

    this.bAlert = false;
  }

  componentWillMount() {
    const {identity, history} = this.props;
    if (_.isEmpty(identity) && _.isEmpty(identity.accounts)) {
      history.push('/votelogin');
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
    }
  }

  componentWillReceiveProps(nextProps) {
    const {history, identity, forceUpdateAccount, alert, error} = nextProps;
    if (!_.isEmpty(error) && this.bAlert === true) {
      this.bAlert = false;
      const message = error.eosMessage || error.error_msg;
      alert.show(message);
      this.props.resetEOSError();
      return;
    }
    if (_.isEmpty(identity) && _.isEmpty(identity.accounts)) {
      history.push('/votelogin');
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
  }

  handleSelected(votedProducers, selectedProducers) {
    if (votedProducers !== null) {
      this.votedProducers = votedProducers;
    }
    if (selectedProducers !== null) {
      this.selectedProducers = selectedProducers;
    }
  }

  handleVote() {
    const producers = this.selectedProducers.sort();
    const eosAccount = this.getAccountName(this.props.identity);
    const req = {
      params : {vote : {voter : eosAccount, proxy : '', producers : producers}}
    };
    this.props.voteTrigger(req);

    this.bAlert = true;
    this.votedProducers = [];
    this.selectedProducers = [];
  }

  handleVoteUpdate() {
    const producers = this.votedProducers.sort();
    const eosAccount = this.getAccountName(this.props.identity);
    const req = {
      params : {vote : {voter : eosAccount, proxy : '', producers : producers}}
    };
    this.props.voteTrigger(req);

    this.bAlert = true;
    this.votedProducers = [];
    this.selectedProducers = [];
  }

  getSummary(account, producers) {
    const voter_info = account.voter_info;
    const self_delegated_bandwidth = account.self_delegated_bandwidth;
    const total_resources = account.total_resources;

    const summary = {
      name : account.account_name,
      balance : account.balance,
      voter_info : {
        producers : [],
        last_vote_weight : 0.00000000000000000,
        proxied_vote_weight : 0.00000000000000000,
        staked : `0.0000 ${symbol}`,
        unstaked : `0.0000 ${symbol}`,
        is_proxy : 0,
        proxy : ''
      },
      producerCnt : 0,
      cpu_weight : toCoin(0),
      net_weight : toCoin(0),
      other_cpu_weight : toCoin(0),
      other_net_weight : toCoin(0),
      total_cpu_weight : toCoin(0),
      total_net_weight : toCoin(0),
      refund : {
        cpu_amount : toCoin(0),
        net_amount : toCoin(0)
      }
    };

    if (!_.isEmpty(voter_info)) {
      summary.producerCnt = voter_info.producers.length;
      summary.voter_info = {
        producers : _.compact(_.map(voter_info.producers, (name) => _.find(producers, {owner : name}))),
        last_vote_weight : voter_info.last_vote_weight,
        current_vote_weight : stake2vote(voter_info.staked),
        proxied_vote_weight : voter_info.proxied_vote_weight,
        staked : `${numeral(voter_info.staked / 10000).format('0.0000')} ${symbol}`,
        unstaked : voter_info.unstaking,
        unstaking : voter_info.unstaking,
        is_proxy : voter_info.is_proxy,
        proxy : voter_info.proxy
      };
    }
    if (!_.isEmpty(self_delegated_bandwidth)) {
      summary.cpu_weight = self_delegated_bandwidth.cpu_weight;
      summary.net_weight = self_delegated_bandwidth.net_weight;
    }

    if (!_.isEmpty(total_resources)) {
      summary.total_cpu_weight = total_resources.cpu_weight;
      summary.total_net_weight = total_resources.net_weight;

      summary.other_cpu_weight = minusCoin(summary.total_cpu_weight, summary.cpu_weight);
      summary.other_net_weight = minusCoin(summary.total_net_weight, summary.net_weight);
    }

    if (!_.isEmpty(account.refund)) {
      summary.refund = account.refund;
      summary.voter_info.unstaked = plusCoin(account.refund.cpu_amount, account.refund.net_amount);
    }
    summary.total_balance = plusCoin(summary.balance, plusCoin(summary.voter_info.staked, summary.voter_info.unstaked));

    return summary;
  }

  getAccountName(identity) {
    if (_.isEmpty(identity.accounts)) {
      return '';
    }
    return identity.accounts[0].name;
  }

  render() {
    const {account, identity, producers, totalVoteWeight, gState} = this.props;
    if (_.isEmpty(account) || _.isEmpty(identity)) {
      return <div/>;
    }
    const summary = this.getSummary(account, producers);
    const eosAccount = this.getAccountName(identity);
    const votedProducers = summary.voter_info.producers;
    const electProducers = _.map(producers, (producer) => {
      const clone = _.cloneDeep(producer);
      if (_.find(votedProducers, {owner : producer.owner})) {
        clone.selected = true;
      } else {
        clone.selected = false;
      }
      return clone;
    });
    return (
      <VoteView
        history={this.props.history}
        summary={summary}
        gState={gState}
        producers={electProducers}
        totalVoteWeight={totalVoteWeight}
        eosAccount={eosAccount}
        handleSelected={this.handleSelected}
        handleVote={this.handleVote}
        handleVoteUpdate={this.handleVoteUpdate}
      />
    );
  }
}

Vote.propTypes = {
  account : PropTypes.object,
  identity : PropTypes.object,
  producers : PropTypes.array,
  error : PropTypes.object,
  history : PropTypes.object.isRequired,
  gState : PropTypes.object,
  totalVoteWeight : PropTypes.string
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
