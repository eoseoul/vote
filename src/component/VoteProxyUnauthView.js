import React from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import VoteLogin from './VoteLogin';
import VoteState from './VoteState';
import VoteProxyProducer from './VoteProxyProducer';

import contentStyles from '../styles/content.module.css';

const VoteUnauthView = (props) => (
  <div className={contentStyles.content}>
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <VoteLogin history={props.history} redirect={props.redirect} />
      </Grid>
      {!_.isEmpty(props.gState) &&
        <Grid item xs={12}>
          <VoteState producers={props.producers} totalVoteWeight={props.totalVoteWeight} gState={props.gState} />
        </Grid>
      }
      <Grid item xs={12}>
        <VoteProxyProducer history={props.history} producers={props.producers} totalVoteWeight={props.totalVoteWeight} />
      </Grid>
    </Grid>
  </div>
);

export default VoteUnauthView;
