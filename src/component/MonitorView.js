import React from 'react';
// import Popover from 'material-ui/Popover';
import contentStyles from '../styles/content.module.css';
import styles from '../styles/Monitor.module.css';
import GoogleMapContainer from './GoogleMapContainer';
import MonitorHead from './MonitorHead';
import Panel from './Panel';
import Chart from './ChartView';
import NodeInfoTable from './NodeInfoTable';
// import TransactionChartView from './TransactionChartView';

const MonitorView = () => (
  <div className={contentStyles.content}>
    <div className={styles.content}>
      <MonitorHead/>
      <div className={styles.dashBoard}>
        <Panel/>
        <Chart/>
      </div>
      <div className={styles.map}>
        <GoogleMapContainer/>
      </div>
      <NodeInfoTable/>
    </div>
  </div>
);

export default MonitorView;
