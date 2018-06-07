import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import styles from '../styles/voteCard.module.css';
import Tooltip from '@material-ui/core/Tooltip';

import {fromCoin, fromVotingScale} from '../utils/format';

const columnData = [
  {id : 'rank', numeric : true, disablePadding : false, label : 'rank'},
  {id : 'name', numeric : false, disablePadding : false, label : 'Block Producer'},
  {id : 'totalStaked', numeric : true, disablePadding : false, label : 'Total Vote'},
  {id : 'ratio', numeric : true, disablePadding : false, label : 'ratio (%)'},
  {id : 'url', numeric : false, disablePadding : false, label : 'url'}
];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy} = this.props;
    return (
      <TableHead>
        <TableRow>
          {columnData.map((column) => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
              className={styles.tableBackgroundColor}
            >
              <Tooltip title="Sort" placement={column.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300} >
                <TableSortLabel active={orderBy === column.id} direction={order} onClick={this.createSortHandler(column.id)} >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort : PropTypes.func.isRequired,
  order : PropTypes.string.isRequired,
  orderBy : PropTypes.string.isRequired
};

const toolbarStyles = (theme) => ({
  root : {
    paddingRight : theme.spacing.unit
  },
  highlight :
    theme.palette.type === 'light'
      ? {
        color : 'rgba(129, 123, 159, 1)',
        backgroundColor : 'rgba(201, 192, 249, 0.3)'
      }
      : {
        color : 'rgba(255, 255, 255, 1)',
        backgroundColor : 'rgba(67, 64, 83, 0.8)'
      },
  spacer : {
    flex : '1 1 100%'
  },
  actions : {
    color : theme.palette.text.secondary
  },
  title : {
    flex : '0 0 auto'
  }
});

let EnhancedTableToolbar = (props) => {
  const {numSelected, classes, handleShuffle} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight] : numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} block producer{numSelected === 1 ? ' is' : 's are'} selected
            <Button> Undo </Button>
          </Typography>
        ) : (
          <div className={styles.vote__head}><div className={styles.vote__head_title} id="tableTitle"><h2>Block<strong>Producer </strong></h2></div></div>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button variant="outlined" onClick={handleShuffle} className={styles.vote__button}> Shuffle </Button>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes : PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const muiStyles = (theme) => ({
  root : {
    width : '100%'
  },
  tableWrapper : {
    overflowX : 'auto'
  }
});

const VoteSearchProducerView = (props) => {
  const {classes, data, order, orderBy, rowsPerPage, page} = props;
  const {handleChangePage, handleChangeRowsPerPage, handleClick, handleRequestSort, handleShuffle, handleMoveBpPage} = props;
  return (
    <div className={styles.card}>
      <Paper className={classes.root}>
        <EnhancedTableToolbar handleShuffle={handleShuffle} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                return (
                  <TableRow hover onClick={(event) => handleClick(event, n.id)} tabIndex={-1} key={n.id} >
                    <TableCell numeric>{n.rank}</TableCell>
                    <TableCell component="th" scope="row"> {n.name} </TableCell>
                    <TableCell numeric>{fromCoin(n.totalStaked)}</TableCell>
                    <TableCell numeric>{fromVotingScale(n.ratio)}</TableCell>
                    <TableCell numeric>
                      <Button variant="flat" disableRipple style={{textTransform : 'none'}} onClick={() => handleMoveBpPage(n.producer)} target="_blank" rel="noopener noreferrer"> {n.url} </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label' : 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label' : 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

VoteSearchProducerView.propTypes = {
  classes : PropTypes.object.isRequired
};

export default withStyles(muiStyles)(VoteSearchProducerView);
