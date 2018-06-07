import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import numeral from 'numeral';

import VoteTokenView from './VoteTokenView';

import {stake as stakeAction, unstake as unstakeAction} from '../redux/actions/eos';

import {toCoin, plusCoin, minusCoin} from '../utils/format';

const stakeTrigger = stakeAction.sagaTrigger;
const unstakeTrigger = unstakeAction.sagaTrigger;

class VoteToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStake : false,
      openUnstake : false,
      stake : {
        stake_cpu_quantity : toCoin(0),
        stake_net_quantity : toCoin(0)
      },
      unstake : {
        unstake_cpu_quantity : toCoin(0),
        unstake_net_quantity : toCoin(0)
      }
    };
    this.handleClickOpenStake = this.handleClickOpenStake.bind(this);
    this.handleClickCloseStake = this.handleClickCloseStake.bind(this);
    this.handleChangeStake = this.handleChangeStake.bind(this);
    this.handleStake = this.handleStake.bind(this);

    this.handleClickOpenUnstake = this.handleClickOpenUnstake.bind(this);
    this.handleClickCloseUnstake = this.handleClickCloseUnstake.bind(this);
    this.handleChangeUnstake = this.handleChangeUnstake.bind(this);
    this.handleUnstake = this.handleUnstake.bind(this);

    this.handleStakeCPUMax = this.handleStakeCPUMax.bind(this);
    this.handleStakeNetMax = this.handleStakeNetMax.bind(this);
    this.handleUnstakeCPUMax = this.handleUnstakeCPUMax.bind(this);
    this.handleUnstakeNetMax = this.handleUnstakeNetMax.bind(this);
  }

  handleClickOpenStake = () => {
    this.setState({
      openStake : true
    });
  }

  handleClickCloseStake = () => {
    this.setState({
      openStake : false
    });
  }

  handleChangeStake(e) {
    const {stake} = this.state;
    stake[e.target.name] = e.target.value;
    this.setState({stake});
  }

  handleStake(e) {
    const {eosAccount} = this.props;
    const {stake} = this.state;
    const stake_net_quantity = toCoin(stake.stake_net_quantity);
    const stake_cpu_quantity = toCoin(stake.stake_cpu_quantity);
    const req = {
      params : {stake : {from : eosAccount, receiver : eosAccount, stake_net_quantity : stake_net_quantity, stake_cpu_quantity : stake_cpu_quantity, transfer : 0}}
    };
    this.props.stakeTrigger(req);
    this.handleClickCloseStake();

    this.initState();
  }


  handleClickOpenUnstake = () => {
    this.setState({
      openUnstake : true
    });
  }

  handleClickCloseUnstake = () => {
    this.setState({
      openUnstake : false
    });
  }

  handleChangeUnstake(e) {
    const {unstake} = this.state;
    unstake[e.target.name] = e.target.value;
    this.setState({unstake});
  }

  handleUnstake(e) {
    const {eosAccount} = this.props;
    const {unstake} = this.state;
    const unstake_net_quantity = toCoin(unstake.unstake_net_quantity);
    const unstake_cpu_quantity = toCoin(unstake.unstake_cpu_quantity);
    const req = {
      params : {unstake : {from : eosAccount, receiver : eosAccount, unstake_net_quantity : unstake_net_quantity, unstake_cpu_quantity : unstake_cpu_quantity, transfer : 0}}
    };
    this.props.unstakeTrigger(req);
    this.handleClickCloseUnstake();

    this.initState();
  }

  handleStakeCPUMax() {
    const {summary} = this.props;
    const {balance, refund} = summary;
    this.setState({
      stake : {
        stake_cpu_quantity : plusCoin(balance, refund.cpu_amount),
        stake_net_quantity : toCoin(0)
      }
    });
  }

  handleStakeNetMax() {
    const {summary} = this.props;
    const {balance, refund} = summary;
    this.setState({
      stake : {
        stake_cpu_quantity : toCoin(0),
        stake_net_quantity : plusCoin(balance, refund.net_amount)
      }
    });
  }

  handleUnstakeCPUMax() {
    const {summary} = this.props;
    const {unstake} = this.state;

    let unstake_cpu_quantity = toCoin(0);
    if (numeral(summary.total_cpu_weight).value() > numeral('1.0000 EOS').value()) {
      unstake_cpu_quantity = minusCoin(summary.total_cpu_weight, '1.0000 EOS');
    }

    this.setState({
      unstake : {
        unstake_cpu_quantity : unstake_cpu_quantity,
        unstake_net_quantity : unstake.unstake_net_quantity
      }
    });
  }

  handleUnstakeNetMax() {
    const {summary} = this.props;
    const {unstake} = this.state;

    let unstake_net_quantity = toCoin(0);
    if (numeral(summary.total_net_weight).value() > numeral('1.0000 EOS').value()) {
      unstake_net_quantity = minusCoin(summary.total_net_weight, '1.0000 EOS');
    }

    this.setState({
      unstake : {
        unstake_cpu_quantity : unstake.unstake_cpu_quantity,
        unstake_net_quantity : unstake_net_quantity
      }
    });
  }

  initState() {
    this.setState({
      openStake : false,
      openUnstake : false,
      stake : {
        stake_cpu_quantity : toCoin(0),
        stake_net_quantity : toCoin(0)
      },
      unstake : {
        unstake_cpu_quantity : toCoin(0),
        unstake_net_quantity : toCoin(0)
      }
    });
  }

  render() {
    const {openStake, openUnstake, stake, unstake} = this.state;
    const {summary} = this.props;
    const {voter_info, balance} = summary;
    const {staked, unstaked} = voter_info;

    const data = {
      labels : [
        'staked',
        'refunding',
        'balance'
      ],
      datasets : [{
        data : [numeral(voter_info.staked).value(), numeral(voter_info.unstaked).value(), numeral(balance).value()],
        backgroundColor : [
          'rgba(67, 64, 83, 1)',
          'rgba(129, 123, 159, 1)',
          'rgba(201, 192, 249, 0.4)'
        ],
        hoverBackgroundColor : [
          'rgba(67, 64, 83, 0.8)',
          'rgba(129, 123, 159, 0.8)',
          'rgba(201, 192, 249, 0.6)'
        ]
      }]
    };

    return (
      <VoteTokenView
        summary={summary}
        balance={balance}
        totalBalance={summary.total_balance}
        staked={staked}
        unstaked={unstaked}
        openStake={openStake}
        openUnstake={openUnstake}
        data={data}

        handleClickOpenStake={this.handleClickOpenStake}
        handleClickCloseStake={this.handleClickCloseStake}
        handleChangeStake={this.handleChangeStake}
        handleStake={this.handleStake}
        stake={stake}
        handleStakeCPUMax={this.handleStakeCPUMax}
        handleStakeNetMax={this.handleStakeNetMax}

        handleClickOpenUnstake={this.handleClickOpenUnstake}
        handleClickCloseUnstake={this.handleClickCloseUnstake}
        handleChangeUnstake={this.handleChangeUnstake}
        handleUnstake={this.handleUnstake}
        unstake={unstake}
        handleUnstakeCPUMax={this.handleUnstakeCPUMax}
        handleUnstakeNetMax={this.handleUnstakeNetMax}
      />
    );
  }
}

VoteToken.propTypes = {
  eosAccount : PropTypes.string.isRequired,
  summary : PropTypes.object.isRequired,
  identity : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    identity : state.eos.identity
  };
}

export default connect(mapStateToProps, {stakeTrigger, unstakeTrigger})(VoteToken);
