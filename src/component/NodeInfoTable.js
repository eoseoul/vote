import React, {Component} from 'react';
import _ from 'lodash';

import NpTableView from './NpTableView';
import PnTableView from './PnTableView';
import {connect} from 'react-redux';

import {logoutUser} from '../redux/actions/app';

class NodeInfoTable extends Component {
  render() {
    const {chainInfo, nodes, login} = this.props;
    const sortedNode = _.sortBy(nodes, (node) => node.producer.ranking);

    let producingNodes = sortedNode.filter(
      (node, index) => (index <= 20)
    );
    const fullNodes = sortedNode.filter((node, index) => {
      if (index > 20 && index < 100 && node.status !== 2) { // not inactived;
        return true;
      }
      return false;
    });

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
