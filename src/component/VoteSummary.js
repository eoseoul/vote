import React, {Component} from 'react';
import {connect} from 'react-redux';

import _ from 'lodash';

import VoteSummaryView from './VoteSummaryView';

import {logoutScatter} from '../redux/actions/eos';

const logoutScatterTrigger = logoutScatter.sagaTrigger;

class VoteSummary extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutScatter = this.handleLogoutScatter.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const {identity, history} = nextProps;
    if (_.isEmpty(identity)) {
      history.push('/votelogin');
    }
  }

  handleLogoutScatter() {
    this.props.logoutScatterTrigger({});
  }

  render() {
    const {summary} = this.props;

    return (<VoteSummaryView
      name={summary.name}
      eos={summary.total_balance}
      staked={summary.voter_info.staked}
      voteCount={summary.producerCnt}
      handleLogoutScatter={this.handleLogoutScatter}
    />
    );
  }
}

function mapStateToProps(state) {
  return {
    account : state.eos.account,
    identity : state.eos.identity
  };
}

export default connect(mapStateToProps, {logoutScatterTrigger})(VoteSummary);
