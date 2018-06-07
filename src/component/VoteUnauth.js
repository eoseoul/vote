import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import VoteUnauthView from './VoteUnauthView';

import {getProducers} from '../redux/actions/eos';

const getProducersTrigger = getProducers.sagaTrigger;

class VoteUnauth extends Component {
  componentDidMount() {
    const {history, identity} = this.props;
    if (!_.isEmpty(identity) && !_.isEmpty(identity.accounts)) {
      history.push('/vote');
    }
    this.props.getProducersTrigger({});
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const {history, producers, totalVoteWeight} = this.props;
    return (
      <VoteUnauthView history={history} producers={producers} totalVoteWeight={totalVoteWeight}/>
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
    totalVoteWeight : state.eos.totalVoteWeight
  };
}

export default connect(mapStateToProps, {getProducersTrigger})(VoteUnauth);
