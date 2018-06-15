import React, {Component} from 'react';
import {connect} from 'react-redux';

import VoteStateView from './VoteStateView';

import {fromVotingScaleDetail, toCoin, fromCoin} from '../utils/format';

class VoteState extends Component {
  render() {
    const supply = toCoin(this.props.gState.stats.supply, false);
    const target_activated_stake = 150000000;// supply * 0.15;
    const total_activated_stake = this.props.gState.total_activated_stake / 10000;

    const supply_percent = 1;
    const target_activated_stake_percent = target_activated_stake / supply;
    const total_activated_stake_percent = total_activated_stake / supply;

    const displayInfo = {
      supply : fromCoin(supply),
      supply_percent : fromVotingScaleDetail(supply_percent),
      target_activated_stake : fromCoin(target_activated_stake),
      target_activated_stake_percent : fromVotingScaleDetail(target_activated_stake_percent),
      total_activated_stake : fromCoin(total_activated_stake),
      total_activated_stake_percent : fromVotingScaleDetail(total_activated_stake_percent)
    };

    let diff = target_activated_stake - total_activated_stake;
    if (diff < 0) {
      diff = 0;
    }

    const data = {
      datasets : [
        {
          backgroundColor : 'rgba(67, 64, 83, 1)',
          data : [total_activated_stake / supply * 100],
          label : 'target activated stake EOS'
        }, {
          backgroundColor : 'rgba(167, 164, 183, 1)',
          data : [diff / supply * 100],
          label : 'total activated stake EOS'
        }, {
          backgroundColor : 'rgba(201, 192, 249, 0.4)',
          data : [(supply - diff - total_activated_stake) / supply * 100],
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
