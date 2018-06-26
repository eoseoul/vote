import React, {Component} from 'react';

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

export default VoteProxyControl;
