import React, {Component} from 'react';
import NpTableView from './NpTableView';
import PnTableView from './PnTableView';
import {connect} from 'react-redux';

import {logoutUser} from '../redux/actions/app';

class NodeInfoTable extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      chainInfo,
      nodes,
      login
    } = this.props;
    const producingNodes = nodes.filter(
      (node) => (node.is_bp === true)
    );
    const fullNodes = nodes.filter(
      (node) => (node.is_bp === false)
    );
    return (
      <div>
        <PnTableView nodes={producingNodes} head_block_time={chainInfo.head_block_time} login={login} logoutUser={this.props.logoutUser}/>
        <NpTableView nodes={fullNodes} head_block_time={chainInfo.head_block_time}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chainInfo : state.stats.chainInfo,
    nodes : state.stats.nodes,
    login : state.app.login
  };
}

export default connect(mapStateToProps, {logoutUser})(NodeInfoTable);
