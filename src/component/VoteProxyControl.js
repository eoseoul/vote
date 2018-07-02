import React, {Component} from 'react';
import PropTypes from 'prop-types';

import VoteProxyControlView from './VoteProxyControlView';

class VoteProxyControl extends Component {
  /*
   constructor(props) {
     super(props);
   }
  */

  componentWillMount() {
  }

  render() {
    const {handleProxy, proxyAccount, checked} = this.props;
    return (
      <VoteProxyControlView handleProxy={handleProxy} proxyAccount={proxyAccount} checked={checked} />
    );
  }
}

VoteProxyControl.propTypes = {
  handlProxy : PropTypes.object,
  proxyAccount : PropTypes.object,
  checked : PropTypes.bool
};

export default VoteProxyControl;
