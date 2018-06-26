import React from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import contentStyles from '../styles/content.module.css';
import VoteState from './VoteState';
import VoteProxyControl from './VoteProxyControl';
import VoteProxyProducer from './VoteProxyProducer';

const Vote = (props) => (
  <div className={contentStyles.content}>
    <Grid container spacing={8}>
      {!_.isEmpty(props.gState) &&
      <Grid item xs={12}>
        <VoteState producers={props.producers} totalVoteWeight={props.totalVoteWeight} gState={props.gState} />
      </Grid>
      }
      <Grid item xs={12}>
        <VoteProxyControl
          handleProxy={props.handleProxy}
          proxyAccount={props.proxyAccount}
          checked={props.checked}

        />
      </Grid>
      <Grid item xs={12}>
        <VoteProxyProducer
          history={props.history}
          producers={props.producers}
          totalVoteWeight={props.totalVoteWeight}
          eosAccount={props.eosAccount}
        />
      </Grid>
    </Grid>
  </div>
);

export default Vote;
