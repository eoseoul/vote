import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import styles from '../styles/voteCard.module.css';
import {fromCoin, fromVotingScale} from '../utils/format';

const columnData = [
  {id : 'rank', numeric : true, disablePadding : false, label : 'rank'},
  {id : 'name', numeric : false, disablePadding : true, label : 'Block Producer'},
  {id : 'totalStaked', numeric : false, disablePadding : false, label : 'Total Vote'},
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
          <TableCell padding="checkbox" className={styles.tableBackgroundColor}>
          </TableCell>
          {columnData.map((column) => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
              className={styles.tableBackgroundColor}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
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
    paddingRight : theme.spacing.unit * 2,
    marginBottom : 10
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
  const {numSelected, classes, data, handleVote} = props;
  const flag = numSelected < data.length;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight] : flag
      })}
    >
      <div className={classes.title}>
        {flag ? (
          <Typography color="inherit" variant="subheading">
            {data.length - numSelected} block producer{data.length - numSelected === 1 ? ' is' : 's are'} deselected
          </Typography>
        ) : (
          <div className={styles.vote__head}><div className={styles.vote__head_title} id="tableTitle"><h2>Voted <strong>BlockProducer </strong></h2></div></div>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button variant="outlined" onClick={handleVote} className={styles.vote__button}> Update </Button>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes : PropTypes.object.isRequired,
  numSelected : PropTypes.number.isRequired
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

const VotedProducerView = (props) => {
  const {classes, data, order, orderBy, selected, rowsPerPage, page} = props;
  const {isSelected, handleChangePage, handleChangeRowsPerPage, handleClick, handleRequestSort, handleVote, handleMoveBpPage} = props;
  return (
    <div className={styles.card}>
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} data={data} handleVote={handleVote} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody className={styles.datatable_body}>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                const _isSelected = isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={_isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={_isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={_isSelected} className={styles.checkboxColor} />
                    </TableCell>
                    <TableCell style={{textAlign: 'center'}}>{n.rank}</TableCell>
                    {/*<TableCell component="th" scope="row" padding="none"> {n.name} </TableCell>*/}
                    {/*<TableCell padding="none"> {n.name} </TableCell>*/}
                    <TableCell padding="none">
                      <Button variant="flat" disableRipple style={{textTransform : 'none'}} onClick={() => handleMoveBpPage(n.producer)} target="_blank" rel="noopener noreferrer"> {n.name} </Button>
                    </TableCell>
                    <TableCell padding="none" numeric>{fromCoin(n.totalStaked)}</TableCell>
                    <TableCell numeric>{fromVotingScale(n.ratio)}</TableCell>
                    {/*<TableCell numeric>
                      <Button variant="flat" disableRipple style={{textTransform : 'none'}} onClick={() => handleMoveBpPage(n.producer)} target="_blank" rel="noopener noreferrer"> {n.url} </Button>
                    </TableCell>*/}
                    <TableCell numeric>
                      {/*<Button variant="flat" disableRipple style={{textTransform : 'none'}} onClick={() => handleMoveBpPage(n.producer)} target="_blank" rel="noopener noreferrer"> {n.url} </Button>*/}
                      <a href={n.url} target="_blank" rel="noopener noreferrer" title={`Move to ${n.name} url.`}> {n.url} </a>
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
          rowsPerPageOptions={[25, 50, 100]}
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

VotedProducerView.propTypes = {
  classes : PropTypes.object.isRequired
};

export default withStyles(muiStyles)(VotedProducerView);
