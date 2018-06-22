import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import _ from 'lodash';

import VoteSearchProducerView from './VoteSearchProducerView';

import {vote} from '../redux/actions/eos';

import {vote2Stake} from '../utils/format';

import {get} from '../utils/eos';

const urllib = require('url');

const voteTrigger = vote.sagaTrigger;

class VoteSearchProducer extends React.Component {
  constructor(props, context) {
    super(props, context);

    let rows = [];
    const selected = [];
    const {producers, totalVoteWeight, handleSelected} = props;
    if (!_.isEmpty(producers)) {
      rows = this.getTableData(producers, totalVoteWeight || 1);
      _.each(props.producers, (producer, index) => {
        if (producer.selected === true) {
          selected.push(index);
        }
      });
    }
    this.state = {
      order : 'asc',
      orderBy : 'rank',
      selected : selected,
      changed : false,
      data : rows,
      page : 0,
      rowsPerPage : 50,
      countNew : 0,
      countRemove : 0,
      anchorOrigin : {vertical : 'bottom', horizontal : 'center'},
      openSnack : false,
      snackMessage : ''
    };

    this.isSelected = this.isSelected.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleMoveBpPage = this.handleMoveBpPage.bind(this);
    this.handleSnack = this.handleSnack.bind(this);

    handleSelected(null, this.getSelectedProducers(selected));
  }

  componentWillReceiveProps(nextProps) {
    const {producers, totalVoteWeight, handleSelected} = nextProps;

    let rows = [];
    const selected = [];
    if (!_.isEmpty(producers)) {
      rows = this.getTableData(producers, totalVoteWeight || 1);
      _.each(producers, (producer, index) => {
        if (producer.selected === true) {
          selected.push(index);
        }
        return null;
      });

      const selectedProducers = this.getSelectedProducers(selected, rows);
      handleSelected(null, selectedProducers);
      this.setState({data : rows, selected : selected, changed : false});
    }
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

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected : this.state.data.map((n) => n.id)});
      return;
    }
    this.setState({selected : []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const {summary} = this.props;
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
    const votedProducers = summary.voter_info.producers;
    const selectedProducers = this.getSelectedProducers(newSelected);
    const {countNew, countRemove} = this.getCountNewRemove(votedProducers, selectedProducers);
    let changed = true;
    if (countNew === 0 && countRemove === 0) {
      changed = false;
    }
    const numSelected = newSelected.length;
    const snackMessage = `${newSelected.length} block producer${numSelected > 1 ? ' s are' : ' is'} selected +${countNew}, -${countRemove}`;
    this.props.handleSelected(null, selectedProducers);
    this.setState({selected : newSelected, changed : changed, countNew : countNew, countRemove : countRemove, openSnack : true, snackMessage : snackMessage});
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

  handleSnack(openSnack) {
    this.setState({openSnack : openSnack});
  }

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

  getCountNewRemove(votedProducers, selectedProducers) {
    let countNew = 0;
    let countRemove = 0;
    let count = 0;
    _.forEach(selectedProducers, (selectedProducer) => {
      if (_.find(votedProducers, {owner : selectedProducer})) {
        count++;
      } else {
        countNew++;
      }
    });
    countRemove = votedProducers.length - count;
    return {countNew, countRemove};
  }

  render() {
    const {classes, handleVote} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page, changed, countNew, countRemove, anchorOrigin, openSnack, snackMessage} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <VoteSearchProducerView
        classes={classes}
        data={data}
        order={order}
        orderBy={orderBy}
        selected={selected}
        changed={changed}
        countNew={countNew}
        countRemove={countRemove}
        rowsPerPage={rowsPerPage}
        page={page}
        emptyRows={emptyRows}
        isSelected={this.isSelected}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        handleClick={this.handleClick}
        handleSelectAllClick={this.handleSelectAllClick}
        handleRequestSort={this.handleRequestSort}
        handleShuffle={this.handleShuffle}
        handleVote={handleVote}
        handleMoveBpPage={this.handleMoveBpPage}
        anchorOrigin={anchorOrigin}
        openSnack={openSnack}
        handleSnack={this.handleSnack}
        snackMessage={snackMessage}
      />
    );
  }
}

VoteSearchProducer.propTypes = {
  eosAccount : PropTypes.string,
  producers : PropTypes.array
};

function mapStateToProps(state) {
  return {
    // producers : state.eos.producers || []
  };
}

export default connect(mapStateToProps, {voteTrigger})(VoteSearchProducer);

