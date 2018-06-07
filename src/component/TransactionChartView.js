
import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

// 아래는 급히 만든건데요, 우선 정해진 round 동안 발생한 transaction이 담기면 될 것 같습니다.
// data만 바꿔치기 하면 되고 datasets의 data 에 해당하는 value만 변경되면 됩니다.

const options = {
  legend : {
    display : false
  },
  scales : {
    yAxes : [{
      ticks : {
        beginAtZero : true
      },
      gridLines : {
        color : 'rgba(0,0,0,0)'
      }
    }],
    xAxes : [{
      gridLines : {
        color : 'rgba(0,0,0,0)'
      }
    }]
  }
};


class TransactionChartView extends Component {
//  setTimeout 으로 업데이트 되는것 넣어둘 것
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <Bar data={this.props.data} options={options}/>
    );
  }
}

export default TransactionChartView;
