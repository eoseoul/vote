import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import VotedProducerView from './VotedProducerView';

import {vote} from '../redux/actions/eos';

import {vote2Stake} from '../utils/format';
import {get} from '../utils/eos';

const urllib = require('url');

const voteTrigger = vote.sagaTrigger;

class VotedProducer extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {summary, totalVoteWeight, handleSelected} = props;
    let rows = [];
    let selected = [];
    if (!_.isEmpty(summary.voter_info) && !_.isEmpty(summary.voter_info.producers)) {
      rows = this.getTableData(summary.voter_info.producers, totalVoteWeight || 1);
      selected = _.map(rows, (row, index) => index);
    }

    this.state = {
      order : 'asc',
      orderBy : 'rank',
      selected : selected,
      data : rows,
      page : 0,
      rowsPerPage : 25
    };

    this.isSelected = this.isSelected.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleMoveBpPage = this.handleMoveBpPage.bind(this);

    handleSelected(this.getSelectedProducers(selected), null);
  }

  componentWillReceiveProps(nextProps) {
    const {summary, totalVoteWeight, handleSelected} = nextProps;
    let rows = [];
    let selected = [];
    if (!_.isEmpty(summary.voter_info) && !_.isEmpty(summary.voter_info.producers)) {
      rows = this.getTableData(summary.voter_info.producers, totalVoteWeight || 1);
      selected = _.map(rows, (row, index) => index);
    }
    handleSelected(this.getSelectedProducers(selected, rows), null);
    this.setState({data : rows, selected : selected});
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

  handleMoveBpPage(producer) {
    let bpInfoUrl = urllib.resolve(producer.url, 'bp.json');

    get(bpInfoUrl).then((data) => {
      if (!_.isEmpty(data)) {
        this.props.history.push('/bp', {bpInfo : data, producer : producer});
      }
    }).catch((err) => {
      this.props.history.push('/bp', {producer : producer});
    });
  }

  handleSelectAllClick = (event, checked) => {
    let newSelected = [];
    if (checked) {
      newSelected = this.state.data.map((n) => n.id);
      this.setState({selected : newSelected});
      return;
    }
    this.props.handleSelected(this.getSelectedProducers(newSelected), null);
    this.setState({selected : newSelected});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.props.handleSelected(this.getSelectedProducers(newSelected), null);
    this.setState({selected : newSelected});
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage : event.target.value});
  };

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }

  getSelectedProducers(newSelected, _data) {
    const data = _data || this.state.data;
    const selectedNames = _.map(newSelected, (index) => data[index].name);
    return selectedNames;
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
    const {classes, handleVote} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <VotedProducerView
        classes={classes}
        data={data}
        order={order}
        orderBy={orderBy}
        selected={selected}
        rowsPerPage={rowsPerPage}
        page={page}
        emptyRows={emptyRows}
        isSelected={this.isSelected}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        handleClick={this.handleClick}
        handleSelectAllClick={this.handleSelectAllClick}
        handleRequestSort={this.handleRequestSort}
        handleVote={handleVote}
        handleMoveBpPage={this.handleMoveBpPage}
      />
    );
  }
}

VotedProducer.propTypes = {
  eosAccount : PropTypes.string.isRequired,
  summary : PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {voteTrigger})(VotedProducer);
