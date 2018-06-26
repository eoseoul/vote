import React from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

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
  const {classes} = props;
  return (
    <Toolbar>
      <div className={classes.title}>
        <div className={styles.vote__head}><div className={styles.vote__head_title} id="tableTitle"><h2>Voted Block Producer<strong> By eoseouldotio</strong></h2></div></div>
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
  const {handleClick, handleRequestSort, handleMoveBpPage} = props;
  return (
    <div className={styles.card}>
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody className={styles.datatable_body}>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                const avatarFirstCapital = (n.producer.owner.charAt(0).toUpperCase());
                return (
                  <TableRow hover onClick={(event) => handleClick(event, n.id)} tabIndex={-1} key={n.id} >
                    <TableCell style={{textAlign : 'center', padding : '4px 10px 4px 10px'}}>{n.rank}</TableCell>
                    <TableCell style={{padding : '4px 10px 4px 10px'}}>
                      <Button variant="flat" disableRipple style={{textTransform : 'none'}} onClick={() => handleMoveBpPage(n.producer)} target="_blank" rel="noopener noreferrer">
                        <i style={{marginRight : '15px'}}>
                          { n.producer.logo ?
                            <Avatar className={styles.avatarIcon} alt={avatarFirstCapital} src={n.producer.logo} />
                            :
                            <Avatar className={styles.avatarIcon}>{avatarFirstCapital}</Avatar>
                          }
                        </i>
                        <div>
                          {n.name}
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
      </Paper>
    </div>
  );
};

VoteSearchProducerView.propTypes = {
  classes : PropTypes.object.isRequired
};

export default withStyles(muiStyles)(VoteSearchProducerView);
