import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
import {connect} from 'react-redux';

class GoogleMapContainer extends Component {
  render() {
    const {nodes, chainInfo} = this.props;
    const p_nodes = nodes.filter((node) => (node.is_bp === true));
    const f_nodes = []; // nodes.filter((node) => (node.is_bp === false));
    return (
      <GoogleMap
        p_nodes={p_nodes}
        f_nodes={f_nodes}
        head_block_producer={chainInfo.head_block_producer}
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

export default connect(mapStateToProps, {})(GoogleMapContainer);
