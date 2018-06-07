import React, {Component} from 'react';
import BpSummaryView from './BpSummaryView';

class BpSummary extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
  }

  render() {
    const {producer_name, org, nodes} = this.props;
    return (
      <BpSummaryView producer_name={producer_name} org={org} nodes={nodes}/>
    );
  }
}

export default BpSummary;
