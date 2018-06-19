import React from 'react';
import NodeInfo from './NodeInfo';
import Avatar from '@material-ui/core/Avatar';
import styles from '../styles/PnTable.module.css';
import _ from "lodash";

const NpTr = (props) => {

  const {node} = props;
  let latency = node.latency;
  let statusStyle = '';

  const producer = node.producer || {};
  let locAddress = producer.loc_address;
  if (_.isEmpty(locAddress)) {
    locAddress = '';
  } else {
    locAddress = `${locAddress.charAt(0).toUpperCase()}`;
  }

  let avatarFirstCapital = (node.prod_name.charAt(0).toUpperCase()) + (locAddress);

  switch (node.status) {
    case 3:
      statusStyle = styles.disconnected;
      break;
    case 2:
      statusStyle = styles.disconnected;
      break;
    default:
      if (latency > 0 && latency <= 500) {
        statusStyle = styles.connected;
      } else if (latency > 500 && latency < 1000) {
        statusStyle = styles.delay;
      } else {
        statusStyle = styles.delayed;
      }
  }

  if (latency < 0 || statusStyle === styles.disconnected) {
    latency = null;
  }
  return (
    <tr className={statusStyle}>
      <td>{props.idx}</td>
      <td>
        <i>
          { producer.logo ?
            <Avatar className={styles.avatarIcon} alt={`${node.prod_name} ${locAddress}`} src={`${producer.logo}`} />
            :
            <Avatar className={styles.avatarIcon}>{`${avatarFirstCapital}`}</Avatar>
          }
        </i>
        <NodeInfo node={node}/>
      </td>
      <td></td>
      <td><span>{latency ? latency : '--'}</span> ms</td>
      <td></td>
      <td>{node.block_num > 0 ? node.block_num : '--'}</td>
    </tr>
  );
};

const NpTable = (props) => (
  <div className={styles.table}>
    <div className={styles.table__title_area}>Non Producing <strong>Nodes</strong></div>
    <div className={styles.table__body_area}>
      <table>
        <caption>display non producing nodes</caption>
        <colgroup>
          <col width="5.844%"/>
          <col width="37.9%"/>
          <col width="10.62%"/>
          <col width="16.248%"/>
          <col width="13.22%"/>
          <col width="16.167%"/>
        </colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>BlockProducer</th>
            <th></th>
            <th>Latency</th>
            <th></th>
            <th>Latest Block</th>
          </tr>
        </thead>
        <tbody>
          {
            props.nodes &&
            props.nodes.map(
              (node, idx) => (
                <NpTr
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

    <div className={styles.table__body_caption}>
      <ul>
        <li className={styles.connected}>Less than <span>500ms</span></li>
        <li className={styles.delay}>Less then <span>1,000ms</span></li>
        <li className={styles.delayed}>more than <span>1,000ms</span></li>
        <li className={styles.disconnected}>connection <span>fail</span> or <span>incorrect</span> api address</li>
      </ul>
    </div>
  </div>
);

export default NpTable;
