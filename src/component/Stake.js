import React, {Component} from 'react';
import StakeView from './StakeView';

class Stake extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    console.log('Stake');
  }


  render() {
    return (
      <StakeView/>
    );
  }
}

export default Stake;
