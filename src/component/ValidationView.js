import React from 'react';
import styles from '../styles/Validation.module.css';

const ValidationView = (props) => (
  <div className={styles.validation}>
    <div className={styles.validation__head}>
      <div className={styles.validation__head_title}>
        <h2><strong>Validation</strong></h2>
      </div>
    </div>
    <div className={styles.validation__content}>
      <ul>
        <li>
          <div>1. Download the nodeos_script file.</div>
          <div>
            <button type="button" onClick={props.handleDownloadScript}>download</button>
          </div>
          <div> Shell> wget {props.downloadUrl} -O eoseoul_node.zip </div>
          <div> Shell> unzip eoseoul_node.zip </div>
          <p/>
        </li>
        <li>
          <div>2. modify the private keys in the ./data/config.ini file.</div>
          <div> Shell> vi ./data/config.ini </div>
          <p/>
        </li>
        <li>
          <div>3. Run nodeos.sh script.</div>
          <div>Shell> ./nodeos.sh start </div>
          <p/>
        </li>
        <li>
          <div>4. Check block sync status.</div>
          <div>Shell> tail -f data/stderr.txt </div>
          <br/>
          <p/>
        </li>
        <li>
          <div>5. Run producer.sh script.</div>
          <div>Shell> ./producer.sh </div>
          <p/>
        </li>
      </ul>
      <address>
        need any help?<br/>
        email : <a href="mailto:eoseoul.dev@neowiz.com">eoseoul.dev@neowiz.com</a><br/>
        telegram : <a href="http://t.me/eoseoul_testnet" target="_blank" rel="noopener noreferrer">http://t.me/eoseoul_testnet</a><br/>
        business hour : UTC 18:00 - UTC 03:00
      </address>
    </div>
  </div>
);

export default ValidationView;
