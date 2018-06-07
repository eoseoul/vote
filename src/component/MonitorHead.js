import React, {Component} from 'react';
import MonitorHeadView from './MonitorHeadView';
import {connect} from 'react-redux';

class MonitorHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head_block_producer : '',
      server_version : ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      head_block_producer,
      server_version
    } = nextProps.chainInfo;
    this.setState({
      head_block_producer,
      server_version
    });
  }

  render() {
    const {
      head_block_producer,
      server_version
    } = this.state;
    return (
      <MonitorHeadView
        head_block_producer={head_block_producer}
        server_version={server_version}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    chainInfo : state.stats.chainInfo
  };
}

export default connect(mapStateToProps, {})(MonitorHead);
