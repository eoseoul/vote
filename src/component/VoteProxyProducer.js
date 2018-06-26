import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import VoteProxyProducerView from './VoteProxyProducerView';

import {vote2Stake} from '../utils/format';
import {get} from '../utils/eos';

const urllib = require('url');

class VoteSearchProducer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order : 'asc',
      orderBy : 'rank',
      data : this.getTableData(props.producers, props.totalVoteWeight || 1),
      page : 0,
      rowsPerPage : 30
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleMoveBpPage = this.handleMoveBpPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {producers, totalVoteWeight} = nextProps;
    this.setState({data : this.getTableData(producers, totalVoteWeight || 1)});
  }


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({data, order, orderBy});
  };

  handleClick = (event, id) => {
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage : event.target.value});
  };

  handleShuffle() {
    const {producers, totalVoteWeight} = this.props;
    this.setState({data : this.getTableData(_.shuffle(producers), totalVoteWeight || 1), selected : []});
  }

  handleMoveBpPage(producer) {
    const bpInfoUrl = urllib.resolve(producer.url, 'bp.json');

    get(bpInfoUrl).then((data) => {
      if (!_.isEmpty(data)) {
        this.props.history.push('/bp', {bpInfo : data, producer : producer});
      }
    }).catch((err) => {
      this.props.history.push('/bp', {producer : producer});
    });
  }

  getTableData(producers, totalVoteWeight) {
    return _.map(producers, (producer, index) => this.createData(
      index,
      producer.owner,
      producer.ranking,
      vote2Stake(producer.total_votes),
      producer.url,
      producer.total_votes / totalVoteWeight,
      producer
    ));
  }

  createData(_counter, name, rank, totalStaked, url, ratio, producer) {
    return {id : _counter, name, rank, totalStaked, url, ratio, producer};
  }

  render() {
    const {classes} = this.props;
    const {data, order, orderBy, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <VoteProxyProducerView
        classes={classes}
        data={data}
        order={order}
        orderBy={orderBy}
        rowsPerPage={rowsPerPage}
        page={page}
        emptyRows={emptyRows}
        handleClick={this.handleClick}
        handleRequestSort={this.handleRequestSort}
        handleMoveBpPage={this.handleMoveBpPage}
      />
    );
  }
}

VoteSearchProducer.propTypes = {
  producers : PropTypes.array
};

function mapStateToProps(state) {
  return {
    // producers : state.eos.producers || []
  };
}

export default connect(mapStateToProps, {})(VoteSearchProducer);

