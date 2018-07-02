import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

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
import Avatar from '@material-ui/core/Avatar';

import SnackbarView from './SnackbarView';

import {fromCoin, fromVotingScale} from '../utils/format';

import styles from '../styles/voteCard.module.css';

const columnData = [
  {id : 'rank', numeric : false, disablePadding : true, label : 'Rank'},
  {id : 'name', numeric : false, disablePadding : false, label : 'Block Producer'},
  {id : 'totalStaked', numeric : false, disablePadding : false, label : 'Total Vote'},
  {id : 'ratio', numeric : false, disablePadding : false, label : 'Ratio (%)'},
  {id : 'url', numeric : false, disablePadding : false, label : 'Url'}
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
              style={{textAlign : 'center', padding : '4px 20px 4px 20px'}}
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
  const {classes, handleVote} = props;
  return (
    <Toolbar
      className={classNames(classes.root, {[classes.highlight] : false})}
    >
      <div className={classes.title}>
        <div className={styles.vote__head}><div className={styles.vote__head_title} id="tableTitle"><h2>Block<strong>Producer </strong></h2></div></div>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button variant="raised" onClick={handleVote} className={styles.vote__button}> Vote </Button>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes : PropTypes.object.isRequired,
  numSelected : PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

let EnhancedTableToolbarFooter = (props) => {
  const {numSelected, classes, handleVote, countNew, countRemove} = props;
  return (
    <Toolbar
      className={classNames(classes.root, {[classes.highlight] : false})}
    >
      <div className={classes.title}>
        <Typography color="inherit" variant="subheading">
          {numSelected} block producer{numSelected > 1 ? ' s are' : ' is'} selected +{countNew}, -{countRemove}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button variant="raised" onClick={handleVote} className={styles.vote__button}> Vote </Button>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbarFooter.propTypes = {
  classes : PropTypes.object.isRequired,
  numSelected : PropTypes.number.isRequired
};

EnhancedTableToolbarFooter = withStyles(toolbarStyles)(EnhancedTableToolbarFooter);

const muiStyles = (theme) => ({
  root : {
    width : '100%'
  },
  tableWrapper : {
    overflowX : 'auto'
  }
});

const VoteSearchProducerView = (props) => {
  const {classes, data, order, orderBy, selected, rowsPerPage, page, changed, countNew, countRemove} = props;
  const {isSelected, handleChangePage, handleChangeRowsPerPage, handleClick, handleRequestSort, handleVote, handleShuffle, handleMoveBpPage} = props;
  return (
    <div className={styles.card}>
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} handleVote={handleVote} handleShuffle={handleShuffle} changed={changed} countNew={countNew} countRemove={countRemove}/>
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
                const avatarFirstCapital = (n.producer.owner.charAt(0).toUpperCase());
                const location = _.isEmpty(n.producer.location) === true ? '' : `(${n.producer.location})`;
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
                    <TableCell style={{textAlign : 'center', padding : '4px 0px 4px 0px'}}>{n.rank}</TableCell>
                    <TableCell style={{padding : '4px 0px 4px 0px'}}>
                      <Button variant="flat" disableRipple style={{textTransform : 'none'}} onClick={() => handleMoveBpPage(n.producer)} target="_blank" rel="noopener noreferrer">
                        <i style={{marginRight : '15px'}}>
                          { n.producer.logo ?
                            <Avatar className={styles.avatarIcon} alt={avatarFirstCapital} src={n.producer.logo} />
                            :
                            <Avatar className={styles.avatarIcon}>{avatarFirstCapital}</Avatar>
                          }
                        </i>
                        <div style={{textAlign : 'left'}}>
                          {n.name}
                          {location && <Typography variant="caption"> {location} </Typography>}
                        </div>
                      </Button>
                    </TableCell>
                    <TableCell numeric style={{padding : '4px 10px 4px 10px'}}>{fromCoin(n.totalStaked)}</TableCell>
                    <TableCell numeric style={{padding : '4px 10px 4px 10px'}}>{fromVotingScale(n.ratio)}</TableCell>
                    <TableCell numeric style={{padding : '4px 10px 4px 10px'}}>
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
        <EnhancedTableToolbarFooter numSelected={selected.length} handleVote={handleVote} handleShuffle={handleShuffle} countNew={countNew} countRemove={countRemove}/>
      </Paper>
      <SnackbarView anchorOrigin={props.anchorOrigin} openSnack={props.openSnack} handleSnack={props.handleSnack} snackMessage={props.snackMessage} />
    </div>
  );
};

VoteSearchProducerView.propTypes = {
  classes : PropTypes.object.isRequired
};

export default withStyles(muiStyles)(VoteSearchProducerView);
