import React, {Component} from 'react';
import {connect} from 'react-redux';
import VoteView from './VoteView';

class Vote extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <VoteView/>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(Vote);
