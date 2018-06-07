import React, {Component} from 'react';
import MonitorView from './MonitorView';

class Monitor extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    console.log('Monitor start');
  }


  render() {
    return (
      <MonitorView/>
    );
  }
}

export default Monitor;
