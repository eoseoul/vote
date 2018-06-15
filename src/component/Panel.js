import React, {Component} from 'react';
import _ from 'lodash';

import PanelView from './PanelView';
import {connect} from 'react-redux';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head_block_num : 0,
      last_irreversible_block_num : 0,
      producing_node : 0,
      non_producing_node : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const {chainInfo, nodes} = nextProps;
    let producing_node = 0;
    _.forEach(nodes, (node) => {
      if (!_.isEmpty(node) && node.is_bp) {
        producing_node += 1;
      }
    });
    const non_producing_node = nodes.length - producing_node;
    this.setState({
      head_block_num : chainInfo.head_block_num,
      last_irreversible_block_num : chainInfo.last_irreversible_block_num,
      producing_node : producing_node,
      non_producing_node : non_producing_node
    });
  }

  render() {
    const {
      head_block_num,
      last_irreversible_block_num,
      producing_node,
      non_producing_node
    } = this.state;
    const _head_block_num = Number(head_block_num).toLocaleString('en', {useGrouping : true});
    const _last_irreversible_block_num = Number(last_irreversible_block_num).toLocaleString('en', {useGrouping : true});
    const _producing_node = Number(producing_node).toLocaleString('en', {useGrouping : true});
    const _non_producing_node = Number(non_producing_node).toLocaleString('en', {useGrouping : true});
    return (
      <PanelView
        head_block_num={_head_block_num}
        last_irreversible_block_num={_last_irreversible_block_num}
        producing_node={_producing_node}
        non_producing_node={_non_producing_node}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    chainInfo : state.stats.chainInfo,
    nodes : state.stats.nodes
  };
}

export default connect(mapStateToProps, {})(Panel);
