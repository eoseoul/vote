import React from 'react';

import Grid from '@material-ui/core/Grid';

import NodeInfo from './NodeInfo';
import styles from '../styles/PnTable.module.css';
const moment = require('moment');

const image_path = (filename) => (
  require(`../static/images/${filename}`)
);

const PnTr = (props) => {
  const {node} = props;
  let latency = node.latency;
  let statusStyle = '';
  switch (node.status) {
    case 3:
      statusStyle = styles.disconnected;
      break;
    case 2:
      statusStyle = styles.disconnected;
      break;
    default:
      if (latency <= 0) {
        statusStyle = styles.invalidate;
      } else if (latency <= 500) {
        statusStyle = styles.connected;
      } else if (latency > 500 && latency < 1000) {
        statusStyle = styles.delay;
      } else {
        statusStyle = styles.delayed;
      }
  }
  if (node.is_genesis === true) {
    statusStyle = styles.connected;
  }

  const imgSrc = props.imgSrc ? image_path(props.imgSrc) : null;
  const timeDiff = moment(props.head_block_time).diff(moment(node.timestamp), 'seconds');

  if (latency < 0) {
    latency = null;
  }
  return (
    <tr className={statusStyle}>
      <td>{props.idx}</td>
      <td><i><img src={imgSrc} alt=""/></i>
        <NodeInfo node={node}/>
      </td>
      <td><span>{latency ? latency : '--'}</span> ms</td>
      <td>{timeDiff >= 0 ? `${timeDiff} sec` : '--'}</td>
      <td>{node.block_num > 0 ? node.block_num : '--'}</td>
      <td>{node.irreversible_block_num > 0 ? node.irreversible_block_num : '--'}</td>
    </tr>
  );
};

const PnTable = (props) => (
  <div className={styles.table}>
    <Grid container >
      <Grid item xs={3}>
        <div className={styles.table__title_area}>Block <strong>Producers</strong> </div>
      </Grid>
    </Grid>
    <div className={styles.table__body_area}>
      <table>
        <caption>display block producers</caption>
        <colgroup>
          <col width="5.844%"/>
          <col width="32.9%"/>
          <col width="17.748%"/>
          <col width="12.12%"/>
          <col width="14.72%"/>
          <col width="16.667%"/>
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>BlockProducer</th>
            <th>Latency</th>
            <th>Produced</th>
            <th>Latest Block</th>
            <th>Irreversible Block</th>
          </tr>
        </thead>
        <tbody>
          {
            props.nodes &&
            props.nodes.map(
              (node, idx) => (
                <PnTr
                  head_block_time={props.head_block_time}
                  node={node}
                  idx={node.producer.ranking}
                  key={idx}
                />
              )
            )
          }
        </tbody>
      </table>
    </div>
  </div>
);

export default PnTable;
