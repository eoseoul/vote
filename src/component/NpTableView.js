import React from 'react';
import NodeInfo from './NodeInfo';
import styles from '../styles/PnTable.module.css';

const image_path = (filename) => (
  require(`../static/images/${filename}`)
);

const NpTr = (props) => {
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
  const imgSrc = props.imgSrc ? image_path(props.imgSrc) : null;
  if (latency < 0) {
    latency = null;
  }
  return (
    <tr className={statusStyle}>
      <td>{props.idx}</td>
      <td><i><img src={imgSrc} alt=""/></i>
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
          <col width="32.9%"/>
          <col width="12.12%"/>
          <col width="17.748%"/>
          <col width="14.72%"/>
          <col width="16.667%"/>
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
  </div>
);

export default NpTable;
