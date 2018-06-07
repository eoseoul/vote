import React from 'react';

import BpSummary from './BpSummary';
import styles from '../styles/content.module.css';

const BpView = (props) => {
  const {bpInfo} = props;
  const {producer_name, org, nodes} = bpInfo;
  return (
    <div className={styles.content}>
      <BpSummary producer_name={producer_name} org={org} nodes={nodes} />
    </div>
  );
};

export default BpView;
