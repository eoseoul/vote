import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import VoteProxyUnauthView from './VoteProxyUnauthView';

import {getProducers, getGState} from '../redux/actions/eos';

import {getAccountApi} from '../utils/eos';

const getProducersTrigger = getProducers.sagaTrigger;
const getGStateTrigger = getGState.sagaTrigger;

class VoteUnauth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      producers : [],
      proxyAccount : {}
    };
  }
  componentDidMount() {
    const {history, identity} = this.props;
    if (!_.isEmpty(identity) && !_.isEmpty(identity.accounts)) {
      history.push('/voteproxy');
    }
    this.props.getProducersTrigger({});
    this.props.getGStateTrigger({});

    getAccountApi('eoseouldotio')
      .then((account) => {
        this.setState({proxyAccount : account});
      });
  }

  componentWillReceiveProps(nextProps) {
    const {producers, gState} = nextProps;
    this.setState({producers, gState});
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
    const {history, totalVoteWeight} = this.props;
    const {producers, proxyAccount, gState} = this.state;
    const proxyProducers = this.getProxyProducers(producers, proxyAccount);

    return (
      <VoteProxyUnauthView history={history} producers={proxyProducers} totalVoteWeight={totalVoteWeight} gState={gState} />
    );
  }
}

VoteUnauth.propTypes = {
  history : PropTypes.object.isRequired,
  identity : PropTypes.object
};

function mapStateToProps(state) {
  return {
    identity : state.eos.identity,
    producers : state.eos.producers,
    gState : state.eos.gState,
    totalVoteWeight : state.eos.totalVoteWeight
  };
}

export default connect(mapStateToProps, {getProducersTrigger, getGStateTrigger})(VoteUnauth);
