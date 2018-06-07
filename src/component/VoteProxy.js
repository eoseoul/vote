import React, {Component} from 'react';
import {connect} from 'react-redux';
import VoteProxyView from './VoteProxyView';

class VoteProxy extends Component {
  render() {
    return (
      <VoteProxyView/>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(VoteProxy);
