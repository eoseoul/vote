import React, {Component} from 'react';
import {connect} from 'react-redux';
import TransactionChartView from './TransactionChartView';

class TransactionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {
        labels : [1, 2, 3, 4, 5, 6, 7],
        datasets : [
          {
            label : 'My First dataset',
            fillColor : 'rgba(220,220,220,0.5)',
            strokeColor : 'rgba(220,220,220,0.8)',
            highlightFill : 'rgba(220,220,220,0.75)',
            highlightStroke : 'rgba(220,220,220,1)',
            data : [65, 59, 80, 81, 56, 55, 1000]
          }
        ]
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      roundStats
    } = nextProps;
    const labels = [];
    const _data = [];
    for (let i = 0; i < roundStats.length; i++) {
      labels.push(roundStats[i].round_num);
      _data.push(roundStats[i].trx_sum);
    }
    const data = {
      labels : labels,
      datasets : [
        {
          fillColor : 'rgba(220,220,220,0.5)',
          strokeColor : 'rgba(220,220,220,0.8)',
          highlightFill : 'rgba(220,220,220,0.75)',
          highlightStroke : 'rgba(220,220,220,1)',
          data : _data
        }
      ]
    };
    this.setState({
      data : data
    });
  }
  render() {
    return (
      <
        TransactionChartView data={this.state.data}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    roundStats : state.stats.roundStats
  };
}

export default connect(mapStateToProps, {})(TransactionChart);
