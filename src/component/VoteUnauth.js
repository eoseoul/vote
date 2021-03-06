import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import VoteUnauthView from './VoteUnauthView';

import {getProducers, getGState} from '../redux/actions/eos';

const getProducersTrigger = getProducers.sagaTrigger;
const getGStateTrigger = getGState.sagaTrigger;

class VoteUnauth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      producers : []
    };
  }
  componentDidMount() {
    const {history, identity} = this.props;
    if (!_.isEmpty(identity) && !_.isEmpty(identity.accounts)) {
      history.push('/vote');
    }
    this.props.getProducersTrigger({});
    this.props.getGStateTrigger({});
  }

  componentWillReceiveProps(nextProps) {
    const {producers, gState} = nextProps;
    this.setState({producers, gState});
  }

  render() {
    const {history, totalVoteWeight} = this.props;
    const {producers, gState} = this.state;
    return (
      <VoteUnauthView history={history} producers={producers} totalVoteWeight={totalVoteWeight} gState={gState} redirect="/vote" />
    );
  }
}

VoteUnauth.propTypes = {
  history : PropTypes.object.isRequired,
  identity : PropTypes.object,
  producers : PropTypes.array,
  gSate : PropTypes.object,
  totalVoteWeight : PropTypes.string
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
