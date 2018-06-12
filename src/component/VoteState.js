import React, {Component} from 'react';
import {connect} from 'react-redux';

import VoteStateView from './VoteStateView';

import {fromVotingScale, displayMillion, toCoin} from '../utils/format';

class VoteState extends Component {
  render() {
    const supply = toCoin(this.props.gState.stats.supply, false);
    const target_activated_stake = supply * 0.15;
    const total_activated_stake = this.props.gState.total_activated_stake / 10000;

    const supply_percent = 1;
    const target_activated_stake_percent = target_activated_stake / supply;
    const total_activated_stake_percent = total_activated_stake / supply;

    const displayInfo = {
      supply : displayMillion(supply),
      supply_percent : fromVotingScale(supply_percent),
      target_activated_stake : displayMillion(target_activated_stake),
      target_activated_stake_percent : fromVotingScale(target_activated_stake_percent),
      total_activated_stake : displayMillion(total_activated_stake),
      total_activated_stake_percent : fromVotingScale(total_activated_stake_percent)
    };

    const data = {
      datasets : [
        {
          backgroundColor : 'rgba(67, 64, 83, 1)',
          data : [total_activated_stake / supply * 100],
          label : 'target activated stake EOS'
        }, {
          backgroundColor : 'rgba(167, 164, 183, 1)',
          data : [(target_activated_stake - total_activated_stake) / supply * 100],
          label : 'total activated stake EOS'
        }, {
          backgroundColor : 'rgba(201, 192, 249, 0.4)',
          data : [(supply - target_activated_stake) / supply * 100],
          label : 'total supply EOS'
        }
      ]
    };
    return (
      <VoteStateView
        displayInfo={displayInfo}
        data={data}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(VoteState);
