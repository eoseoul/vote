import React, {Component} from 'react';
import _ from 'lodash';

import BpView from './BpView';
// import bpinfo from './bp_info.js';

class Bp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const {history} = this.props;
    const {location} = history;
    const state = location.state;

    let {bpInfo, producer} = state;
    if (_.isEmpty(bpInfo)) {
      bpInfo = {
        producer_name : producer.owner,
        org : {
          website : producer.url,
          branding : {}
        },
        nodes : []
      };
    }
    this.setState({bpInfo : bpInfo, producer : producer});
  }

  render() {
    const {bpInfo, producer} = this.state;
    return (
      <BpView bpInfo={bpInfo} producer={producer}/>
    );
  }
}

export default Bp;
