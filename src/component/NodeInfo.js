import React, {Component} from 'react';
import _ from 'lodash';

import NodeInfoModal from './NodeInfoModal';

class NodeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show : false
    };
    this.onModal = this.onModal.bind(this);
    this.offModal = this.offModal.bind(this);
  }

  onModal(evt) {
    evt.stopPropagation();
    if (!this.state.show) {
      this.setState({
        show : true
      });
    }
  }
  offModal(evt) {
    evt.stopPropagation();
    if (this.state.show) {
      this.setState({
        show : false
      });
    }
  }

  render() {
    const {node} = this.props;
    const producer = node.producer || {};
    let locAddress = producer.loc_address;
    if (_.isEmpty(locAddress)) {
      locAddress = '';
    } else {
      locAddress = `(${locAddress})`;
    }
    return (
      <button type="button" onClick={this.onModal}>
        {`${node.prod_name} ${locAddress}`}
        {
          this.state.show ? <NodeInfoModal node={node} offModal={this.offModal}/> : null
        }
      </button>
    );
  }
}

export default NodeInfo;
