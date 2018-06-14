import React from 'react';
import styles from '../styles/Chart.module.css';
import TransactionChart from './TransactionChart';
import icon from '../static/images/dashboard__icon--transactions.png';

const Chart = () => (
  <div className={styles.graph}>
    <img src={icon} alt=""/>
    <h3>Transactions <font style={{fontSize : 'small'}}> trx / round </font></h3>
    <div className={styles.graph__content}>
      <TransactionChart/>
    </div>
  </div>
);

export default Chart;
