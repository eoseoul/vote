import React from 'react';
// import Popover from 'material-ui/Popover';
import styles from '../styles/PanelView.module.css';

const image_path = (filename) => (
  require(`../static/images/${filename}`)
);

const PanelCell = (props) => (
  <li className={styles.panel__list}>
    <img src={image_path(`dashboard__icon--${props.iconName}.png`)} alt=""/>
    <dl>
      <dt>
        {props.children}
      </dt>
      <dd>{props.value}</dd>
    </dl>
  </li>
);

const Panel = (props) => (
  <div className={styles.panel}>
    <ul>
      <PanelCell
        iconName="latestBlock"
        value={props.head_block_num}
      >
        <p>Latest <strong>Block</strong></p>
      </PanelCell>
      <PanelCell
        iconName="irreversibleBlock"
        value={props.last_irreversible_block_num}
      >
        <p>Irreversible <strong>Block</strong></p>
      </PanelCell>
      <PanelCell
        iconName="producingNode"
        value={props.producing_node}
      >
        <p>Producing <strong>Node</strong></p>
      </PanelCell>
      <PanelCell
        iconName="nonProducingNode"
        value={props.non_producing_node}
      >
        <p>Non Producing <strong>Node</strong></p>
      </PanelCell>
    </ul>
  </div>
);

export default Panel;
