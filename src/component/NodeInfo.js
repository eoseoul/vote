import React, {Component} from 'react';
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
    const {
      node
    } = this.props;
    return (
      <button type="button" onClick={this.onModal}>
        {`${node.prod_name} ${node.producer ? `(${node.producer.loc_address})` : ''}`}
        {
          this.state.show ? <NodeInfoModal node={node} offModal={this.offModal}/> : null
        }
      </button>
    );
  }
}

export default NodeInfo;
