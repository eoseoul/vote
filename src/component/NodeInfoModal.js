import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';
import styles from '../styles/NodeInfoModal.module.css';

class NodeInfoModal extends Component {
  handleClickOutside = (evt) => {
    this.props.offModal(evt);
  };
  render() {
    const {
      node
    } = this.props;
    const website = node.producer ? node.producer.address : '';
    const email = node.producer ? node.producer.email : '';
    return (
      <div className={styles.modal}>
        <b>{node.prod_name}</b><br/>
        Website : {website}<br/>
        Email : {email}
      </div>
    );
  }
}

export default onClickOutside(NodeInfoModal);
