import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRoot} from '../utils/Hoc';
import {startStats} from '../redux/actions/stats';

class DashBoard extends Component {
  componentWillMount() {
    console.log('start');
    this.props.startStats();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div>
        dashBoard
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chainInfo : state.stats.chainInfo,
    nodes : state.stats.nodes
  };
}

export default connect(mapStateToProps, {startStats})(withRoot(DashBoard));
