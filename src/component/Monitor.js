import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startStats} from '../redux/actions/stats';
import MonitorView from './MonitorView';

class Monitor extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    // console.log('Monitor start');
    this.props.startStats();
  }

  render() {
    return (
      <MonitorView/>
    );
  }
}

export default connect(null, {startStats})(Monitor);
