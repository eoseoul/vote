import React, {Component} from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

import VotePowerView from './VotePowerView';

import {vote2Stake} from '../utils/format';

class VotePower extends Component {
  render() {
    const {summary, handleUpdate} = this.props;
    const {voter_info} = summary;

    const lastStakeWeight = vote2Stake(voter_info.last_vote_weight);

    const data = {
      datasets : [
        {
          backgroundColor : 'rgba(201, 192, 249, 0.4)',
          hoverBackgroundColor : 'rgba(201, 192, 249, 0.6)',
          data : [lastStakeWeight],
          label : 'Last VP'
        },
        {
          backgroundColor : 'rgba(67, 64, 83, 1)',
          hoverBackgroundColor : 'rgba(67, 64, 83, 0.8)',
          data : [numeral(voter_info.staked).value()],
          label : 'Current VP'
        }
      ]
    };
    return (
      <VotePowerView
        lastStakeWeight={lastStakeWeight}
        staked={voter_info.staked}
        handleUpdate={handleUpdate}
        data={data}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(VotePower);
