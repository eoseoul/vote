import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import _ from 'lodash';
import {loginScatter, logoutScatter, newAccount, getAccount, getProducers, stake, unstake, vote} from '../redux/actions/eos';

const loginScatterTrigger = loginScatter.sagaTrigger;
const logoutScatterTrigger = logoutScatter.sagaTrigger;

const newAccountTrigger = newAccount.sagaTrigger;
const getAccountTrigger = getAccount.sagaTrigger;
const getProducersTrigger = getProducers.sagaTrigger;

const stakeTrigger = stake.sagaTrigger;
const unstakeTrigger = unstake.sagaTrigger;
const voteTrigger = vote.sagaTrigger;

class Test extends Component {
  constructor(props) {
    super(props);

    this.handleLoginScatter = this.handleLoginScatter.bind(this);
    this.handleLogoutScatter = this.handleLogoutScatter.bind(this);

    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleGetProducers = this.handleGetProducers.bind(this);

    this.handleStake = this.handleStake.bind(this);
    this.handleUnstake = this.handleUnstake.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const {account, identity} = nextProps;

    console.log(account);
    console.log(identity.accounts);
  }

  handleNewAccount() {
    const req = {
      params : {name : 'newaccount11', publicKey : 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'}
    };
    this.props.newAccountTrigger(req);
  }

  handleLoginScatter() {
    const eosHost = window.STATS_CONFIG.eosHost;
    const eosHttpPort = window.STATS_CONFIG.eosHttpPort;
    const req = {
      params : {
        requiredFields : {
          accounts : [{blockchain : 'eos', host : eosHost, port : eosHttpPort}]
        }
      }
    };
    this.props.loginScatterTrigger(req);
  }

  handleLogoutScatter() {
    this.props.logoutScatterTrigger({});
  }

  handleGetAccount() {
    const req = {
      params : {name : 'newaccount11'}
    };
    this.props.getAccountTrigger(req);
  }

  handleGetProducers() {
    const req = {
    };
    this.props.getProducersTrigger(req);
  }

  handleStake() {
    const req = {
      params : {stake : {from : 'newaccount11', receiver : 'newaccount11', stake_net_quantity : '10.0000 SYS', stake_cpu_quantity : '10.0000 SYS', transfer : 0}}
    };
    this.props.stakeTrigger(req);
  }

  handleUnstake() {
    const req = {
      params : {unstake : {from : 'newaccount11', receiver : 'newaccount11', unstake_net_quantity : '5.00000 SYS', unstake_cpu_quantity : '5.00000 SYS', transfer : 0}}
    };
    this.props.unstakeTrigger(req);
  }

  handleVote() {
    const req = {
      params : {vote : {voter : 'newaccount11', proxy : '', producers : ['pmang1111111']}}
    };
    this.props.voteTrigger(req);
  }

  render() {
    return <div>
      <p>
        Test
      </p>
      <div>
        <button onClick={this.handleLoginScatter} > login Scatter </button>
      </div>
      <div>
        <button onClick={this.handleLogoutScatter} > logout Scatter </button>
      </div>
      <div>
        <button onClick={this.handleNewAccount} > new Account </button>
      </div>
      <div>
        <button onClick={this.handleGetAccount} > get Account </button>
      </div>
      <div>
        <button onClick={this.handleGetProducers} > get Producers </button>
      </div>
      <div>
        <button onClick={this.handleStake} > stake </button>
      </div>
      <div>
        <button onClick={this.handleUnstake} > unstake </button>
      </div>
      <div>
        <button onClick={this.handleVote} > vote </button>
      </div>
    </div>;
  }
}

Test.propTypes = {
  account : PropTypes.object
};

function mapStateToProps(state) {
  return {
    account : state.eos.account,
    identity : state.eos.identity
  };
}

export default connect(mapStateToProps, {loginScatterTrigger, logoutScatterTrigger, newAccountTrigger, getAccountTrigger, getProducersTrigger, stakeTrigger, unstakeTrigger, voteTrigger})(Test);
