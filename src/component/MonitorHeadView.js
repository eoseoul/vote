import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import styles from '../styles/MonitorHead.module.css';

const ContactTooltip = () => (
  <Tooltip className={styles.tooltips} title="email : eoseoul@neowiz.com">
    <Button type="button" className={styles.head_buttonContact}>contact</Button>
  </Tooltip>
);

const MonitorHead = (props) => (
  <div className={styles.head}>
    <div className={styles.head_title}>
      <h2>Vote <strong>EOStat</strong></h2>
    </div>
    <div className={styles.head_version}>
      <dl>
        <dt>Version</dt>
        <dd>{props.server_version}</dd>
      </dl>
    </div>
    <div className={styles.head_currentbp}>
      <dl>
        <dt>Current Block Producer</dt>
        <dd>{props.head_block_producer}</dd>
      </dl>
    </div>
    <ContactTooltip/>
  </div>
);

export default MonitorHead;
